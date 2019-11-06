import React, { useState } from 'react';
import moment from 'moment';
import userAxios from '../../functions/userAxios.js'

const ShiftForm = ({shiftToUpdate, dayOfWeek, momentDate, jobId, scheduleId, setSchedule, closeFunction}) => {
    let timeToUpdate = null;
    if (shiftToUpdate){
        const { shiftStart, shiftEnd} = shiftToUpdate;
        const startMinute = moment(shiftStart).format('mm');
        const startHour = moment(shiftStart).format('HH');
        const endMinute = moment(shiftEnd).format('mm');
        const endHour = moment(shiftEnd).format('hh');
        timeToUpdate = {
            startTime: startHour + ':' + startMinute,
            endTime: endHour + ':' + endMinute
        };
    }

    const initShiftForm = shiftToUpdate || {
        shiftName: "",
        shiftLocation: "",
        shiftNotes: "",
        minEmployees: 1,
        maxEmployees: 1
    }
    const initShiftTime = timeToUpdate || {
        startTime: "",
        endTime: ""
    }

    const [ shiftForm, setShiftForm ] = useState(initShiftForm);
    const [ shiftTime, setShiftTime ] = useState(initShiftTime);

    const addShift = (shift) => {
        userAxios.post('/api/shifts', shift)
            .then(res => {
                setSchedule(prevSchedule => {
                    const dayShifts = [...prevSchedule[dayOfWeek]];
                    dayShifts.push(res.data)
                    const newShifts = dayShifts.sort((a, b) => new Date(a.shiftStart) - new Date(b.shiftEnd))
                    return {...prevSchedule, [dayOfWeek]: newShifts}
                })
            })
            .catch(err => console.error(err.response.data.errMsg))
    };
    const updateShift = (shift) => {
        userAxios.put(`/api/shifts/${shift._id}`, shift)
            .then(res => {
                setSchedule(prevSchedule => {
                    const dayShifts = [...prevSchedule[dayOfWeek]];
                    const newShifts = dayShifts.map(shift => shift._id === res.data._id ? res.data : shift);
                    return {...prevSchedule, [dayOfWeek]: newShifts}
                })
            })
            .catch(err => console.error(err.response.data.errMsg))
    }
    const handleFormChange = (event) => {
        const { name, value } = event.target;
        setShiftForm(prevShiftForm => ({
            ...prevShiftForm,
            [name]: value
        }))
    }
    
    const handleTimeChange = (event) => {
        const { name, value } = event.target;
        setShiftTime(prevShiftTime => ({
            ...prevShiftTime,
            [name]: value
        }))
    }
    const handleSubmit = (event) => {
        event.preventDefault();

        const startHour = shiftTime.startTime.substring(0, 2);
        const startMinute = shiftTime.startTime.substring(3);
        const endHour = shiftTime.endTime.substring(0, 2);
        const endMinute = shiftTime.endTime.substring(3);
        const newShiftStart = moment(momentDate).add(startHour, 'hour').add(startMinute, 'minute').toDate()
        const newShiftEnd = moment(momentDate).add(endHour, 'hour').add(endMinute, 'minute').toDate()
        const shift = {
            shiftName: shiftForm.shiftName,
            shiftLocation: shiftForm.shiftLocation,
            shiftNotes: shiftForm.shiftNotes,
            minEmployees: shiftForm.minEmployees,
            maxEmployees: shiftForm.maxEmployees,
            shiftStart: newShiftStart,
            shiftEnd: newShiftEnd,
            jobId,
            scheduleId,
        };
        if(shiftToUpdate) {
            shift._id = shiftToUpdate._id
        }
        shiftToUpdate ? updateShift(shift) : addShift(shift);
        setShiftForm({
            shiftName: "",
            shiftLocation: "",
            shiftNotes: "",
            minEmployees: 1,
            maxEmployees: 1
        });
        setShiftTime({
            startTime: "",
            endTime: ""
        });
        closeFunction();
    }

    return ( 
        <form className="shift-form" onSubmit={handleSubmit} >
            {shiftToUpdate ? <h2>Edit Shift</h2>: <h2>Add Shift</h2> }
            <label>Start Time:<input 
                type="time" 
                name="startTime" 
                value={shiftTime.startTime}
                onChange={handleTimeChange}
                step="900"
                required 
            /></label>
            <label>End Time:<input 
                type="time" 
                name="endTime" 
                value={shiftTime.endTime} 
                onChange={handleTimeChange}
                step="900" 
                required
            /></label>
            <input 
                type="text" 
                name="shiftName" 
                value={shiftForm.shiftName} 
                onChange={handleFormChange} 
                placeholder="Title" 
            />
            <input 
                type="text" 
                name="shiftLocation" 
                value={shiftForm.shiftLocation} 
                onChange={handleFormChange} 
                placeholder="Location" 
            />
            <textarea 
                type="text" 
                name="shiftNotes" 
                value={shiftForm.shiftNotes} 
                onChange={handleFormChange} 
                cols="30"
                rows="3"
                style={{resize: 'none'}}
                placeholder="Notes"
            />
            <button type="submit" >Save</button>
        </form>
     );
}
 
export default ShiftForm;