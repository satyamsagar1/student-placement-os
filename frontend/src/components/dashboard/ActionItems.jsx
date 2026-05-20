const ActionItems = () => {
  const items = [
    {
      icon: "1️⃣",
      title: "Keep Applying",
      desc: "Apply to at least 5 companies per week to maintain an active pipeline",
      bg: "bg-blue-50",
    },
    {
      icon: "2️⃣",
      title: "Optimize Your Resume",
      desc: "Tailor your resume for each application to increase response rate",
      bg: "bg-green-50",
    },
    {
      icon: "3️⃣",
      title: "Interview Preparation",
      desc: "Practice coding problems and behavioral questions to ace interviews",
      bg: "bg-yellow-50",
    },
    {
      icon: "4️⃣",
      title: "Follow Up",
      desc: "Send follow-up emails after applying or interviewing to stay on top",
      bg: "bg-purple-50",
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">

      <h3 className="text-xl font-bold text-gray-900 mb-4">
        🚀 Next Steps
      </h3>

      <div className="space-y-3">

        {items.map((item, idx) => (
          <div
            key={idx}
            className={`flex items-start p-4 rounded-lg ${item.bg}`}
          >
            <span className="text-2xl mr-3">
              {item.icon}
            </span>

            <div>
              <p className="font-semibold text-gray-900">
                {item.title}
              </p>

              <p className="text-sm text-gray-600">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActionItems;