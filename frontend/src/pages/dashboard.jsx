import { useEffect, useState } from "react";
import api from "../api/axios";

import LoadingState from "../components/dashboard/LoadingState";
import ErrorState from "../components/dashboard/ErrorState";
import StatsSection from "../components/dashboard/StatsSection";
import ChartsSection from "../components/dashboard/ChartsSection";
import SuccessAnalysis from "../components/dashboard/SuccessAnalysis";
import Recommendations from "../components/dashboard/Recommendations";
import ActionItems from "../components/dashboard/ActionItems";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [charts, setCharts] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        const [statsResponse, chartsResponse] =
          await Promise.all([
            api.get("/dashboard/stats"),
            api.get("/dashboard/charts"),
          ]);

        if (statsResponse.data.success) {
          setStats(statsResponse.data.data);
        }

        if (chartsResponse.data.success) {
          setCharts(chartsResponse.data.data);
        }

      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Failed to load dashboard data"
        );

        console.error(
          "Dashboard fetch error:",
          err
        );

      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error} />;
  }

  const successPercentage =
    stats && stats.totalApplications > 0
      ? (
          (stats.offers /
            stats.totalApplications) *
          100
        ).toFixed(1)
      : 0;

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

        {/* Stats */}
        <StatsSection
          stats={stats}
          successPercentage={successPercentage}
        />

        {/* Charts */}
        {charts && (
          <ChartsSection charts={charts} />
        )}

        {/* Success Analysis */}
        <SuccessAnalysis
          stats={stats}
          successPercentage={successPercentage}
        />

        {/* Recommendations */}
        <Recommendations stats={stats} />

        {/* Action Items */}
        <ActionItems />
      </div>
    </div>
  );
};

export default Dashboard;