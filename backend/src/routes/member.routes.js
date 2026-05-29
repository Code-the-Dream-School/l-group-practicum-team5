const express = require('express');
const router = express.Router();

const {
  getGroupMembers,
  leaveGroup,
  removeGroupMember,
} = require('../controllers/member.controller');

const { createIdea, getGroupIdeas } = require('../controllers/idea.controller');
const authenticateUser = require('../middleware/auth.middleware');

const {
  authorizeGroupMember,
} = require('../middleware/groupAuthorization.middleware');

router.get(
  '/:groupId/members',
  authenticateUser,
  authorizeGroupMember('groupId'),
  getGroupMembers,
);

router.delete(
  '/:groupId/members/me',
  authenticateUser,
  authorizeGroupMember('groupId'),
  leaveGroup,
);

router.delete(
  '/:groupId/members/:userId',
  authenticateUser,
  authorizeGroupMember('groupId'),
  removeGroupMember,
);

router.post(
  '/:groupId/ideas',
  authenticateUser,
  authorizeGroupMember('groupId'),
  createIdea,
);
router.get(
  '/:groupId/ideas',
  authenticateUser,
  authorizeGroupMember('groupId'),
  getGroupIdeas,
);

module.exports = router;
