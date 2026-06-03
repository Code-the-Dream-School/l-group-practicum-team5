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

const {
  validateGroupIdParam,
  validateUserIdParam,
} = require('../validations/member.validation');

const { validateCreateIdea } = require('../validations/idea.validation');

router.get(
  '/:groupId/members',
  authenticateUser,
  validateGroupIdParam,
  authorizeGroupMember('groupId'),
  getGroupMembers,
);

router.delete(
  '/:groupId/members/me',
  authenticateUser,
  validateGroupIdParam,
  authorizeGroupMember('groupId'),
  leaveGroup,
);

router.delete(
  '/:groupId/members/:userId',
  authenticateUser,
  validateGroupIdParam,
  validateUserIdParam,
  authorizeGroupMember('groupId'),
  removeGroupMember,
);

router.post(
  '/:groupId/ideas',
  authenticateUser,
  validateGroupIdParam,
  validateCreateIdea,
  authorizeGroupMember('groupId'),
  createIdea,
);

router.get(
  '/:groupId/ideas',
  authenticateUser,
  validateGroupIdParam,
  authorizeGroupMember('groupId'),
  getGroupIdeas,
);

module.exports = router;
