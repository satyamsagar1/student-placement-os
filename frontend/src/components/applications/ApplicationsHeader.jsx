const ApplicationsHeader = ({ onAdd }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">

      <div>
        <h1 className="text-4xl font-bold text-gray-900">
          Applications
        </h1>

        <p className="text-gray-600 mt-2">
          Track and manage your job applications
        </p>
      </div>

      <button
        onClick={onAdd}
        className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-semibold transition"
      >
        + Add Application
      </button>
    </div>
  );
};

export default ApplicationsHeader;