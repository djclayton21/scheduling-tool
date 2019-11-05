import React, { useState } from 'react';

const ShiftForm = ({formType, shiftToEdit, jobId, scheduleId ,closeFunction}) => {
   
    const initShiftForm
    const initShiftTime

    const [ shiftForm, setShiftForm ] = useState(initShiftForm);
    const [ shiftTime, setShiftTime ] = useState(initShiftTime);

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
    }

    const [ shiftForm, setShiftForm ] = useState(initShift)
    return ( 
        <form className="shift-form" onSubmit={handleSubmit} >
            <label>Start Time:<input type="datetime" name="startTime" value={shiftTime.startTime} onChange={handleTimeChange} /></label>
            <label>End Time:<input type="datetime" name="endTime" value={shiftTime.endTime} onChange={handleTimeChange} /></label>
            <input type="text" name="shiftName" value={shiftForm.shiftName} onChange={handleFormChange} placeholder="Title" />
            <input type="text" name="shiftLocation" value={shiftForm.shiftLocation} onChange={handleFormChange} placeholder="Notes" />
        </form>
     );
}
 
export default ShiftForm;