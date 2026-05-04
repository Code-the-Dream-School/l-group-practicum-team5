const express = require('express');
const router = express.Router();

const {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent
} = require('../controllers/event.controller');

// CRUD Routes
// Create Event
router.post('/', createEvent);
// Read Events
router.get('/', getAllEvents);
router.get('/:id', getEventById);
// Update & Delete Events
router.put('/:id', updateEvent);
router.delete('/:id', deleteEvent);

module.exports = router;