const ApplicationsEmpty = ({ onAdd }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-10 text-center">

      <div className="text-6xl mb-4">
        📂
      </div>

      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        No Applications Yet
      </h2>

      <p className="text-gray-500 mb-6">
        Start tracking your placement journey by adding your first application.
      </p>

      <button
        onClick={onAdd}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
      >
        + Add Application
      </button>
    </div>
  );
};

export default ApplicationsEmpty;