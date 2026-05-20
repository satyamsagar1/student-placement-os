const SuccessAnalysis = ({
  stats,
  successPercentage,
}) => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow p-6 mb-8 border border-blue-200">

      <h3 className="text-2xl font-bold text-gray-900 mb-4">
        📈 Success Analysis
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Success Rate */}
        <div>
          <p className="text-gray-600 text-sm mb-2">
            Overall Success Rate
          </p>

          <div className="flex items-end">
            <p className="text-4xl font-bold text-green-600">
              {successPercentage}%
            </p>

            <span className="text-gray-500 text-sm ml-2">
              ({stats.offers} offers from{" "}
              {stats.totalApplications} applications)
            </span>
          </div>
        </div>

        {/* Interview Ratio */}
        <div>
          <p className="text-gray-600 text-sm mb-2">
            Application to Interview Ratio
          </p>

          <p className="text-3xl font-bold text-yellow-600">
            {stats.totalApplications > 0
              ? (
                  (stats.interviews /
                    stats.totalApplications) *
                  100
                ).toFixed(1)
              : 0}
            %
          </p>
        </div>

        {/* Offer Ratio */}
        <div>
          <p className="text-gray-600 text-sm mb-2">
            Interview to Offer Ratio
          </p>

          <p className="text-3xl font-bold text-purple-600">
            {stats.interviews > 0
              ? (
                  (stats.offers /
                    stats.interviews) *
                  100
                ).toFixed(1)
              : 0}
            %
          </p>
        </div>
      </div>
    </div>
  );
};

export default SuccessAnalysis;