const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const helloRoutes = require('./routes/hello.routes');
const authRoutes = require('./routes/auth.routes');
const eventRoutes = require('./routes/event.routes');
const groupRoutes = require('./routes/group.routes');
const memberRoutes = require('./routes/member.routes');

const errorHandlerMiddleware = require('./middleware/error-handler');
const authenticateUser = require('./middleware/auth.middleware');

const app = express();

// Security & best‑practice middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

// Routes
app.use('/api/hello', helloRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/events', authenticateUser, eventRoutes);
app.use('/api/groups', authenticateUser, groupRoutes);
app.use('/api/groups', memberRoutes);


// Root route
app.get('/', (req, res) => {
  res.send('Backend API is running');
});

//Middlewar
app.use(errorHandlerMiddleware);

module.exports = app;
