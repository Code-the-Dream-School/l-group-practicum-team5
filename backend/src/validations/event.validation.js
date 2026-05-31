const { BadRequestError } = require('../errors');

const validStatuses = ['planned', 'completed', 'cancelled'];

const validateCreateEvent = (req, res, next) => {
  const { group_id, title, event_date, status } = req.body;

  // Required fields
  if (!group_id || !title || !event_date || !status) {
    return next(
      new BadRequestError(
        'group_id, title, event_date, and status are required',
      ),
    );
  }

  // Title validation
  if (title.trim().length < 3) {
    return next(
      new BadRequestError('Title must be at least 3 characters long'),
    );
  }

  // Status validation
  if (!validStatuses.includes(status.toLowerCase())) {
    return next(
      new BadRequestError(
        'Invalid status. Allowed values: planned, completed, cancelled',
      ),
    );
  }

  // Date validation
  const parsedDate = new Date(event_date);

  if (Number.isNaN(parsedDate.getTime())) {
    return next(new BadRequestError('Invalid event_date format'));
  }

  next();
};

const validateUpdateEvent = (req, res, next) => {
  const { title, status, event_date } = req.body;

  if (title && title.trim().length < 3) {
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
  }

  if (event_date) {
    const parsedDate = new Date(event_date);

    if (Number.isNaN(parsedDate.getTime())) {
      return next(new BadRequestError('Invalid event_date format'));
    }
  }

  next();
};

module.exports = {
  validateCreateEvent,
  validateUpdateEvent,
};