import ApplicationCard from "./ApplicationCard";

const ApplicationsList = ({
  applications,
  onEdit,
  onDelete,
  onStatusChange
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

      {applications.map((application) => (
        <ApplicationCard
          key={application.id}
          application={application}
          onEdit={onEdit}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  );
};

export default ApplicationsList;