const crypto = require('crypto');
const util = require('util');
const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const pool = require('../config/db.postgres');
const {
  UnauthorizedError,
  ConflictError,
  NotFoundError,
} = require('../errors');
const { sendSuccess } = require('../utils/response');

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
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
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

    return sendSuccess(
      res,
      { user: newUser.rows[0] },
      StatusCodes.CREATED,
      'User registered successfully',
    );
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

    return sendSuccess(
      res,
      {
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      },
      StatusCodes.OK,
      'Login successful',
    );
  } catch (error) {
    next(error);
  }
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

    return sendSuccess(res, { user: result.rows[0] });
  } catch (error) {
    next(error);
  }
};

module.exports = { registerUser, loginUser, getCurrentUser };
