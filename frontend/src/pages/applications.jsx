import { useEffect, useMemo, useState } from "react";

import api from "../api/axios";

import ApplicationsHeader from "../components/applications/ApplicationsHeader";
import ApplicationsStats from "../components/applications/ApplicationsStats";
import ApplicationsFilters from "../components/applications/ApplicationsFilters";
import ApplicationsList from "../components/applications/ApplicationsList";
import ApplicationsEmpty from "../components/applications/ApplicationsEmpty";
import ApplicationsLoading from "../components/applications/ApplicationsLoading";
import ApplicationForm from "../components/applications/ApplicationForm";

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingApplication, setEditingApplication] = useState(null);
  const [resumes, setResumes] = useState([])

  // Fetch Applications
  const fetchApplications = async () => {
    try {
      setLoading(true);

      const response = await api.get("/applications");

      const resumesResponse = await api.get("/resumes");

      if (response.data.success) {
        setApplications(response.data.data);
      }

      if (resumesResponse.data.success) {
        setResumes(resumesResponse.data.data);
      }
      console.log(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load applications");

      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  // Filter Applications
  const filteredApplications = useMemo(() => {
    return applications.filter((app) => {
      const matchesSearch =
        app.companyName?.toLowerCase().includes(search.toLowerCase()) ||
        app.role?.toLowerCase().includes(search.toLowerCase());

      const matchesStatus = statusFilter === "" || app.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [applications, search, statusFilter]);

  // Stats
  const stats = useMemo(() => {
    return {
      total: applications.length,

      interviews: applications.filter((app) => app.status === "Interview")
        .length,

      offers: applications.filter((app) => app.status === "Offer").length,

      rejected: applications.filter((app) => app.status === "Rejected").length,
    };
  }, [applications]);

  // Add Application
  const handleAddApplication = async (formData) => {
    try {
      console.log(formData)
      const response = await api.post("/applications", formData);

      if (response.data.success) {
        await fetchApplications();

setShowForm(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Edit Application
  const handleEditApplication = async (formData) => {
    try {
      console.log(formData);
      const response = await api.put(
        `/applications/${editingApplication.id}`,
        formData,
      );

      if (response.data.success) {
        await fetchApplications();
        setEditingApplication(null);

        setShowForm(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      const response = await api.patch(`/applications/${id}/status`, {
        status,
      });

      if (response.data.success) {
        setApplications((prev) =>
          prev.map((app) =>
            app.id === id
              ? {
                  ...app,
                  status,
                }
              : app,
          ),
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Delete Application
  const handleDeleteApplication = async (id) => {
    const confirmed = window.confirm("Delete this application?");

    if (!confirmed) return;

    try {
      await api.delete(`/applications/${id}`);

      setApplications((prev) => prev.filter((app) => app.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // Open Edit Form
  const handleEditClick = (application) => {
    setEditingApplication(application);

    setShowForm(true);
  };

  // Open Add Form
  const handleAddClick = () => {
    setEditingApplication(null);

    setShowForm(true);
  };

  if (loading) {
    return <ApplicationsLoading />;
  }

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <ApplicationsHeader onAdd={handleAddClick} />

        {/* Stats */}
        <ApplicationsStats stats={stats} />

        {/* Filters */}
        <ApplicationsFilters
          search={search}
          setSearch={setSearch}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />

        {/* Empty State */}
        {filteredApplications.length === 0 ? (
          <ApplicationsEmpty onAdd={handleAddClick} />
        ) : (
          <ApplicationsList
            applications={filteredApplications}
            onEdit={handleEditClick}
            onDelete={handleDeleteApplication}
            onStatusChange={handleStatusChange}
          />
        )}

        {/* Form Modal */}
        {showForm && (
          <ApplicationForm
            initialData={editingApplication}
            onClose={() => setShowForm(false)}
            resumes={resumes}
            onSubmit={
              editingApplication ? handleEditApplication : handleAddApplication
            }
          />
        )}
      </div>
    </div>
  );
};

export default Applications;
