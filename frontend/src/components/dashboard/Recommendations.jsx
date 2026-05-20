const Recommendations = ({ stats }) => {

  const getRecommendations = () => {
    const recommendations = [];

    if (stats.responseRate < 50) {
      recommendations.push({
        icon: "📝",
        title: "Improve Resume Quality",
        desc: "Your response rate is below 50%. Consider updating your resume with stronger keywords and achievements.",
      });
    }

    if (
      stats.activePipeline <
      stats.totalApplications * 0.2
    ) {
      recommendations.push({
        icon: "📤",
        title: "Apply to More Companies",
        desc: "Keep your pipeline active. Apply to at least 20% of your total applications regularly.",
      });
    }

    if (
      stats.interviews <
      stats.totalApplications * 0.1
    ) {
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

              <span className="text-3xl mr-4">
                {rec.icon}
              </span>

              <div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">
                  {rec.title}
                </h4>

                <p className="text-gray-600">
                  {rec.desc}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommendations;