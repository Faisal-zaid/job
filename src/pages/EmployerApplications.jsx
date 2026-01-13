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
