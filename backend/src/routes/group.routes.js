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
  validateUpdateGroup
} = require('../validations/group.validation');

router.post('/groups', validateCreateGroup, createGroup);
router.get('/groups', getAllGroups);
router.get('/groups/:id', getGroupById);
router.put('/groups/:id', validateUpdateGroup, updateGroup);
router.delete('/groups/:id', deleteGroup);

module.exports = router;
