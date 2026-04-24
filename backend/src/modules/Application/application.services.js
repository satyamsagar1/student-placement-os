const User = require('../User/user.model');
const Application = require('./application.model');

// Create a new application
const createApplication = async (userId, applicationData) => {

    const application = new Application({
        userId,
        companyName: applicationData.companyName,
        role: applicationData.role,
        status: applicationData.status || 'Applied',
        jobLink: applicationData.jobLink,
        location: applicationData.location,
        workMode: applicationData.workMode, 
        salary: applicationData.salary,
        appliedDate: applicationData.appliedDate,
        notes: applicationData.notes,
        source: applicationData.source,
        nextActionDate: applicationData.nextActionDate
    });
    await application.save();

    return {
        id: application._id,
        companyName: application.companyName,
        role: application.role,
        status: application.status,
        jobLink: application.jobLink,
        location: application.location,
        workMode: application.workMode,
        salary: application.salary,
        appliedDate: application.appliedDate,
        notes: application.notes,
        source: application.source,
        nextActionDate: application.nextActionDate
    }
}

module.exports = {
    createApplication
}