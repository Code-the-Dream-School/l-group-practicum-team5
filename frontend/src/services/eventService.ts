import { apiClient } from './apiClient';
import type { ApiSuccess } from './authService';

export type Id = number | string;
export type EventStatus = 'planned' | 'completed' | 'cancelled';

export type GroupEvent = {
  id: Id;
  group_id: Id;
  title: string;
  description: string;
  event_date: string;
  status: EventStatus;
  created_by: Id;
  created_at: string;
  updated_at: string;
};

export type CreateEventPayload = {
  group_id: Id;
  title: string;
  description?: string;
  event_date: string;
  status: EventStatus;
};

export type UpdateEventPayload = Partial<CreateEventPayload>;

export type EventResponse = ApiSuccess<GroupEvent>;
export type EventsResponse = ApiSuccess<GroupEvent[]>;
export type DeleteEventResponse = ApiSuccess<{ event: GroupEvent }>;

export const createEvent = (payload: CreateEventPayload) =>
  apiClient.post<EventResponse>('/events', payload);

export const getEvents = () => apiClient.get<EventsResponse>('/events');

export const getEvent = (eventId: Id) =>
  apiClient.get<EventResponse>(`/events/${eventId}`);

export const updateEvent = (eventId: Id, payload: UpdateEventPayload) =>
  apiClient.put<EventResponse>(`/events/${eventId}`, payload);

export const deleteEvent = (eventId: Id) =>
  apiClient.delete<DeleteEventResponse>(`/events/${eventId}`);
