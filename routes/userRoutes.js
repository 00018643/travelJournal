const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/:id', userController.getUserById);

router.post('/:id', userController.updateUserEmail);

module.exports = router;