const express = require('express');
const router = express.Router();
const notesController = require('../controllers/travelnotesController');

router.get('/', notesController.getAllNotes);

router.get('/create', (req, res) => {
  res.render('create', { user: req.user });
});

router.post('/', notesController.createNote);

router.get('/:id/edit', notesController.getNoteById);
router.post('/:id', notesController.updateNot);
router.post('/:id/delete', notesController.removeNote);

module.exports = router;
