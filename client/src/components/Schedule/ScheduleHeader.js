import React from 'react';
import moment from 'moment'

const ScheduleTitle = ({schedule}) => {
    const { scheduleStart, scheduleEnd, scheduleName } = schedule;
    const scheduleRange = `${moment(scheduleStart).format('MM/DD/YY')} - ${moment(scheduleEnd).format('MM/DD/YY')}`;
    return ( 
        <div className="tile" >
            <div className="schedule-page-header">
                <span>{scheduleRange}</span>
                <span>{scheduleName}</span>
            </div>
        </div> 
    );
}
 
export default ScheduleTitle;