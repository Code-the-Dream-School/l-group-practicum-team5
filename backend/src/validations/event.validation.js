const { BadRequestError } = require('../errors');

const validStatuses = ['planned', 'completed', 'cancelled'];

const validateCreateEvent = (req, res, next) => {
  const { group_id, title, event_date, status, created_by } = req.body;

  // Required fields
  if (!group_id || !title || !event_date || !status || !created_by) {
<<<<<<< HEAD
    return res.status(400).json({
      message:
        'group_id, title, event_date, status, and created_by are required',
    });
=======
    return next(
      new BadRequestError(
        'group_id, title, event_date, status, and created_by are required',
      ),
    );
>>>>>>> main
  }

  // Title validation
  if (title.trim().length < 3) {
<<<<<<< HEAD
    return res.status(400).json({
      message: 'Title must be at least 3 characters long',
    });
=======
    return next(
      new BadRequestError('Title must be at least 3 characters long'),
    );
>>>>>>> main
  }

  // Status validation
  if (!validStatuses.includes(status.toLowerCase())) {
<<<<<<< HEAD
    return res.status(400).json({
      message: 'Invalid status. Allowed values: planned, completed, cancelled',
    });
=======
    return next(
      new BadRequestError(
        'Invalid status. Allowed values: planned, completed, cancelled',
      ),
    );
>>>>>>> main
  }

  // Date validation
  const parsedDate = new Date(event_date);

<<<<<<< HEAD
  if (isNaN(parsedDate.getTime())) {
    return res.status(400).json({
      message: 'Invalid event_date format',
    });
=======
  if (Number.isNaN(parsedDate.getTime())) {
    return next(new BadRequestError('Invalid event_date format'));
>>>>>>> main
  }

  next();
};

const validateUpdateEvent = (req, res, next) => {
  const { title, status, event_date } = req.body;

  if (title && title.trim().length < 3) {
<<<<<<< HEAD
    return res.status(400).json({
      message: 'Title must be at least 3 characters long',
    });
  }

  if (status && !validStatuses.includes(status.toLowerCase())) {
    return res.status(400).json({
      message: 'Invalid status. Allowed values: planned, completed, cancelled',
    });
=======
    return next(
      new BadRequestError('Title must be at least 3 characters long'),
    );
  }

  if (status && !validStatuses.includes(status.toLowerCase())) {
    return next(
      new BadRequestError(
        'Invalid status. Allowed values: planned, completed, cancelled',
      ),
    );
>>>>>>> main
  }

  if (event_date) {
    const parsedDate = new Date(event_date);

<<<<<<< HEAD
    if (isNaN(parsedDate.getTime())) {
      return res.status(400).json({
        message: 'Invalid event_date format',
      });
=======
    if (Number.isNaN(parsedDate.getTime())) {
      return next(new BadRequestError('Invalid event_date format'));
>>>>>>> main
    }
  }

  next();
};

module.exports = {
  validateCreateEvent,
  validateUpdateEvent,
};
