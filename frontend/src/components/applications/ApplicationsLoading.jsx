const ApplicationsLoading = () => {
  return (
    <div className="flex justify-center items-center py-20">
      <div className="text-center">
        <div className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>

        <p className="mt-4 text-gray-600">
          Loading applications...
        </p>
      </div>
    </div>
  );
};

export default ApplicationsLoading;