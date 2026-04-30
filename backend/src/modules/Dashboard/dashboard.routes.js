const router = require('express').Router();
const dashboardController = require('./dashboard.controller');
const authMiddleware = require('../../middleware/authMiddleware');

router.get('/stats',authMiddleware,dashboardController.getDashboardStats);
router.get('/charts', authMiddleware, dashboardController.getDashboardCharts);

module.exports = router;