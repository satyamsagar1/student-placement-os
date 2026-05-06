const mongoose = require('mongoose');

const reminderSchema = new mongoose.Schema({

    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    title:{
        type: String,
        trim: true,
        required: true,
        minlength: 2,
        maxlength: 120
    },

    description:{
        type: String,
        trim: true,
        default: ''
    },

    reminderDate:{
        type: Date,
        required: true
    },

    status:{
        type: String,
        enum: ['pending', 'completed'],
        default: 'pending'
    },

    relatedApplicationId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Application'
    },
    
},{
    timestamps: true
});

reminderSchema.index({ userId: 1, reminderDate: 1 });

module.exports = mongoose.model('Reminder', reminderSchema);