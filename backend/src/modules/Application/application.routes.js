const express = require('express');
const router = express.Router();

const { createApplication, getApplications, updateApplication,updateApplicationStatus, deleteApplication} = require('./application.controller');
const authMiddleware = require('../../middleware/authMiddleware');

router.post('/', authMiddleware, createApplication);
router.get('/', authMiddleware, getApplications);
router.patch('/:id/status', authMiddleware, updateApplicationStatus);
router.put('/:id', authMiddleware, updateApplication);
router.delete('/:id', authMiddleware, deleteApplication);

module.exports = router;