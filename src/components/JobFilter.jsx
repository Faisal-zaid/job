
import React from "react";

const JobFilter = ({ setFilter, setSalary }) => {
  return (
    <div className="job-filter">
      <select onChange={(e) => setFilter(e.target.value)}>
        <option value="">All</option>
        <option value="remote">Remote</option>
        <option value="hybrid">Hybrid</option>
        <option value="physical">Physical</option>
      </select>

      <select onChange={(e) => setSalary(e.target.value)}>
        <option value="">All Salaries</option>
        <option value="0-50000">0 - 50,000</option>
        <option value="50000-100000">50,000 - 100,000</option>
        <option value="100000-500000">100,000 - 500,000</option>
        <option value="500000+">Above 500,000</option>
      </select>
    </div>
  );
};

export default JobFilter;
