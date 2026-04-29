// In-memory store for now (replace with DB later)
let events = [];
let idCounter = 1;

// Create Event
const createEvent = (req, res) => {
  const { title, description, date, location } = req.body;

  if (!title || !date) {
    return res.status(400).json({ message: 'Title and date are required' });
  }

  const newEvent = {
    id: idCounter++,
    title,
    description,
    date,
    location,
    createdAt: new Date()
  };

  events.push(newEvent);
  res.status(201).json(newEvent);
};

// Get All Events
const getAllEvents = (req, res) => {
  res.json(events);
};

// Get Single Event
const getEventById = (req, res) => {
  const event = events.find(e => e.id === parseInt(req.params.id));

  if (!event) {
    return res.status(404).json({ message: 'Event not found' });
  }

  res.json(event);
};

// Update Event
const updateEvent = (req, res) => {
  const event = events.find(e => e.id === parseInt(req.params.id));

  if (!event) {
    return res.status(404).json({ message: 'Event not found' });
  }

  const { title, description, date, location } = req.body;

  if (title) event.title = title;
  if (description) event.description = description;
  if (date) event.date = date;
  if (location) event.location = location;

  res.json(event);
};

// Delete Event
const deleteEvent = (req, res) => {
  const index = events.findIndex(e => e.id === parseInt(req.params.id));

  if (index === -1) {
    return res.status(404).json({ message: 'Event not found' });
  }

  events.splice(index, 1);
  res.json({ message: 'Event deleted' });
};

module.exports = {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent
};