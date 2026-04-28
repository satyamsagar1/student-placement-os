const Application = require("./application.model");

// Create a new application
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
    nextActionDate: applicationData.nextActionDate,
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
    nextActionDate: application.nextActionDate,
  };
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

  let applications = await Application.find(filter).sort({ appliedDate: -1 });

  if (!applications) {
    applications = [];
  }

  return applications.map((app) => ({
    id: app._id,
    companyName: app.companyName,
    role: app.role,
    status: app.status,
    jobLink: app.jobLink,
    location: app.location,
    workMode: app.workMode,
    salary: app.salary,
    appliedDate: app.appliedDate,
    notes: app.notes,
    source: app.source,
    nextActionDate: app.nextActionDate,
  }));
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
  return {
    id: application._id,
    status: application.status,
  };
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
  ];

  allowedFields.forEach((field) => {
    if (applicationData[field] !== undefined) {
      application[field] = applicationData[field];
    }
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
    nextActionDate: application.nextActionDate,
  };
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
