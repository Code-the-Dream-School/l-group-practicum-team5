const express = require('express');
const router = express.Router();

const {
  createGroup,
  getAllGroups,
  getGroupById,
  updateGroup,
  deleteGroup,
} = require('../controllers/group.controller');

const {
  validateCreateGroup,
  validateUpdateGroup,
} = require('../validations/group.validation');

const {
  authorizeGroupMember,
} = require('../middleware/groupAuthorization.middleware');

router.post('/', validateCreateGroup, createGroup);
router.get('/', getAllGroups);
router.get('/:id', authorizeGroupMember('id'), getGroupById);
router.put(
  '/:id',
  authorizeGroupMember('id'),
  validateUpdateGroup,
  updateGroup,
);
router.delete('/:id', authorizeGroupMember('id'), deleteGroup);

module.exports = router;
