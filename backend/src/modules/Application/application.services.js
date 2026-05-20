const Application = require("./application.model");

const formatApplication = (application) => ({
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
  resumeUsed: application.resumeUsed
    ? {
        id: application.resumeUsed._id,

        originalName: application.resumeUsed.originalName,
      }
    : null,
  nextActionDate: application.nextActionDate,
});

const createApplication = async (userId, applicationData) => {
  const application = new Application({
    userId,
    companyName: applicationData.companyName,
    role: applicationData.role,
    status: applicationData.status || "Applied",
    jobLink: applicationData.jobLink,
    location: applicationData.location,
    workMode: applicationData.workMode,
    salary: applicationData.salary,
    appliedDate: applicationData.appliedDate,
    notes: applicationData.notes,
    source: applicationData.source,
    resumeUsed: applicationData.resumeUsed,
    nextActionDate: applicationData.nextActionDate,
  });
  await application.save();
  console.log(application);

  const populatedApplication = await Application.findById(
    application._id,
  ).populate("resumeUsed", "originalName");

  return formatApplication(populatedApplication);
};

const getApplications = async (userId, filters) => {
  const filter = { userId };

  if (filters.status) {
    filter.status = filters.status;
  }
  if (filters.companyName) {
    filter.companyName = { $regex: filters.companyName, $options: "i" };
  }
  if (filters.source) {
    filter.source = { $regex: filters.source, $options: "i" };
  }

  const applications = await Application.find(filter)
    .populate("resumeUsed", "originalName")
    .sort({ appliedDate: -1 });

  return applications.map(formatApplication);
};

const updateApplicationStatus = async (userId, applicationId, newStatus) => {
  const application = await Application.findOne({ _id: applicationId, userId });

  if (!application) {
    const error = new Error("Application not found");
    error.statusCode = 404;
    throw error;
  }
  application.status = newStatus;
  await application.save();

  return formatApplication(application);
};

const updateApplication = async (userId, applicationId, applicationData) => {
  const application = await Application.findOne({ _id: applicationId, userId });

  if (!application) {
    const error = new Error("Application not found");
    error.statusCode = 404;
    throw error;
  }

  const allowedFields = [
    "companyName",
    "role",
    "status",
    "jobLink",
    "location",
    "workMode",
    "salary",
    "appliedDate",
    "notes",
    "source",
    "nextActionDate",
    "resumeUsed",
  ];

  allowedFields.forEach((field) => {
    if (applicationData[field] !== undefined) {
      application[field] = applicationData[field];
    }
  });

  await application.save();

  const populatedApplication = await Application.findById(
    application._id,
  ).populate("resumeUsed", "originalName");

  return formatApplication(populatedApplication);
};

const deleteApplication = async (userId, applicationId) => {
  const application = await Application.findOne({ _id: applicationId, userId });

  if (!application) {
    const error = new Error("Application not found");
    error.statusCode = 404;
    throw error;
  }

  await application.deleteOne();
};

module.exports = {
  createApplication,
  getApplications,
  updateApplicationStatus,
  updateApplication,
  deleteApplication,
};
