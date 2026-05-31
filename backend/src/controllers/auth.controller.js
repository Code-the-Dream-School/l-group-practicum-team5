const crypto = require('crypto');
const util = require('util');
const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const pool = require('../config/db.postgres');
const {
  getJwtSecret,
  getJwtLifetime,
  getAuthCookieName,
  getAuthCookieOptions,
  getClearAuthCookieOptions,
} = require('../config/auth.config');
const {
  UnauthorizedError,
  ConflictError,
  NotFoundError,
} = require('../errors');

const scrypt = util.promisify(crypto.scrypt);

async function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const derivedKey = await scrypt(password, salt, 64);

  return `${salt}:${derivedKey.toString('hex')}`;
}

async function comparePassword(inputPassword, storedHash) {
  const [salt, key] = storedHash.split(':');
  const keyBuffer = Buffer.from(key, 'hex');
  const derivedKey = await scrypt(inputPassword, salt, 64);

  return crypto.timingSafeEqual(keyBuffer, derivedKey);
}

function generateToken(payload) {
  return jwt.sign(payload, getJwtSecret(), {
    expiresIn: getJwtLifetime(),
  });
}

const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await pool.query(
      `
      SELECT id FROM users WHERE email = $1
      `,
      [email],
    );

    if (existingUser.rows.length > 0) {
      throw new ConflictError('User already exists');
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await pool.query(
      `INSERT INTO users (name, email, password_hash)
         VALUES ($1, $2, $3)
         RETURNING id, name, email`,
      [name, email, hashedPassword],
    );

    return res.status(StatusCodes.CREATED).json({
      message: 'User registered successfully',
      user: newUser.rows[0],
    });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const result = await pool.query(
      'SELECT id, name, email, password_hash FROM users WHERE email = $1',
      [email],
    );

    if (result.rows.length === 0) {
      throw new UnauthorizedError('Invalid credentials');
    }

    const user = result.rows[0];

    const isMatch = await comparePassword(password, user.password_hash);

    if (!isMatch) {
      throw new UnauthorizedError('Invalid credentials');
    }

    const token = generateToken({
      id: user.id,
      email: user.email,
    });

    res.cookie(getAuthCookieName(), token, getAuthCookieOptions());

    return res.status(StatusCodes.OK).json({
      message: 'Login successful',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

const logoutUser = (req, res) => {
  res.clearCookie(getAuthCookieName(), getClearAuthCookieOptions());

  return res.status(StatusCodes.OK).json({
    message: 'Logout successful',
  });
};

const getCurrentUser = async (req, res, next) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      throw new UnauthorizedError('Authentication required');
    }

    const result = await pool.query(
      'SELECT id, name, email FROM users WHERE id = $1',
      [userId],
    );

    if (result.rows.length === 0) {
      throw new NotFoundError('User not found');
    }

    return res.status(StatusCodes.OK).json({
      user: result.rows[0],
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { registerUser, loginUser, logoutUser, getCurrentUser };
