const express = require('express');
const router = express.Router();

const {
  getIdeaById,
  updateIdea,
  deleteIdea,
} = require('../controllers/idea.controller');

const {
  authorizeIdeaGroupMember,
} = require('../middleware/groupAuthorization.middleware');

const {
  validateIdeaIdParam,
  validateUpdateIdea,
} = require('../validations/idea.validation');

router.get(
  '/:ideaId',
  validateIdeaIdParam,
  authorizeIdeaGroupMember,
  getIdeaById,
);

router.put(
  '/:ideaId',
  validateIdeaIdParam,
  authorizeIdeaGroupMember,
  validateUpdateIdea,
  updateIdea,
);

router.delete(
  '/:ideaId',
  validateIdeaIdParam,
  authorizeIdeaGroupMember,
  deleteIdea,
);

module.exports = router;
