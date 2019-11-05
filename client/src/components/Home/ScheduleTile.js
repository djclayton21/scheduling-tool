import React from 'react';
import moment from 'moment';

const ScheduleTile = ({ schedule, handleUpdateSchedule, handleDeleteSchedule}) => {
    const { scheduleName, scheduleStart, scheduleEnd } = schedule;
    const scheduleRange = `${moment(scheduleStart).format('MM/DD/YY')}-${moment(scheduleEnd).format('MM/DD/YY')}`;
    return ( 
        <li className="schedule-tile">
            <span className="schedule-dates">{scheduleRange}</span>
            <span className="schedule-name">{scheduleName}</span>
            <button onClick={() => handleUpdateSchedule(schedule)} >Edit</button>
            <button onClick={() => handleDeleteSchedule(schedule)} >Delete</button>
        </li>
     );
}
 
export default ScheduleTile;