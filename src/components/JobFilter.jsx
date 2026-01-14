function JobFilter({ setJobs }) {
  function filterRemote() {
    fetch("http://127.0.0.1:5000/jobs?job_type=remote")
      .then(res => res.json())
      .then(data => setJobs(data))
  }

  return (
    <button onClick={filterRemote}>Remote Jobs</button>
  )
}

export default JobFilter