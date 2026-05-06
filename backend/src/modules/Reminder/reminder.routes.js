const router = require('express').Router();
const reminderController = require('./reminder.controller');
const authMiddleware = require('../../middleware/authMiddleware');

router.post('/', authMiddleware, reminderController.createReminder);
router.get('/', authMiddleware, reminderController.getReminders);
router.patch('/:id', authMiddleware, reminderController.updateReminder);
router.delete('/:id', authMiddleware, reminderController.deleteReminder);

module.exports = router;