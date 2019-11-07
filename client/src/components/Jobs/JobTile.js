import React from 'react';

const JobTile = ({ job, handleUpdateJob, handleDeleteJob }) => {
    const { jobName, hourlyPay} = job
    
    return ( 
        <li className="job-tile tile">
            <div className="job-tile-info">
                <span>{jobName}</span>
                <span>{hourlyPay > 0 && `$${hourlyPay}/h`}</span>
            </div>
            <button className="edit-button" onClick={() => handleUpdateJob(job)} ><i className="fas fa-cog"></i></button>
            <button className="delete-button" onClick={() => handleDeleteJob(job)} ><i className="fas fa-trash"></i></button>
        </li>
     );
}
 
export default JobTile;