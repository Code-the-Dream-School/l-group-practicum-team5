const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');

const {
  createIdea,
  getGroupIdeas,
  getIdeaById,
  updateIdea,
  deleteIdea,
} = require('../controllers/idea.controller');

router.post('/:groupId/ideas', authMiddleware, createIdea);
router.get('/:groupId/ideas', authMiddleware, getGroupIdeas);
router.get('/:ideaId', authMiddleware, getIdeaById);
router.put('/:ideaId', authMiddleware, updateIdea);
router.delete('/:ideaId', authMiddleware, deleteIdea);

module.exports = router;
