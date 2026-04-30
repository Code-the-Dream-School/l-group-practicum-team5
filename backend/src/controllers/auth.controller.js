const crypto = require('crypto');
const util = require('util');
const jwt = require('jsonwebtoken');

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
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: 'Email and password are required'
      });
    }

    const hashedPassword = await hashPassword(password);

    // TODO: save user to database (pending RD-3 Jira ticket)
    // Example future DB save:
    // const newUser = await User.create({ email, password: hashedPassword });

    res.status(201).json({
      message: 'User registered successfully'
    });
  } catch (error) {
    res.status(500).json({
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

    // TODO: verify user credentials against database (pending RD-3 Jira ticket)
    // Example future flow:
    // 1. find user by email
    // 2. compare entered password with stored hashed password
    // 3. generate JWT if credentials are valid

    /*
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: 'Invalid credentials'
      });
    }

    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: 'Invalid credentials'
      });
    }
      

    const token = generateToken({
      id: 'test-user-id', //user._id,
      email //: user.email
    });

    return res.status(200).json({
      message: 'Login successful',
      token
    });
    */

    res.status(200).json({
      message: 'Login endpoint ready (JWT pending DB credential verification)'
    });
} catch (error) {
    console.error('Login error:', error);
  
    res.status(500).json({
      message: 'Something went wrong'
    });
  }
};

module.exports = { registerUser, loginUser };

