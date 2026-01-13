import { useState } from "react"

function JobSeekerDashboard({ user }) {
  const jobs = JSON.parse(localStorage.getItem("jobs")) || []
  const companies = JSON.parse(localStorage.getItem("companies")) || []
  const [selectedJob, setSelectedJob] = useState(null)

  // 🔹 NEW: search, filter, sort state
  const [search, setSearch] = useState("")
  const [jobType, setJobType] = useState("")
  const [sort, setSort] = useState("latest")

  function getCompanyName(companyId) {
    const company = companies.find(c => c.id === companyId)
    return company ? company.name : "Unknown Company"
  }

  function applyJob(e) {
    e.preventDefault()

    const formData = new FormData(e.target)
    const applications = JSON.parse(localStorage.getItem("applications")) || []

    applications.push({
      jobId: selectedJob.id,
      jobTitle: selectedJob.title,
      companyName: getCompanyName(selectedJob.companyId),
      userId: user.id,
      name: formData.get("name"),
      email: formData.get("email"),
      coverLetter: formData.get("coverLetter"),
      cv: formData.get("cv").name,
      appliedAt: new Date().toISOString()
    })

    localStorage.setItem("applications", JSON.stringify(applications))
    alert("Application submitted")
    setSelectedJob(null)
  }


  // 🔹 NEW: filter + search + sort logic
  const filteredJobs = jobs
    .filter(job =>
      job.title.toLowerCase().includes(search.toLowerCase())
    )
    .filter(job =>
      jobType ? job.type === jobType : true
    )
    .sort((a, b) =>
      sort === "latest" ? b.id - a.id : a.id - b.id
    )

