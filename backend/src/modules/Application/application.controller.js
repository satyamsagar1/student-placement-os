const applicationService = require('./application.services');


// Create a new application

const createApplication = async (req, res) => {
    try{
        const userId = req.user.id; // Get user ID from authenticated request
        
        const {companyName, role} = req.body;

        if(!companyName || !role){
            return res.status(400).json({ error: 'Company name and role are required' });
        }
        
        const applicationData = req.body; // Get application data from request body

        const newApplication = await applicationService.createApplication(userId, applicationData);

        res.status(201).json({
            success: true,
            message: 'Application created successfully',
            data: newApplication
        });
    } catch (error) {
        res.status(res.error?.statusCode || 500).json({ error: error.message || 'Failed to create application' });
    }
}

module.exports = {
    createApplication
}