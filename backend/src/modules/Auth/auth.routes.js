const express = require('express');
const {registerUser,loginUser,me} = require('./auth.controller');
const authMiddleware = require('../../middleware/authMiddleware');

const router = express.Router();

router.post('/register',registerUser);
router.post('/login',loginUser);
router.get('/me', authMiddleware, me); // Protected route to get current user info

module.exports = router;