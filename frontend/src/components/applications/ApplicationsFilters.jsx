const ApplicationsFilters = ({
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 mb-8">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search */}
        <input
          type="text"
          placeholder="Search company or role..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Status</option>

          <option value="Applied">Applied</option>

          <option value="OA">OA</option>

          <option value="Interview">Interview</option>

          <option value="HR">HR</option>

          <option value="Offer">Offer</option>

          <option value="Rejected">Rejected</option>

          <option value="Ghosted">Ghosted</option>

          <option value="Withdrawn">Withdrawn</option>
        </select>
      </div>
    </div>
  );
};

export default ApplicationsFilters;
