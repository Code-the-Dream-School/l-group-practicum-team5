const crypto = require('crypto');
const util = require('util');

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

const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: 'Email and password are required'
      });
    }

    const hashedPassword = await hashPassword(password); // // TODO: save user to database (pending RD-3 Jira ticket)

    res.status(201).json({
      message: 'User registered successfully'
    });
  } catch (error) {
    res.status(500).json({
      message: 'Something went wrong'
    });
  }
};

const loginUser = async (req, res) => { // TODO: verify user credentials against database (pending RD-3 Jira ticket)
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: 'Email and password are required'
      });
    }

    res.status(200).json({
      message: 'Login endpoint ready (verification pending DB integration)'
    });
  } catch (error) {
    res.status(500).json({
      message: 'Something went wrong'
    });
  }
};

module.exports = { registerUser, loginUser };