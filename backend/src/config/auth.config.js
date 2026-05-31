const DEFAULT_JWT_LIFETIME = '1d';
const DEFAULT_COOKIE_NAME = 'gatherly_auth';

const parseBoolean = (value, defaultValue = false) => {
  if (value === undefined) {
    return defaultValue;
  }

  return value === 'true';
};

const getJwtSecret = () => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET environment variable is required');
  }

  return process.env.JWT_SECRET;
};

const getJwtLifetime = () => process.env.JWT_LIFETIME || DEFAULT_JWT_LIFETIME;

const parseDurationToMs = (duration) => {
  if (typeof duration === 'number') {
    return duration * 1000;
  }

  if (typeof duration !== 'string') {
    return null;
  }

  const match = duration.trim().match(/^(\d+)(ms|s|m|h|d)?$/);

  if (!match) {
    return null;
  }

  const value = Number(match[1]);
  const unit = match[2] || 's';

  const multipliers = {
    ms: 1,
    s: 1000,
    m: 60 * 1000,
    h: 60 * 60 * 1000,
    d: 24 * 60 * 60 * 1000,
  };

  return value * multipliers[unit];
};

const getAuthCookieName = () =>
  process.env.AUTH_COOKIE_NAME || DEFAULT_COOKIE_NAME;

const getAuthCookieOptions = () => {
  const secure = parseBoolean(
    process.env.COOKIE_SECURE,
    process.env.NODE_ENV === 'production',
  );
  const sameSite = process.env.COOKIE_SAMESITE || (secure ? 'none' : 'lax');
  const maxAge = parseDurationToMs(getJwtLifetime());

  const options = {
    httpOnly: true,
    secure,
    sameSite,
    path: '/',
  };

  if (maxAge) {
    options.maxAge = maxAge;
  }

  return options;
};

const getClearAuthCookieOptions = () => {
  const options = { ...getAuthCookieOptions() };
  delete options.maxAge;

  return options;
};

module.exports = {
  getJwtSecret,
  getJwtLifetime,
  getAuthCookieName,
  getAuthCookieOptions,
  getClearAuthCookieOptions,
};
