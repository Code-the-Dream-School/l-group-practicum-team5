const express = require('express');
const router = express.Router();

const {
  getIdeaById,
  updateIdea,
  deleteIdea,
} = require('../controllers/idea.controller');

const {
  authorizeGroupMember,
} = require('../middleware/groupAuthorization.middleware');

router.get('/:ideaId', authorizeGroupMember('groupId'), getIdeaById);
router.put('/:ideaId', authorizeGroupMember('groupId'), updateIdea);
router.delete('/:ideaId', authorizeGroupMember('groupId'), deleteIdea);

module.exports = router;
