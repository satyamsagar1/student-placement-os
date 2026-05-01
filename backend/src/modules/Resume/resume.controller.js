const resumeService = require('./resume.services');


const addResume = async(req,res)=>{
    try {
        const userId = req.user.id;
        const file = req.file;

        if(!file){
            return res.status(400).json({ message: 'No file uploaded' });
        }
        const resumeData = {
            userId,
            originalName: file.originalname,
            fileUrl: `/uploads/resumes/${file.filename}`,
            fileSize: file.size,
            mimeType: file.mimetype
        };
        const resume = await resumeService.addResume(resumeData);
        res.status(201).json({
            success: true,
            message: 'Resume uploaded successfully',
            data: resume
        });
    } catch (error) {
        console.error('Error uploading resume:', error);
        res.status(error.statusCode || 500).json({
            success: false,
            message: 'Failed to upload resume',
            error: error.message
        });
    }
}

const getResumes = async(req,res)=>{
    try{
        const userId = req.user.id;
        const resumes = await resumeService.getResumes(userId);
        res.status(200).json({
            success:true,
            message:"Resumes retrieved successfully",
            data:resumes
        });
    }
    catch(error){
        console.error('Error retrieving resumes:', error);
        res.status(error.statusCode || 500).json({
            success: false,
            message: 'Failed to retrieve resumes',
            error: error.message
        });
    }
}

 const getResumeById = async(req,res)=>{
    try{
        const userId = req.user.id;
        const resumeId = req.params.id;
        const resume = await resumeService.getResumeById(userId,resumeId);

        res.status(200).json({
            success:true,
            message:"Resume retrieved successfully",
            data:resume
        });
    }catch(error){
        console.error('Error retrieving resume:', error);
        res.status(error.statusCode || 500).json({  
            success: false,
            message: 'Failed to retrieve resume',
            error: error.message
        });
    }
};

const deleteResume = async(req,res)=>{
    try{
        const userId = req.user.id;
        const resumeId = req.params.id;
        await resumeService.deleteResume(userId,resumeId);

        res.status(200).json({
            success:true,
            message:"Resume deleted successfully"
        });
    }
    catch(error){
        console.error('Error deleting resume:', error);
        res.status(error.statusCode || 500).json({  
            success: false,
            message: 'Failed to delete resume',
            error: error.message
        });
    }
};

module.exports={addResume, getResumes, getResumeById, deleteResume};