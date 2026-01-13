function EmployerApplications() {
  const user = JSON.parse(localStorage.getItem("user"))

  const jobs = JSON.parse(localStorage.getItem("jobs")) || []
  const applications = JSON.parse(localStorage.getItem("applications")) || []

  // Jobs posted by this employer
  const myJobs = jobs.filter(job => job.employerEmail === user.email)
  const myJobIds = myJobs.map(job => job.id)

  // Applications for those jobs
  const myApplications = applications.filter(app =>
    myJobIds.includes(app.jobId)
  )

  return (
    <div>
      <h2>Applications for Your Jobs</h2>

      {myApplications.length === 0 && <p>No applications yet.</p>}

      {myApplications.map((app, index) => (
        <div
          key={index}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            margin: "10px"
          }}
        >
          <h4>{app.jobTitle}</h4>

          <p><strong>Name:</strong> {app.name}</p>
          <p><strong>Email:</strong> {app.email}</p>

          <p><strong>Cover Letter:</strong></p>
          <p>{app.coverLetter}</p>

          <p><strong>CV:</strong> {app.cv}</p>

          <p>
            <small>
              Applied on: {new Date(app.appliedAt).toLocaleString()}
            </small>
          </p>
        </div>
      ))}
    </div>
  )
}

export default EmployerApplications
