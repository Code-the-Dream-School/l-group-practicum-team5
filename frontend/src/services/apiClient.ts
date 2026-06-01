const API_BASE_URL = (
  import.meta.env.VITE_API_URL ?? 'http://localhost:8080/api'
).replace(/\/$/, '');

export type QueryValue = string | number | boolean | null | undefined;

export type ApiClientOptions = Omit<RequestInit, 'body'> & {
  body?: unknown;
  query?: Record<string, QueryValue>;
  // Explicit bearer token support will remain until auth moves to HttpOnly cookies.
  token?: string | null;
};

type ApiErrorDetails = {
  status: number;
  statusText: string;
  data: unknown;
};

export class ApiError extends Error {
  status: number;
  statusText: string;
  data: unknown;

  constructor(message: string, details: ApiErrorDetails) {
    super(message);
    this.name = 'ApiError';
    this.status = details.status;
    this.statusText = details.statusText;
    this.data = details.data;
  }
}

const buildUrl = (
  endpoint: string,
  query?: Record<string, QueryValue>,
): string => {
  // Allows both 'auth/login' and '/auth/login'.
  const normalizedEndpoint = endpoint.startsWith('/')
    ? endpoint
    : `/${endpoint}`;
  const url = new URL(`${API_BASE_URL}${normalizedEndpoint}`);

  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        url.searchParams.set(key, String(value));
      }
    });
  }

  return url.toString();
};

const parseResponseBody = async (response: Response): Promise<unknown> => {
  if (response.status === 204) {
    return null;
  }

  const contentType = response.headers.get('content-type');

  if (contentType?.includes('application/json')) {
    return response.json();
  }

  const text = await response.text();
  return text || null;
};

const getErrorMessage = (data: unknown, response: Response): string => {
  if (data && typeof data === 'object') {
    // Backend errors use either { message: '...' } or { msg: '...' }. Standardize later.
    const errorData = data as Record<string, unknown>;

    if (typeof errorData.message === 'string') {
      return errorData.message;
    }

    if (typeof errorData.msg === 'string') {
      return errorData.msg;
    }
  }

  return response.statusText || 'Request failed';
};

// T is the expected response type, like apiClient.get<User>('/auth/me').
const request = async <T>(
  endpoint: string,
  options: ApiClientOptions = {},
): Promise<T> => {
  const { body, headers, query, token, ...fetchOptions } = options;
  const requestHeaders = new Headers(headers);

  if (body !== undefined && !requestHeaders.has('Content-Type')) {
    requestHeaders.set('Content-Type', 'application/json');
  }

  if (token) {
    requestHeaders.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(buildUrl(endpoint, query), {
    credentials: 'include',
    ...fetchOptions,
    headers: requestHeaders,
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  const data = await parseResponseBody(response);

  if (!response.ok) {
    throw new ApiError(getErrorMessage(data, response), {
      status: response.status,
      statusText: response.statusText,
      data,
    });
  }

  return data as T;
};

export const apiClient = {
  // Helper methods that wrap the base request function to provide cleaner and reusable API calls.
  get: <T>(endpoint: string, options?: ApiClientOptions) =>
    request<T>(endpoint, { ...options, method: 'GET' }),

  post: <T>(endpoint: string, body?: unknown, options?: ApiClientOptions) =>
    request<T>(endpoint, { ...options, method: 'POST', body }),

  put: <T>(endpoint: string, body?: unknown, options?: ApiClientOptions) =>
    request<T>(endpoint, { ...options, method: 'PUT', body }),

  patch: <T>(endpoint: string, body?: unknown, options?: ApiClientOptions) =>
    request<T>(endpoint, { ...options, method: 'PATCH', body }),

  delete: <T>(endpoint: string, options?: ApiClientOptions) =>
    request<T>(endpoint, { ...options, method: 'DELETE' }),

  request,
};
