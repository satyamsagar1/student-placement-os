const Reminder = require('./reminder.model');

const formatReminder = (reminder) => {
    return {
        id: reminder._id,
        title: reminder.title,
        description: reminder.description,
        status: reminder.status,
        reminderDate: reminder.reminderDate,
        relatedApplicationId: reminder.relatedApplicationId
    };
};

const createReminder = async (userId, reminderData) => {

    const reminder = new Reminder({
        userId: userId,
        title: reminderData.title,
        description: reminderData.description,
        status: reminderData.status,
        reminderDate: reminderData.reminderDate,
        relatedApplicationId: reminderData.relatedApplicationId
    });
    await reminder.save();
    return formatReminder(reminder);
};


const getReminders = async(userId) =>{

    const reminders = await Reminder.find({ userId }).sort({ reminderDate: 1 });
    return reminders.map(formatReminder);
};


const updateReminder = async (reminderId, userId, updateData) => {

    const reminder = await Reminder.findOne({ _id: reminderId, userId });

    if (!reminder) {
        const error = new Error('Reminder not found');
        error.statusCode = 404;
        throw error;
    }
    
    const allowedFields = ['title', 'description', 'status', 'reminderDate', 'relatedApplicationId'];

    allowedFields.forEach((field) => {
        if (updateData[field] !== undefined) {
            reminder[field] = updateData[field];
        }
    });

    await reminder.save();
    return formatReminder(reminder);
};

const deleteReminder = async (reminderId, userId) => {

    const reminder = await Reminder.findOne({ _id: reminderId, userId });

    if (!reminder) {
        const error = new Error('Reminder not found');
        error.statusCode = 404;
        throw error;
    }

    await reminder.deleteOne();

    return formatReminder(reminder);
};


module.exports = {createReminder, getReminders, updateReminder, deleteReminder};