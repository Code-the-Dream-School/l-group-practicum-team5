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
  validateUpdateEvent,
} = require('../validations/event.validation');

const {
  authorizeGroupMemberFromBody,
  authorizeEventGroupMember,
} = require('../middleware/groupAuthorization.middleware');

// CRUD Routes
// Create Event
router.post(
  '/',
  validateCreateEvent,
  authorizeGroupMemberFromBody('group_id'),
  createEvent,
);
// Read Events
router.get('/', getAllEvents);
router.get('/:id', authorizeEventGroupMember, getEventById);
// Update & Delete Events
router.put(
  '/:id',
  authorizeEventGroupMember,
  validateUpdateEvent,
  authorizeGroupMemberFromBody('group_id', false),
  updateEvent,
);
router.delete('/:id', authorizeEventGroupMember, deleteEvent);

module.exports = router;
