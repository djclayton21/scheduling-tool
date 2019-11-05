import React from 'react';
import moment from 'moment'

const ScheduleTitle = ({schedule}) => {
    const { scheduleStart, scheduleEnd, scheduleName } = schedule;
    const scheduleRange = `${moment(scheduleStart).format('MM/DD/YY')} - ${moment(scheduleEnd).format('MM/DD/YY')}`;
    return ( 
        <header className="schedule-title" >
            <span>{scheduleRange}</span>
            <span>{scheduleName}</span>
        </header> 
    );
}
 
export default ScheduleTitle;