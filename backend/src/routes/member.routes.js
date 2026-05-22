const express = require('express');
const router = express.Router();

const {
  getGroupMembers,
  leaveGroup,
  removeGroupMember,
} = require('../controllers/member.controller');

const { createIdea, getGroupIdeas} = require('../controllers/idea.controller');
const authenticateUser = require('../middleware/auth.middleware');

router.get('/:groupId/members', authenticateUser, getGroupMembers);
router.delete('/:groupId/members/me', authenticateUser, leaveGroup);
router.delete('/:groupId/members/:userId', authenticateUser, removeGroupMember);
router.post('/:groupId/ideas', authenticateUser, createIdea);
router.get('/:groupId/ideas', authenticateUser, getGroupIdeas);

module.exports = router;
