import React from 'react';
import moment from 'moment';
import DaySchedule from './DaySchedule'

const JobSchedule = ({ schedule, job, setSchedule }) => {
    const { scheduleStart } = schedule;
    const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
    const jobScheduleDays = [];

    for (let i = 0; i < 7; i++){
        jobScheduleDays.push(moment(scheduleStart).add(i, 'd'))
    }

    const mappedDays = jobScheduleDays.map(jobScheduleDay => {
        const jobDayOfWeek = daysOfWeek[jobScheduleDay.day()];
        const dayShifts = schedule[jobDayOfWeek];
        const jobDayShifts = dayShifts.filter(dayShift => dayShift.job === job._id);
        return <DaySchedule dayOfWeek={jobDayOfWeek} momentDate={jobScheduleDay} shifts={jobDayShifts} setSchedule={setSchedule} job={job} key={`${job._id}-${jobScheduleDay.toDate()}`} />
    })
    
    return ( 
        <div className="schedule-job" >
            <h2>{job.jobName}</h2>
            <div className="days-container">
                {mappedDays}
            </div>
        </div>
     );
}
 
export default JobSchedule;