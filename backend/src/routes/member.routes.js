const express = require('express');
const router = express.Router();

const { getGroupMembers, leaveGroup, removeGroupMember } = require('../controllers/member.controller');

router.get('/:groupId/members', getGroupMembers);
router.delete('/:groupId/members/me', leaveGroup);
router.delete('/:groupId/members/:userId', removeGroupMember);

module.exports = router;

