const express = require('express');
const router = express.Router();

const { createApplication} = require('./application.controller');
const authMiddleware = require('../../middleware/authMiddleware');

router.post('/', authMiddleware, createApplication);

module.exports = router;