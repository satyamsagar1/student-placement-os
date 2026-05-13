import api from "../api/axios";
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [charts, setCharts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [statsResponse, chartsResponse] = await Promise.all([
          api.get("/dashboard/stats"),
          api.get("/dashboard/charts"),
        ]);

        if (statsResponse.data.success) {
          setStats(statsResponse.data.data);
        }
        if (chartsResponse.data.success) {
          setCharts(chartsResponse.data.data);
        }
      } catch (error) {
        setError("Failed to load dashboard data");
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600 text-lg">
            Loading your dashboard...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center text-red-600">
          <p className="text-xl">{error}</p>
        </div>
      </div>
    );
  }

  const COLORS = [
    "#3b82f6",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
    "#ec4899",
  ];

  // Calculate success percentage
  const successPercentage = stats
    ? ((stats.offers / stats.totalApplications) * 100).toFixed(1)
    : 0;

  // Determine status and recommendations
  const getRecommendations = () => {
    const recommendations = [];

    if (stats.responseRate < 50) {
      recommendations.push({
        icon: "📝",
        title: "Improve Resume Quality",
        desc: "Your response rate is below 50%. Consider updating your resume with stronger keywords and achievements.",
      });
    }

    if (stats.activePipeline < stats.totalApplications * 0.2) {
      recommendations.push({
        icon: "📤",
        title: "Apply to More Companies",
        desc: "Keep your pipeline active. Apply to at least 20% of your total applications regularly.",
      });
    }

    if (stats.interviews < stats.totalApplications * 0.1) {
      recommendations.push({
        icon: "🎤",
        title: "Practice Interview Skills",
        desc: "Prepare for interviews by practicing common questions and technical concepts.",
      });
    }

    if (recommendations.length === 0) {
      recommendations.push({
        icon: "🎉",
        title: "Great Progress!",
        desc: "You are doing great! Keep applying and practicing. Success is around the corner.",
      });
    }

    return recommendations;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Placement Dashboard
          </h1>
          <p className="text-gray-600">
            Track your application progress and success metrics
          </p>
        </div>

        {/* Key Metrics */}
        {stats && (
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
                            (stats.activePipeline / stats.totalApplications) *
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
                            (stats.interviews / stats.totalApplications) *
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
                    <p className="text-gray-600 text-sm font-medium">Offers</p>
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

              {/* Total Responses */}
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
                            (stats.rejections / stats.totalApplications) *
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

            {/* Charts Section */}
            {charts && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Status Distribution Pie Chart */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Application Status Distribution
                  </h3>
                  {charts.statusDistribution &&
                  charts.statusDistribution.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={charts.statusDistribution}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ status, count, percent }) =>
                            `${status}: ${count}`
                          }
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="count"
                        >
                          {charts.statusDistribution.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  ) : (
                    <p className="text-gray-500 text-center py-8">
                      No data available
                    </p>
                  )}
                </div>

                {/* Monthly Trend Line Chart */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Monthly Application Trend
                  </h3>
                  {charts.monthlyTrend && charts.monthlyTrend.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={charts.monthlyTrend}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="count"
                          stroke="#3b82f6"
                          strokeWidth={2}
                          dot={{ fill: "#3b82f6" }}
                          activeDot={{ r: 6 }}
                          name="Applications"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  ) : (
                    <p className="text-gray-500 text-center py-8">
                      No data available
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Success Analysis */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow p-6 mb-8 border border-blue-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                📈 Success Analysis
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <p className="text-gray-600 text-sm mb-2">
                    Overall Success Rate
                  </p>
                  <div className="flex items-end">
                    <p className="text-4xl font-bold text-green-600">
                      {successPercentage}%
                    </p>
                    <span className="text-gray-500 text-sm ml-2">
                      ({stats.offers} offers from {stats.totalApplications}{" "}
                      applications)
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-gray-600 text-sm mb-2">
                    Application to Interview Ratio
                  </p>
                  <p className="text-3xl font-bold text-yellow-600">
                    {stats.totalApplications > 0
                      ? (
                          (stats.interviews / stats.totalApplications) *
                          100
                        ).toFixed(1)
                      : 0}
                    %
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm mb-2">
                    Interview to Offer Ratio
                  </p>
                  <p className="text-3xl font-bold text-purple-600">
                    {stats.interviews > 0
                      ? ((stats.offers / stats.interviews) * 100).toFixed(1)
                      : 0}
                    %
                  </p>
                </div>
              </div>
            </div>

            {/* Recommendations & Path to Success */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                🎯 Path to Success
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {getRecommendations().map((rec, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition border-l-4 border-blue-600"
                  >
                    <div className="flex items-start">
                      <span className="text-3xl mr-4">{rec.icon}</span>
                      <div>
                        <h4 className="text-lg font-bold text-gray-900 mb-2">
                          {rec.title}
                        </h4>
                        <p className="text-gray-600">{rec.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Items */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                🚀 Next Steps
              </h3>
              <div className="space-y-3">
                <div className="flex items-start p-4 bg-blue-50 rounded-lg">
                  <span className="text-2xl mr-3">1️⃣</span>
                  <div>
                    <p className="font-semibold text-gray-900">Keep Applying</p>
                    <p className="text-sm text-gray-600">
                      Apply to at least 5 companies per week to maintain an
                      active pipeline
                    </p>
                  </div>
                </div>
                <div className="flex items-start p-4 bg-green-50 rounded-lg">
                  <span className="text-2xl mr-3">2️⃣</span>
                  <div>
                    <p className="font-semibold text-gray-900">
                      Optimize Your Resume
                    </p>
                    <p className="text-sm text-gray-600">
                      Tailor your resume for each application to increase
                      response rate
                    </p>
                  </div>
                </div>
                <div className="flex items-start p-4 bg-yellow-50 rounded-lg">
                  <span className="text-2xl mr-3">3️⃣</span>
                  <div>
                    <p className="font-semibold text-gray-900">
                      Interview Preparation
                    </p>
                    <p className="text-sm text-gray-600">
                      Practice coding problems and behavioral questions to ace
                      interviews
                    </p>
                  </div>
                </div>
                <div className="flex items-start p-4 bg-purple-50 rounded-lg">
                  <span className="text-2xl mr-3">4️⃣</span>
                  <div>
                    <p className="font-semibold text-gray-900">Follow Up</p>
                    <p className="text-sm text-gray-600">
                      Send follow-up emails after applying or interviewing to
                      stay on top
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
