const express = require('express');
const router = express.Router();

const {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} = require('../controllers/event.controller');

const {
  validateCreateEvent,
  validateUpdateEvent
} = require('../validations/event.validation');

// CRUD Routes
// Create Event
router.post('/', validateCreateEvent, createEvent);
// Read Events
router.get('/', getAllEvents);
router.get('/:id', getEventById);
// Update & Delete Events
router.put('/:id', validateUpdateEvent, updateEvent);
router.delete('/:id', deleteEvent);

module.exports = router;
