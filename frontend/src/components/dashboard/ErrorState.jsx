const ErrorState = ({ message }) => {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
      <p className="text-red-600 font-medium">
        {message}
      </p>
    </div>
  );
};

export default ErrorState;