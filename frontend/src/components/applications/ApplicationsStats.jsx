const ApplicationsStats = ({ stats }) => {
  const cards = [
    {
      title: "Total",
      value: stats.total,
      color: "text-blue-600",
      icon: "📋",
    },
    {
      title: "Interviews",
      value: stats.interviews,
      color: "text-yellow-600",
      icon: "🎤",
    },
    {
      title: "Offers",
      value: stats.offers,
      color: "text-green-600",
      icon: "🏆",
    },
    {
      title: "Rejected",
      value: stats.rejected,
      color: "text-red-600",
      icon: "❌",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-white rounded-xl shadow-md p-6"
        >
          <div className="flex justify-between items-center">

            <div>
              <p className="text-gray-500 text-sm">
                {card.title}
              </p>

              <h3 className={`text-3xl font-bold mt-2 ${card.color}`}>
                {card.value}
              </h3>
            </div>

            <div className="text-4xl">
              {card.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ApplicationsStats;