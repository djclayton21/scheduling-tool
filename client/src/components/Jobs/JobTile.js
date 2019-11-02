import React from 'react';

const JobTile = ({ job, handleUpdateJob, handleDeleteJob }) => {
    const { jobName, hourlyPay, jobLocation} = job
    
    return ( 
        <li className="job-tile">
            <span>{jobName}</span>
            <span>{jobLocation}</span>
            <span>{hourlyPay > 0 && `$${hourlyPay}/h`}</span>
            <button onClick={() => handleUpdateJob(job)} >edit</button>
            <button onClick={() => handleDeleteJob(job)} >delete</button>
        </li>
     );
}
 
export default JobTile;