const StatsSection = ({ stats, successPercentage }) => {
  return (
    <>
      {/* Top Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

        {/* Total Applications */}
        <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">
                Total Applications
              </p>

              <p className="text-3xl font-bold text-gray-900 mt-2">
                {stats.totalApplications}
              </p>
            </div>

            <div className="text-4xl">📋</div>
          </div>
        </div>

        {/* Active Pipeline */}
        <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">
                Active Pipeline
              </p>

              <p className="text-3xl font-bold text-blue-600 mt-2">
                {stats.activePipeline}
              </p>

              <p className="text-xs text-gray-500 mt-1">
                {stats.totalApplications > 0
                  ? (
                      (stats.activePipeline /
                        stats.totalApplications) *
                      100
                    ).toFixed(0)
                  : 0}
                % of total
              </p>
            </div>

            <div className="text-4xl">🔄</div>
          </div>
        </div>

        {/* Interviews */}
        <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">
                Interviews
              </p>

              <p className="text-3xl font-bold text-yellow-600 mt-2">
                {stats.interviews}
              </p>

              <p className="text-xs text-gray-500 mt-1">
                {stats.totalApplications > 0
                  ? (
                      (stats.interviews /
                        stats.totalApplications) *
                      100
                    ).toFixed(0)
                  : 0}
                % conversion
              </p>
            </div>

            <div className="text-4xl">🎤</div>
          </div>
        </div>

        {/* Offers */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg shadow p-6 hover:shadow-lg transition border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">
                Offers
              </p>

              <p className="text-3xl font-bold text-green-600 mt-2">
                {stats.offers}
              </p>

              <p className="text-xs text-gray-500 mt-1">
                {successPercentage}% success rate
              </p>
            </div>

            <div className="text-4xl">🏆</div>
          </div>
        </div>
      </div>

      {/* Secondary Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

        {/* Response Rate */}
        <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">
                Response Rate
              </p>

              <p className="text-3xl font-bold text-purple-600 mt-2">
                {stats.responseRate}%
              </p>

              <p className="text-xs text-gray-500 mt-1">
                {stats.responses} responses
              </p>
            </div>

            <div className="text-4xl">📊</div>
          </div>
        </div>

        {/* Responses */}
        <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">
                Total Responses
              </p>

              <p className="text-3xl font-bold text-indigo-600 mt-2">
                {stats.responses}
              </p>

              <p className="text-xs text-gray-500 mt-1">
                From {stats.totalApplications} applications
              </p>
            </div>

            <div className="text-4xl">✉️</div>
          </div>
        </div>

        {/* Rejections */}
        <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">
                Rejections
              </p>

              <p className="text-3xl font-bold text-red-600 mt-2">
                {stats.rejections}
              </p>

              <p className="text-xs text-gray-500 mt-1">
                {stats.totalApplications > 0
                  ? (
                      (stats.rejections /
                        stats.totalApplications) *
                      100
                    ).toFixed(0)
                  : 0}
                % of total
              </p>
            </div>

            <div className="text-4xl">❌</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StatsSection;