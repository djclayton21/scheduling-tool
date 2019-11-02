import React from 'react';

const JobTile = ({job}) => {
    const { jobName, hourlyPay, jobLocation} = job
    return ( 
        <li className="job-tile">
            <span>{jobName}</span>
            <span>{jobLocation}</span>
            <span>{hourlyPay > 0 && `$${hourlyPay}/h`}</span>
            <button>edit</button>
            <button>delete</button>
        </li>
     );
}
 
export default JobTile;