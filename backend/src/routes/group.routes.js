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

router.post('/', validateCreateGroup, createGroup);
router.get('/', getAllGroups);
router.get('/:id', getGroupById);
router.put('/:id', validateUpdateGroup, updateGroup);
router.delete('/:id', deleteGroup);

module.exports = router;
