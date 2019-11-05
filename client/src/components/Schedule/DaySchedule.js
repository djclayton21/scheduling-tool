import React, { useState } from 'react';
import ModalFull from '../shared/ModalFull.js'
import ShiftTile from './ShiftTile';


const DaySchedule = ({dayOfWeek, momentDate, shifts, job, setSchedule}) => {
    const [ addShiftDialog, setAddShiftDialog ] = useState(false);
    const formattedDoW = dayOfWeek[0].toUpperCase() + dayOfWeek.substring(1);
    const formattedDate = momentDate.format('MM/DD')
    const mappedShifts = shifts.map(shift => {
        return <ShiftTile setSchedule={setSchedule} shift={shift} key={shift._id} />
    })

    return ( 
        <div className="job-day" >
            <div>
                <span>{formattedDoW}</span>
                <span>{formattedDate}</span>
                <button>Add Shift</button>
            </div>
            <div className="day-shifts" >
                {mappedShifts}
            </div>
            {addShiftDialog && <ModalFull closeFunction={() => setAddShiftDialog(false)} >
                
            </ModalFull>}
        </div>

    );
}
 
export default DaySchedule;