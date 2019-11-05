import React, { useState, useContext } from 'react';
import { SimpleScheduleContext } from '../../context/SimpleScheduleProvider.js';
import JobCheckBoxes from '../shared/Checkboxes/JobCheckBoxes';

const NewScheduleForm = ({ setDialogIsOpen }) => {
    const initSchedule = {
        scheduleName: "",
        scheduleStart: "",
        jobs: []
    }
    const [ newScheduleForm, setNewScheduleForm ] = useState(initSchedule);
    const { createSchedule } = useContext(SimpleScheduleContext);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setNewScheduleForm(prevScheduleForm => ({
            ...prevScheduleForm,
            [name]: value
        }))
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        createSchedule(newScheduleForm);
        setDialogIsOpen(false);
    }

    return ( 
        <form className="new-schedule-form" onSubmit={handleSubmit} >
            <h2>New Schedule</h2>
            <label>Start Date:
                <input 
                    type="date" 
                    name="scheduleStart" 
                    value={newScheduleForm.scheduleStart}
                    onChange={handleChange}
                />
            </label>
            <input 
                type="text" 
                name="scheduleName" 
                value={newScheduleForm.scheduleName}
                onChange={handleChange}
                placeholder="Title (optional)"
            />
            <JobCheckBoxes setFormState={setNewScheduleForm} />
            <button>Create</button>
        </form>
     );
}
 
export default NewScheduleForm;