const express = require('express');
const router = express.Router();

const {
  getIdeaById,
  updateIdea,
  deleteIdea,
} = require('../controllers/idea.controller');

router.get('/:ideaId', getIdeaById);
router.put('/:ideaId', updateIdea);
router.delete('/:ideaId', deleteIdea);

module.exports = router;
