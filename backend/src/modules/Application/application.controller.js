const applicationService = require('./application.services');
const {validateCreateApplication, validateUpdateApplication, validateStatus} = require('./application.validation')


// Create a new application

const createApplication = async (req, res) => {
    console.log(req.body);
    try{
        const userId = req.user.id; // Get user ID from authenticated request
        
        const applicationData = req.body; // Get application data from request body

        const validateApplicationData = validateCreateApplication(applicationData);

        const newApplication = await applicationService.createApplication(userId, validateApplicationData);

        res.status(201).json({
            success: true,
            message: 'Application created successfully',
            data: newApplication
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({
            success: false,
            message: 'Failed to create application',
            error: error.message || 'Failed to create application' });
    }
}

const getApplications = async (req, res) => {
    try {
        const userId = req.user.id; // Get user ID from authenticated request

        const filters = req.query; // Get query parameters for filtering, sorting, pagination   
        
        const applications = await applicationService.getApplications(userId, filters);

        const count = applications.length;

        res.status(200).json({
            success: true,
            message: 'Applications retrieved successfully',
            count,
            data: applications
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({
            success: false,
            message: 'Failed to retrieve applications',
            error: error.message || 'Failed to retrieve applications' });
    }
}

const updateApplicationStatus = async(req, res) =>{
    
    try{
        const userId = req.user.id; // Get user ID from authenticated request
        const applicationId = req.params.id; // Get application ID from URL parameters
        const { status } = req.body; // Get new status from request body
        if(!status){
            return res.status(400).json({ error: 'Status is required' });
        }

        const validatedStatus = validateStatus(status);

        const updatedApplication = await applicationService.updateApplicationStatus(userId, applicationId, validatedStatus);

        res.status(200).json({
            success: true,
            message: 'Application status updated successfully',
            data: updatedApplication
        });
    }
    catch (error) {
        res.status(error.statusCode || 500).json({
            success: false,
            message: 'Failed to update application status',
            error: error.message || 'Failed to update application status' });
    }
}

const updateApplication = async(req, res) =>{
    // Similar to updateApplicationStatus but allows updating multiple fields of the application
    try{
        const userId = req.user.id; // Get user ID from authenticated request
        const applicationId = req.params.id;
        const applicationData = req.body; // Get updated application data from request body

        const validateApplicationData = validateUpdateApplication(applicationData);

        const updatedApplication = await applicationService.updateApplication(userId, applicationId, validateApplicationData);

        res.status(200).json({
            success: true,
            message: 'Application updated successfully',
            data: updatedApplication
        });
    }
    catch (error) {
        res.status(error.statusCode || 500).json({
            success: false,
            message: 'Failed to update application',
            error: error.message || 'Failed to update application' });

    }
}

const deleteApplication = async(req, res) =>{
    try{
        const userId = req.user.id; // Get user ID from authenticated request
        const applicationId = req.params.id; // Get application ID from URL parameters
        await applicationService.deleteApplication(userId, applicationId);
        res.status(200).json({
            success: true,
            message: 'Application deleted successfully'
        });
    }
    catch (error) {
        res.status(error.statusCode || 500).json({
            success: false,
            message: 'Failed to delete application',
            error: error.message || 'Failed to delete application' });
    }
}

module.exports = {
    createApplication,
    getApplications,
    updateApplicationStatus,
    updateApplication,
    deleteApplication
}
