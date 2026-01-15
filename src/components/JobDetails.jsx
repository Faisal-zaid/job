import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function JobDetails() {
  const { id } = useParams(); // get job id from route
  const [job, setJob] = useState(null);
  const [user, setUser] = useState(null);
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    const jobs = JSON.parse(localStorage.getItem("jobs")) || [];
    const jobFound = jobs.find((j) => j.id === parseInt(id));
    setJob(jobFound);

    const currentUser = JSON.parse(localStorage.getItem("user"));
    setUser(currentUser);
  });
}
