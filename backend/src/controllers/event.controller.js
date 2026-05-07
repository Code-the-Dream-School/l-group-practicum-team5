const db = require('../config/db.postgres'); // Placeholder for future DB integration
const { BadRequestError, NotFoundError} = require('../errors');

/*   // In-memory store for now (replace with DB later)
let events = [];
let idCounter = 1;   */

// Helper: safely convert undefined → null (important for SQL COALESCE)
const clean = (value) => (value === undefined ? null : value);

// Helper: parse ID safely
const parseId = (id) => {
  const parsed = parseInt(id, 10);
  return Number.isNaN(parsed) ? null : parsed;
};

// Create Event
const createEvent = async (req, res, next) => {
  try {
    const { group_id, title, description, event_date, status, created_by } =
      req.body;

    // Basic validation
    if (!group_id || !title || !event_date || !status || !created_by) {
      throw new BadRequestError(
        'group_id, title and event_date, status and created_by are required'
      );
    }

    /*   const newEvent = {
    //   id: idCounter++,   //remove later when DB auto-generates
    group_id,
    title,
    description: description || '',
    event_date,
    status,
    created_by,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  events.push(newEvent);
  res.status(201).json(newEvent);   */

    const query = `
      INSERT INTO events (
        group_id,
        title,
        description,
        event_date,
        status,
        created_by,
        created_at,
        updated_at
      )
      VALUES ($1,$2,$3,$4,$5,$6,NOW(),NOW())
      RETURNING *;
    `;

    const values = [
      group_id,
      title,
      description || '',
      event_date,
      status,
      created_by,
    ];

    const result = await db.query(query, values);

    return res.status(201).json(result.rows[0]);
  } catch (error) {
      next(error);
  }
};

// Get All Events
const getAllEvents = async (req, res, next) => {
  try {
    //   res.json(events);
    const query = `
      SELECT *
      FROM events
      ORDER BY created_at DESC;
    `;

    const result = await db.query(query);

    return res.json(result.rows);
  } catch (error) {
    next(error);
  }
};

// Get Single Event
const getEventById = async (req, res, next) => {
  try {
    /*   const event = events.find(e => e.id === parseInt(req.params.id));

  if (!event) {
    return res.status(404).json({ message: 'Event not found' });
  }

  res.json(event);   */
    const query = `
      SELECT *
      FROM events
      WHERE id = $1;
    `;

    const result = await db.query(query, [req.params.id]);

    if (result.rows.length === 0) {
      throw new NotFoundError('Event not found');
    }

    return res.json(result.rows[0]);
  } catch (error) {
   next(error);
  }
};

// Update Event
const updateEvent = async (req, res, next) => {
  try {
    /*   const event = events.find(e => e.id === parseInt(req.params.id));

  if (!event) {
    return res.status(404).json({ message: 'Event not found' });
  }

  const { group_id, title, description, event_date, status } = req.body;

  if (group_id) event.group_id = group_id;
  if (title) event.title = title;
  if (description) event.description = description;
  if (event_date) event.event_date = event_date;
  if (status) event.status = status;

    event.updatedAt = new Date();

  res.json(event);   */
    const { group_id, title, description, event_date, status } = req.body;

    const query = `
      UPDATE events
      SET
        group_id = COALESCE($1, group_id),
        title = COALESCE($2, title),
        description = COALESCE($3, description),
        event_date = COALESCE($4, event_date),
        status = COALESCE($5, status),
        updated_at = NOW()
      WHERE id = $6
      RETURNING *;
    `;

    const values = [
      group_id,
      title,
      description,
      event_date,
      status,
      req.params.id,
    ];

    const result = await db.query(query, values);

    if (result.rows.length === 0) {
      throw new NotFoundError('Event not found');
    }

    return res.json(result.rows[0]);
  } catch (error) {
    next(error);
   /*  res
      .status(500)
      .json({ message: 'Error updating event', error: error.message }); */
  }
};

// Delete Event
const deleteEvent = async (req, res, next) => {
  try {
    /*   const index = events.findIndex(e => e.id === parseInt(req.params.id));

  if (index === -1) {
    return res.status(404).json({ message: 'Event not found' });
  }

  events.splice(index, 1);
  res.json({ message: 'Event deleted successfully' });   */
    const query = `
      DELETE FROM events
      WHERE id = $1
      RETURNING *;
    `;

    const result = await db.query(query, [req.params.id]);

    if (result.rows.length === 0) { 
      throw new NotFoundError('Event not found');
    }

    return res.json({
      message: 'Event deleted successfully',
      event: result.rows[0],
    });
  } catch (error) {
   next(error);   
  }
};

module.exports = {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
};
