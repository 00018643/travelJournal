const express = require('express');
const router = express.Router();
const authController = require('../controllers/authenticationController');
const redirectMiddleware = require('../middleware/redirectAuth');

router.get('/login', redirectMiddleware, authController.getLogin);

router.post('/login', redirectMiddleware, authController.postLogin);

router.get('/register', redirectMiddleware, authController.getRegister);

router.post('/register', redirectMiddleware, authController.postRegister);

router.get('/logout', authController.logout);

module.exports = router;