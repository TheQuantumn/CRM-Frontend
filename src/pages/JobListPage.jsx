import React, { useState, useEffect } from "react";
import axios from "../api/axiosInstance";

const JobListPage = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [notes, setNotes] = useState("");
  const [applyError, setApplyError] = useState("");
  const [appliedJobs, setAppliedJobs] = useState(new Set());

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("/jobs", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setJobs(res.data);
      } catch (err) {
        console.error("Failed to fetch jobs", err);
      }
    };

    fetchJobs();
  }, []);

  const handleApply = async (jobId) => {
    setApplyError("");
    try {
      await axios.post(
        `/applications/${jobId}`,
        { notes },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setAppliedJobs((prev) => new Set(prev).add(jobId));
      setSelectedJobId(null);
      setNotes("");
    } catch (err) {
      const msg = err?.response?.data?.message?.toLowerCase() || "";
      if (msg.includes("already applied")) {
        setApplyError("You've already applied for this job.");
        setAppliedJobs((prev) => new Set(prev).add(jobId));
      } else {
        setApplyError("Already Applied.");
      }
    }
  };

  const selectedJob = jobs.find((job) => job.id === selectedJobId);

  return (
    <div className="joblist-container">
      <h2 className="joblist-title">Explore Exciting Job Opportunities</h2>

      <div className="row g-4 justify-content-center">
        {jobs.map((job) => {
          const isSelected = selectedJobId === job.id;
          const isApplied = appliedJobs.has(job.id);

          return (
            <div
              key={job.id}
              className="col-12 col-sm-6 col-md-4 col-lg-3"
              style={{ position: "relative", zIndex: isSelected ? 1050 : 1 }}
            >
              <div
                className={`job-card ${isSelected ? "job-card-selected" : ""}`}
                onClick={() => {
                  if (!isApplied) {
                    setSelectedJobId(job.id);
                    setApplyError("");
                  }
                }}
              >
                <div>
                  <h5 className="job-company">{job.company}</h5>
                  <p className="job-role">{job.role}</p>
                </div>

                <div className="text-center mt-auto">
                  {isApplied ? (
                    <span className="job-applied">Application Submitted</span>
                  ) : (
                    <button className="job-view-btn">View Details</button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {selectedJob && (
        <div className="modal-overlay">
          <div className="job-modal">
            <button
              className="btn-close"
              onClick={() => {
                setSelectedJobId(null);
                setNotes("");
                setApplyError("");
              }}
            >
              ✖️
            </button>

            <h4>{selectedJob.company}</h4>
            <p>
              <strong>Role:</strong> {selectedJob.role}
            </p>

            {selectedJob.description && (
              <div className="mt-3">
                <strong>Description:</strong>
                <p style={{ whiteSpace: "pre-wrap" }}>{selectedJob.description}</p>
              </div>
            )}

            <hr />

            <label htmlFor="notes" className="form-label">
              Add notes (optional):
            </label>
            <textarea
              id="notes"
              className="job-textarea mt-1"
              rows={4}
              placeholder="e.g. Follow up after 2 days"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />

            {applyError && <div className="job-alert mt-2">{applyError}</div>}

            <div className="text-end mt-3">
              <button
                className="btn-apply me-2"
                onClick={() => handleApply(selectedJob.id)}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobListPage;
