const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');

const {
  getIdeaById,
  updateIdea,
  deleteIdea,
} = require('../controllers/idea.controller');


router.get('/:ideaId', authMiddleware, getIdeaById);
router.put('/:ideaId', authMiddleware, updateIdea);
router.delete('/:ideaId', authMiddleware, deleteIdea);

module.exports = router;
