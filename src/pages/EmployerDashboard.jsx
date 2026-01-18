import React, { useState, useEffect } from "react";

const EmployerDashboard = ({ user }) => {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    job_type: "remote",
    education: "form4",
    company_name: "",
    salary_min: "",
    salary_max: "",
    location: "",
  });

  const token = localStorage.getItem("token");

  // ---------------- Fetch Jobs ----------------
  const fetchJobs = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/jobs", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setJobs(data || []);
    } catch {
      setJobs([]);
    }
  };

  // ---------------- Fetch Applications ----------------
  const fetchApplications = async () => {
    try {
      const res = await fetch(
        "http://127.0.0.1:5000/employer/applications",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await res.json();
      setApplications(data.applications || []);
    } catch {
      setApplications([]);
    }
  };

  useEffect(() => {
    fetchJobs();
    fetchApplications();
  }, []);

  // ---------------- Add Job ----------------
  const handleAddJob = async () => {
    if (!form.title || !form.description || !form.company_name) {
      alert("Title, Description, and Company Name are required");
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:5000/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...form,
          salary_min: form.salary_min ? Number(form.salary_min) : null,
          salary_max: form.salary_max ? Number(form.salary_max) : null,
          location: form.job_type === "remote" ? null : form.location,
        }),
      });

      if (res.ok) {
        fetchJobs();
        fetchApplications();
        setForm({
          title: "",
          description: "",
          job_type: "remote",
          education: "form4",
          company_name: "",
          salary_min: "",
          salary_max: "",
          location: "",
        });
      }
    } catch {}
  };

  // ---------------- Delete Job ----------------
  const handleDelete = async (id) => {
    await fetch(`http://127.0.0.1:5000/jobs/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchJobs();
    fetchApplications();
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white px-6 py-10">
      <h2 className="text-4xl font-black mb-10 tracking-tight">
        Employer Dashboard
      </h2>

      {/* ADD JOB FORM */}
      <div className="bg-slate-800/60 backdrop-blur-md border border-white/10 rounded-3xl p-8 mb-14">
        <h3 className="text-xl font-bold mb-6 text-blue-400">
          Post a New Job
        </h3>

        <div className="grid md:grid-cols-2 gap-4">
          {[
            ["Job Title", "title"],
            ["Company Name", "company_name"],
            ["Min Salary", "salary_min"],
            ["Max Salary", "salary_max"],
          ].map(([label, key]) => (
            <input
              key={key}
              placeholder={label}
              className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form[key]}
              onChange={(e) => setForm({ ...form, [key]: e.target.value })}
            />
          ))}

          <textarea
            placeholder="Job Description"
            className="md:col-span-2 bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm h-28 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          <select
            className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm"
            value={form.job_type}
            onChange={(e) =>
              setForm({ ...form, job_type: e.target.value })
            }
          >
            <option value="remote">Remote</option>
            <option value="hybrid">Hybrid</option>
            <option value="physical">Physical</option>
          </select>

          <select
            className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm"
            value={form.education}
            onChange={(e) =>
              setForm({ ...form, education: e.target.value })
            }
          >
            <option value="form4">Form 4</option>
            <option value="certificate">Certificate</option>
            <option value="diploma">Diploma</option>
            <option value="degree">Degree</option>
            <option value="masters">Masters</option>
            <option value="phd">PhD</option>
          </select>

          {form.job_type !== "remote" && (
            <input
              placeholder="Location"
              className="md:col-span-2 bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm"
              value={form.location}
              onChange={(e) =>
                setForm({ ...form, location: e.target.value })
              }
            />
          )}
        </div>

        <button
          onClick={handleAddJob}
          className="mt-6 bg-blue-600 hover:bg-blue-500 px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-xs transition-all shadow-lg"
        >
          Add Job
        </button>
      </div>

      {/* JOBS LIST */}
      <h3 className="text-2xl font-bold mb-6">My Jobs</h3>

      {jobs.length === 0 ? (
        <p className="text-slate-400">No jobs posted yet.</p>
      ) : (
        <div className="grid gap-6">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-slate-800/60 border border-white/10 rounded-3xl p-6"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-xl font-bold">{job.title}</h4>
                  <p className="text-slate-400 text-sm mt-1">
                    {job.description}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(job.id)}
                  className="text-red-400 hover:text-red-300 text-sm font-bold"
                >
                  Delete
                </button>
              </div>

              {/* FIXED SALARY DISPLAY */}
              <p className="text-emerald-400 text-sm mt-3 font-semibold">
                {job.salary_min != null && job.salary_max != null
                  ? `Salary: ${job.salary_min.toLocaleString()} - ${job.salary_max.toLocaleString()}`
                  : "Salary: Not specified"}
              </p>

              {/* APPLICANTS */}
              {job.applications?.length > 0 && (
                <div className="mt-6 border-t border-slate-700 pt-4">
                  <h5 className="text-sm font-bold uppercase tracking-widest text-blue-400 mb-3">
                    Applicants
                  </h5>

                  <div className="space-y-4">
                    {job.applications.map((app) => (
                      <div
                        key={app.id}
                        className="bg-slate-900 border border-slate-700 rounded-xl p-4"
                      >
                        <p className="font-bold text-sm">
                          {app.applicant_name}{" "}
                          <span className="text-slate-400 font-normal">
                            ({app.education})
                          </span>
                        </p>

                        {/* Cover Letter */}
                        <div className="mt-3 bg-slate-800 border border-slate-700 rounded-lg p-4">
                          <p className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-2">
                            Cover Letter
                          </p>
                          <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">
                            {app.cover_letter ||
                              "No cover letter provided."}
                          </p>
                        </div>

                        {/* CV */}
                        <div className="mt-3 bg-slate-800 border border-slate-700 rounded-lg p-4 flex items-center justify-between">
                          <div>
                            <p className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-1">
                              Curriculum Vitae (CV)
                            </p>
                            <p className="text-slate-400 text-sm truncate max-w-[220px]">
                              {app.cv || "No CV uploaded"}
                            </p>
                          </div>

                          {app.cv && (
                            <a
                              href={app.cv}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition"
                            >
                              View
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmployerDashboard;
