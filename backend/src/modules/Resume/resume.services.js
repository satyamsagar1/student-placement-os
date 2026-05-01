const Resume = require('./resume.model');
const fs = require('node:fs');
const path = require('node:path');

const formatResume = (resume) => ({
    id: resume._id,
    originalName: resume.originalName,
    fileUrl: resume.fileUrl,
    fileSize: resume.fileSize,
    mimeType: resume.mimeType,
    isDefault: resume.isDefault,
});

const addResume = async (resumeData) => {

    const newResume = new Resume(resumeData);
    await newResume.save();  

    return formatResume(newResume);

};

const getResumes = async (userId) => {
    const resumes = await Resume.find({ userId }).sort({ createdAt: -1 });
    return resumes.map(resume => formatResume(resume)
);
};

const getResumeById = async (userId, resumeId) => {
    const resume = await Resume.findOne({ _id: resumeId, userId });
    if (!resume) {
        const error = new Error('Resume not found');
        error.statusCode = 404;
        throw error;
    }
    return formatResume(resume);
};

const deleteResume = async (userId, resumeId) => {
  const resume = await Resume.findOne({ _id: resumeId, userId });

  if (!resume) {
    const error = new Error("Resume not found");
    error.statusCode = 404;
    throw error;
  }
  const fileName = path.basename(resume.fileUrl);
  const pathToFile = path.join(__dirname, "../../uploads/resumes", fileName);

  if (fs.existsSync(pathToFile)) {
    fs.unlinkSync(pathToFile);
  }

  await resume.deleteOne();

  return formatResume(resume);
};

module.exports = { addResume, getResumes, getResumeById, deleteResume };