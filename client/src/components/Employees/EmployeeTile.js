import React from 'react';

const EmployeeTile = ({ employee, handleUpdateEmployee, handleDeleteEmployee}) => {
    const { name, jobs } = employee;
    let jobsDisplay = `${jobs[0].jobName}`
    for (let i = 1; i < jobs.length; i++){
        jobsDisplay += `, ${jobs[i].jobName}`
    }
    return ( 
        <li className="employee-tile tile">
            <div className="employee-tile-info">
                <span>{name}</span>
                <span className="employee-job-display" >{jobsDisplay}</span>
            </div>
            <button className="edit-button" onClick={() => handleUpdateEmployee(employee)} ><i className="fas fa-cog"></i></button>
            <button className="delete-button" onClick={() => handleDeleteEmployee(employee)} ><i className="fas fa-trash"></i></button>
        </li>
     );
}
 
export default EmployeeTile;