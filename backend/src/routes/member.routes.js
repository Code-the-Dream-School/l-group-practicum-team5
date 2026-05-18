const express = require('express');
const router = express.Router();

const {
  getGroupMembers,
  leaveGroup,
  removeGroupMember,
} = require('../controllers/member.controller');

const authenticateUser = require('../middleware/auth.middleware');

router.get('/:groupId/members', authenticateUser, getGroupMembers);
router.delete('/:groupId/members/me', authenticateUser, leaveGroup);
router.delete('/:groupId/members/:userId', authenticateUser, removeGroupMember);

module.exports = router;
