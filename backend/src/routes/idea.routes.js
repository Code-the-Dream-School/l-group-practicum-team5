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

router.get('/:ideaId', authorizeIdeaGroupMember, getIdeaById);
router.put('/:ideaId', authorizeIdeaGroupMember, updateIdea);
router.delete('/:ideaId', authorizeIdeaGroupMember, deleteIdea);

module.exports = router;
