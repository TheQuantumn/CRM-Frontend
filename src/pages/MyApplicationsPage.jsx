import React, { useEffect, useState } from "react";
import axios from "axios";

const MyApplications = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/applications/my", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setApplications(res.data);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };

    fetchApplications();
  }, []);

  const handleStatusChange = async (applicationId, newStatus) => {
    try {
      await axios.patch(
        `http://localhost:8080/api/applications/${applicationId}/status`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setApplications((prev) =>
        prev.map((app) =>
          app.id === applicationId ? { ...app, status: newStatus } : app
        )
      );
    } catch (err) {
      console.error("Failed to update status", err);
      alert("Failed to update status");
    }
  };

  const statusOptions = ["Applied", "Interviewing", "Rejected", "Offered", "Accepted"];

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "2rem",
        background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "2rem",
          color: "#FF78AC",
          textShadow: "0 0 10px rgba(255, 120, 172, 0.6)",
        }}
      >
        My Job Applications
      </h2>

      <div className="row">
        {applications.length > 0 ? (
          applications.map((app) => (
            <div key={app.id} className="col-md-6 col-lg-4 mb-4">
              <div
                style={{
                  background: "rgba(255, 255, 255, 0.08)",
                  backdropFilter: "blur(12px)",
                  borderRadius: "16px",
                  boxShadow: "0 0 20px rgba(0, 255, 255, 0.2)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  padding: "1.5rem",
                  color: "#fff",
                  transition: "transform 0.3s",
                }}
              >
                <h5 style={{ color: "#00FFFF" }}>{app.job?.company}</h5>
                <h6 style={{ color: "#b2b2ff" }}>{app.job?.role}</h6>
                <p>
                  <strong style={{ color: "#FF78AC" }}>Applied On:</strong>{" "}
                  {app.appliedDate
                    ? new Date(app.appliedDate).toLocaleDateString()
                    : "N/A"}
                  <br />
                  {app.notes && (
                    <>
                      <strong style={{ color: "#FFA07A" }}>Notes:</strong> {app.notes}
                      <br />
                    </>
                  )}
                  <strong style={{ color: "#7FFFD4" }}>Status:</strong>{" "}
                  <select
                    value={app.status || "Applied"}
                    onChange={(e) => handleStatusChange(app.id, e.target.value)}
                    style={{
                      marginTop: "0.5rem",
                      padding: "0.3rem",
                      borderRadius: "8px",
                      background: "#1f1f2e",
                      color: "#fff",
                      border: "1px solid #00FFFF",
                      width: "100%",
                    }}
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </p>
              </div>
            </div>
          ))
        ) : (
          <div
            className="text-center"
            style={{
              marginTop: "4rem",
              color: "#ccc",
              fontStyle: "italic",
            }}
          >
            No applications found.
          </div>
        )}
      </div>
    </div>
  );
};

export default MyApplications;
