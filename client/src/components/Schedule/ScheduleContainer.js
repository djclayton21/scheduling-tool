import React from 'react';
import JobSchedule from './JobSchedule.js';

const ScheduleContainer = ({ schedule, setSchedule }) => {
    const { jobs: scheduleJobs } = schedule;
    const jobSchedules = scheduleJobs.map(job => <JobSchedule job={job} schedule={schedule} setSchedule={setSchedule} key={`${schedule._id}-${job._id}`}/>)
    return ( 
        <div className="schedule-container">
            {jobSchedules}
        </div>
     );
}
 
export default ScheduleContainer;