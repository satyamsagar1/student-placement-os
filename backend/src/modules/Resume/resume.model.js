const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',    
        required: true
    },

    originalName: {
        type: String,
        trim: true,
        required: true
    },

    fileUrl: {
        type: String,
        trim: true,
        required: true
    },
    fileSize: {
        type: Number,
        required: true
    },
    mimeType: {
        type: String,
        trim: true,
        required: true
    },

    isDefault: {
        type: Boolean,
        default: false
    },

}, { timestamps: true });

resumeSchema.index({ userId: 1 });

module.exports = mongoose.model('Resume', resumeSchema);
