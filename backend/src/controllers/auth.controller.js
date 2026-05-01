const crypto = require('crypto');
const util = require('util');
const jwt = require('jsonwebtoken');
const pool = require('../config/db.postgres');

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
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME });
}

const registerUser = async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      if (!name || !email || !password) {
        return res.status(400).json({
          message: 'Name, email, and password are required'
        });
      }
  
      const existingUser = await pool.query(
        'SELECT id FROM users WHERE email = $1',
        [email]
      );
  
      if (existingUser.rows.length > 0) {
        return res.status(409).json({
          message: 'User already exists'
        });
      }
  
      const hashedPassword = await hashPassword(password);
  
      const newUser = await pool.query(
        `INSERT INTO users (name, email, password_hash)
         VALUES ($1, $2, $3)
         RETURNING id, name, email`,
        [name, email, hashedPassword]
      );
  
      return res.status(201).json({
        message: 'User registered successfully',
        user: newUser.rows[0]
      });
    } catch (error) {
      console.error('Register error:', error);
  
      return res.status(500).json({
        message: 'Something went wrong'
      });
    }
  };
  
  const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(400).json({
          message: 'Email and password are required'
        });
      }
  
      const result = await pool.query(
        'SELECT id, name, email, password_hash FROM users WHERE email = $1',
        [email]
      );
  
      if (result.rows.length === 0) {
        return res.status(401).json({
          message: 'Invalid credentials'
        });
      }
  
      const user = result.rows[0];
  
      const isMatch = await comparePassword(password, user.password_hash);
  
      if (!isMatch) {
        return res.status(401).json({
          message: 'Invalid credentials'
        });
      }
  
      const token = generateToken({
        id: user.id,
        email: user.email
      });
  
      return res.status(200).json({
        message: 'Login successful',
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email
        }
      });
    } catch (error) {
      console.error('Login error:', error);
  
      return res.status(500).json({
        message: 'Something went wrong'
      });
    }
  };

module.exports = { registerUser, loginUser };

