import React, { useState } from 'react';
import userAxios from '../../functions/userAxios.js'
import ModalFull from '../shared/ModalFull.js'
import ShiftTile from './ShiftTile';
import ShiftForm from './ShiftForm.js';


const DaySchedule = ({dayOfWeek, momentDate, shifts, job, scheduleId, setSchedule}) => {
    const [ shiftFormDialog, setShiftFormDialog ] = useState(false);
    const [ shiftToUpdate, setShiftToUpdate ] = useState(null);

    const closeDialog = () => {
        setShiftToUpdate(null);
        setShiftFormDialog(false);
    }
    const handleUpdateShift = (shift) => {
        setShiftToUpdate(shift);
        setShiftFormDialog(true);
    }
    const handleAddShift = () => {
        setShiftToUpdate(null);
        setShiftFormDialog(true);
    }
    const handleDeleteShift = (shift) => {
        const confirmDelete = window.confirm(`Are you sure you want to delete that shift?`)
        if (confirmDelete) {
            userAxios.delete(`/api/shifts/${shift._id}`)
                .then(res => {
                    setSchedule(prevSchedule => {
                        const dayShifts = [...prevSchedule[dayOfWeek]];
                        const newShifts = dayShifts.filter(shift => shift._id !== res.data._id)
                        return {...prevSchedule, [dayOfWeek]: newShifts}
                    })
                })
                .catch(err => console.error(err.response.data.errMsg))
        }
    }

    const formattedDoW = dayOfWeek[0].toUpperCase() + dayOfWeek.substring(1);
    const formattedDate = momentDate.format('MM/DD')
    const mappedShifts = shifts.map(shift => {
        return <ShiftTile 
            handleDeleteShift={handleDeleteShift} 
            handleUpdateShift={handleUpdateShift} 
            setSchedule={setSchedule} 
            shift={shift} 
            key={shift._id} 
        />
    })

    return ( 
        <div className="job-day" >
            <div>
                <span>{formattedDoW}</span>
                <span>{formattedDate}</span>
                <button onClick={handleAddShift}>Add Shift</button>
            </div>
            <div className="day-shifts" >
                {mappedShifts}
            </div>
            {shiftFormDialog && <ModalFull closeFunction={closeDialog} >
                <ShiftForm 
                    shiftToUpdate={shiftToUpdate}
                    jobId={job._id} 
                    scheduleId={scheduleId}
                    momentDate={momentDate}
                    setSchedule={setSchedule}
                    dayOfWeek={dayOfWeek}
                    closeFunction={closeDialog} 
                />
            </ModalFull>}
        </div>

    );
}
 
export default DaySchedule;