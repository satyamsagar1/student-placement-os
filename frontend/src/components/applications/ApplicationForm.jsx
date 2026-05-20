import { useState, useEffect } from "react";

const ApplicationForm = ({ onClose, onSubmit, resumes, initialData }) => {
  const [formData, setFormData] = useState({
    companyName: "",
    role: "",
    status: "Applied",
    appliedDate: "",
    location: "",
    notes: "",
    jobLink: "",
    workMode: "Remote",
    salary: "",
    source: "Other",
    resumeUsed: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        companyName: initialData.companyName || "",

        role: initialData.role || "",

        status: initialData.status || "Applied",

        appliedDate: initialData.appliedDate?.split("T")[0] || "",

        location: initialData.location || "",

        notes: initialData.notes || "",

        jobLink: initialData.jobLink || "",

        workMode: initialData.workMode || "Remote",

        salary: initialData.salary || "",

        source: initialData.source || "Other",

        resumeUsed: initialData.resumeUsed?.id || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      ...formData,
      salary: Number(formData.salary),
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 px-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {initialData ? "Edit Application" : "Add Application"}
          </h2>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black text-2xl"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Company */}
          <input
            type="text"
            name="companyName"
            placeholder="Company Name"
            value={formData.companyName}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />

          {/* Role */}
          <input
            type="text"
            name="role"
            placeholder="Role"
            value={formData.role}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />

          {/* Status */}
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          >
            <option value="Applied">Applied</option>

            <option value="Interview">Interview</option>

            <option value="Offer">Offer</option>

            <option value="Rejected">Rejected</option>
          </select>

          {/* Applied Date */}
          <input
            type="date"
            name="appliedDate"
            value={formData.appliedDate}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />

          {/* Location */}
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />

          {/* Job Link */}
          <input
            type="url"
            name="jobLink"
            placeholder="Job/Application Link"
            value={formData.jobLink}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />

          {/* Work Mode */}
          <select
            name="workMode"
            value={formData.workMode}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          >
            <option value="Remote">Remote</option>

            <option value="On-site">On-site</option>

            <option value="Hybrid">Hybrid</option>
          </select>

          {/* Salary */}
          <input
            type="number"
            name="salary"
            placeholder="Salary"
            value={formData.salary}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />

          {/* Source */}
          <select
            name="source"
            value={formData.source}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          >
            <option value="LinkedIn">LinkedIn</option>

            <option value="Company Website">Company Website</option>

            <option value="Referral">Referral</option>

            <option value="Job Board">Job Board</option>

            <option value="Other">Other</option>
          </select>

          {/* Resume Used */}
          <select
            name="resumeUsed"
            value={formData.resumeUsed}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          >
            <option value="">Select Resume</option>

            {resumes.map((resume) => (
              <option key={resume.id} value={resume.id}>
                {resume.originalName}
              </option>
            ))}
          </select>

          {/* Notes */}
          <textarea
            name="notes"
            placeholder="Notes"
            value={formData.notes}
            onChange={handleChange}
            rows={4}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-gray-300 py-2 rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
            >
              {initialData ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplicationForm;
