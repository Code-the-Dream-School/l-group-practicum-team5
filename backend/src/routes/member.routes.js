const express = require('express');
const router = express.Router();

const {
  getGroupMembers,
  leaveGroup,
  removeGroupMember,
} = require('../controllers/member.controller');

const authenticateUser = require('../middleware/auth.middleware');

const {
  authorizeGroupMember,
} = require('../middleware/groupAuthorization.middleware');

const {
  validateGroupIdParam,
  validateUserIdParam,
} = require('../validations/member.validation');

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

module.exports = router;
