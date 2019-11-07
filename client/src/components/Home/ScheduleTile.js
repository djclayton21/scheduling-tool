import React from 'react';
import moment from 'moment';

const ScheduleTile = ({ schedule, handleUpdateSchedule, handleDeleteSchedule}) => {
    const { scheduleName, scheduleStart, scheduleEnd } = schedule;
    const scheduleRange = `${moment(scheduleStart).format('MM/DD/YY')} - ${moment(scheduleEnd).format('MM/DD/YY')}`;
    return ( 
        <li className="schedule-tile">
            <div className="schedule-tile-info">
                <span className="schedule-dates">{scheduleRange}</span>
                <span className="schedule-name">{scheduleName}</span>
            </div>
            <button className="edit-button" onClick={() => handleUpdateSchedule(schedule)} ><i class="fas fa-cog"></i></button>
            <button className="delete-button" onClick={() => handleDeleteSchedule(schedule)} ><i class="fas fa-trash"></i></button>
        </li>
     );
}
 
export default ScheduleTile;