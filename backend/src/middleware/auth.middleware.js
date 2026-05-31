const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../errors');
const { getJwtSecret, getAuthCookieName } = require('../config/auth.config');

const parseCookies = (cookieHeader = '') => {
  return cookieHeader.split(';').reduce((cookies, cookie) => {
    const separatorIndex = cookie.indexOf('=');

    if (separatorIndex === -1) {
      return cookies;
    }

    const name = cookie.slice(0, separatorIndex).trim();
    const value = cookie.slice(separatorIndex + 1).trim();

    if (name) {
      try {
        cookies[name] = decodeURIComponent(value);
      } catch {
        cookies[name] = value;
      }
    }

    return cookies;
  }, {});
};

const getBearerToken = (authHeader) => {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  return authHeader.split(' ')[1] || null;
};

const getTokenFromRequest = (req) => {
  const cookies = parseCookies(req.headers.cookie);
  const cookieToken = cookies[getAuthCookieName()];

  return cookieToken || getBearerToken(req.headers.authorization);
};

const authenticateUser = (req, res, next) => {
  try {
    const token = getTokenFromRequest(req);

    if (!token) {
      throw new UnauthorizedError('Authentication required');
    }

    const decoded = jwt.verify(token, getJwtSecret());

    req.user = decoded;

    next();
  } catch (error) {
    if (
      error.name === 'JsonWebTokenError' ||
      error.name === 'TokenExpiredError'
    ) {
      return next(new UnauthorizedError('Invalid or expired token'));
    }

    next(error);
  }
};

module.exports = authenticateUser;
