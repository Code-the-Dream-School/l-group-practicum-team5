const validStatuses = ['upcoming', 'active', 'completed', 'cancelled'];

const validateCreateEvent = (req, res, next) => {
  const {
    group_id,
    title,
    event_date,
    status,
    created_by
  } = req.body;

  // Required fields
  if (
    !group_id ||
    !title ||
    !event_date ||
    !status ||
    !created_by
  ) {
    return res.status(400).json({
      message:
        'group_id, title, event_date, status, and created_by are required'
    });
  }

  // Title validation
  if (title.trim().length < 3) {
    return res.status(400).json({
      message: 'Title must be at least 3 characters long'
    });
  }

  // Status validation
  if (!validStatuses.includes(status.toLowerCase())) {
    return res.status(400).json({
      message:
        'Invalid status. Allowed values: upcoming, active, completed, cancelled'
    });
  }

  // Date validation
  const parsedDate = new Date(event_date);

  if (isNaN(parsedDate.getTime())) {
    return res.status(400).json({
      message: 'Invalid event_date format'
    });
  }

  next();
};

const validateUpdateEvent = (req, res, next) => {
  const { title, status, event_date } = req.body;

  if (title && title.trim().length < 3) {
    return res.status(400).json({
      message: 'Title must be at least 3 characters long'
    });
  }

  if (
    status &&
    !validStatuses.includes(status.toLowerCase())
  ) {
    return res.status(400).json({
      message:
        'Invalid status. Allowed values: upcoming, active, completed, cancelled'
    });
  }

  if (event_date) {
    const parsedDate = new Date(event_date);

    if (isNaN(parsedDate.getTime())) {
      return res.status(400).json({
        message: 'Invalid event_date format'
      });
    }
  }

  next();
};

module.exports = {
  validateCreateEvent,
  validateUpdateEvent
};