const reminderService = require('./reminder.services');


const createReminder = async (req, res) => {
    try {
        const userId = req.user.id;
        const reminderData = req.body;
        const reminder = await reminderService.createReminder(userId, reminderData);        
        res.status(201).json({
            success: true,
            message: 'Reminder created successfully',
            data: reminder
        });
    } catch (error) {
        console.error('Error creating reminder:', error);
        res.status(error.statusCode || 500).json({
            success: false,
            message: 'Failed to create reminder',
            error: error.message
        });
    }
};

const getReminders = async (req, res) => {
    try{
        const userId = req.user.id;
        const reminders = await reminderService.getReminders(userId);
        res.status(200).json({
            success: true,
            message: 'Reminders retrieved successfully',
            data: reminders
        });
    }
    catch(error){
        console.error('Error retrieving reminders:', error);
        res.status(error.statusCode || 500).json({
            success: false,
            message: 'Failed to retrieve reminders',
            error: error.message
        });
    }
};

const updateReminder = async (req, res) => {
    try {
        const userId = req.user.id;
        const reminderId = req.params.id;
        const updateData = req.body;
        const updatedReminder = await reminderService.updateReminder(reminderId, userId, updateData);
        res.status(200).json({
            success: true,
            message: 'Reminder updated successfully',
            data: updatedReminder
        });
    } catch (error) {
        console.error('Error updating reminder:', error);
        res.status(error.statusCode || 500).json({
            success: false,
            message: 'Failed to update reminder',
            error: error.message
        });
    }
};

const deleteReminder = async (req, res) => {
    try {
        const userId = req.user.id;
        const reminderId = req.params.id;
        await reminderService.deleteReminder(reminderId, userId);
        res.status(200).json({
            success: true,
            message: 'Reminder deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting reminder:', error);
        res.status(error.statusCode || 500).json({
            success: false,
            message: 'Failed to delete reminder',
            error: error.message
        });
    }
};

module.exports = {createReminder, getReminders, updateReminder, deleteReminder};