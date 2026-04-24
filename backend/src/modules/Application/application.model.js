const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    companyName: {
        type: String,
        required: true,
        trim: true
    },

    role: {
        type: String,
        required: true,
        trim: true
    },

    status: {
        type: String,
        enum: ['Applied', 'OA', 'Interview', 'HR', 'Rejected', 'Offer', 'Ghosted', 'Withdrawn'],
        default: 'Applied'
    },

    jobLink: {
        type: String,
        trim: true,
        default: ''
    },

    location: {
        type: String,
        trim: true
    },

    workMode: {
        type: String,
        enum: ['Remote', 'On-site', 'Hybrid'],
        trim: true
    },

    salary: {
        type: Number,
        min: 0
    },

    appliedDate: {
        type: Date,
        default: Date.now
    },

    notes: {
        type: String,
        trim: true,
        default: ''
    },

    source: {
        type: String,
        enum: ['LinkedIn', 'Company Website', 'Referral', 'Job Board', 'Other'],
        trim: true,
        default: 'Other'
    },

    nextActionDate: {
        type: Date
    },

},{ timestamps: true });

applicationSchema.index({ userId: 1, createdAt: -1 });


module.exports = mongoose.model('Application', applicationSchema);