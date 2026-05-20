const statusColors = {
  Applied: "bg-blue-100 text-blue-700",
  OA: "bg-purple-100 text-purple-700",
  Interview: "bg-yellow-100 text-yellow-700",
  HR: "bg-indigo-100 text-indigo-700",
  Offer: "bg-green-100 text-green-700",
  Rejected: "bg-red-100 text-red-700",
  Ghosted: "bg-gray-200 text-gray-700",
  Withdrawn: "bg-orange-100 text-orange-700",
};

const ApplicationCard = ({ application, onEdit, onDelete, onStatusChange }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            {application.companyName}
          </h2>

          <p className="text-gray-600 mt-1 text-lg">{application.role}</p>
        </div>

        <select
          value={application.status}
          onChange={(e) => onStatusChange(application.id, e.target.value)}
          className={`px-3 py-1 rounded-full text-sm font-semibold border-none outline-none cursor-pointer ${
            statusColors[application.status]
          }`}
        >
          <option value="Applied">Applied</option>

          <option value="OA">OA</option>

          <option value="Interview">Interview</option>

          <option value="HR">HR</option>

          <option value="Offer">Offer</option>

          <option value="Rejected">Rejected</option>

          <option value="Ghosted">Ghosted</option>

          <option value="Withdrawn">Withdrawn</option>
        </select>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6 text-sm text-gray-700">
        <p>
          📍 <span className="font-medium">Location:</span>{" "}
          {application.location || "N/A"}
        </p>

        <p>
          💼 <span className="font-medium">Mode:</span>{" "}
          {application.workMode || "N/A"}
        </p>

        <p>
          🌐 <span className="font-medium">Source:</span>{" "}
          {application.source || "Other"}
        </p>

        <p>
          📅 <span className="font-medium">Applied:</span>{" "}
          {new Date(application.appliedDate).toLocaleDateString()}
        </p>

        {application.salary && (
          <p>
            💰 <span className="font-medium">Salary:</span> ₹
            {application.salary.toLocaleString()}
          </p>
        )}

        {application.resumeUsed && (
          <p>
            📄 <span className="font-medium">Resume:</span>{" "}
            {application.resumeUsed.originalName || "Resume"}
          </p>
        )}
      </div>

      {/* Notes */}
      {application.notes && (
        <div className="mt-4 bg-gray-50 rounded-lg p-3">
          <p className="text-sm text-gray-600">📝 {application.notes}</p>
        </div>
      )}

      {/* Footer */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-6">
        {/* Job Link */}
        {application.jobLink ? (
          <a
            href={application.jobLink}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 hover:underline font-medium"
          >
            🔗 View Job Posting
          </a>
        ) : (
          <span className="text-gray-400 text-sm">No job link</span>
        )}

        {/* Actions */}
        <div className="flex gap-3">

          <button
            onClick={() => onEdit(application)}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-medium transition"
          >
            Edit
          </button>

          <button
            onClick={() => onDelete(application.id)}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplicationCard;
