const express = require('express');
const router = express.Router();

const {
  createGroup,
  getAllGroups,
  getGroupById,
  updateGroup,
  deleteGroup
} = require('../controllers/group.controller');

router.post('/groups', createGroup);
router.get('/groups', getAllGroups);
router.get('/groups/:id', getGroupById);
router.put('/groups/:id', updateGroup);
router.delete('/groups/:id', deleteGroup);

module.exports = router;