import React, { useState, useContext } from 'react';
import { EmployeeContext } from '../../context/EmployeeProvider';
import JobCheckBoxes from '../shared/Checkboxes/JobCheckBoxes';

const EmployeeForm = (props) => {
    const { formType, employeeToEdit, setDialogIsOpen } = props;
    const { [formType]: submitFunction } = useContext(EmployeeContext);

    const initEmployee = employeeToEdit || {
        name: "",
        jobs: [],
        scheduleBlocks:[],
        offRequests: [],
        employeeNotes: ""
    }
    const [ employeeForm, setEmployeeForm ] = useState(initEmployee);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setEmployeeForm(prevEmployeeForm => ({...prevEmployeeForm, [name]: value}))
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        submitFunction(employeeForm);
        setEmployeeForm({
            name: "",
            jobs: [],
            scheduleBlocks:[],
            offRequests: [],
            employeeNotes: ""
        });
        setDialogIsOpen(false);
    }
    const formHeadline = formType === 'createEmployee' ? 'Add Employee': `Edit '${employeeToEdit.name}'`;

    return ( 
        <form className="employee-form" onSubmit={handleSubmit} >
            <h2>{formHeadline}</h2>
            <input 
                type="text" 
                name="name" 
                value={employeeForm.name} 
                onChange={handleChange} 
                placeholder="Name" 
            />
            <JobCheckBoxes initJobs={employeeForm.jobs} setFormState={setEmployeeForm} />
            <textarea 
                type="text" 
                name="employeeNotes" 
                value={employeeForm.employeeNotes} 
                onChange={handleChange} 
                cols="30"
                rows="3"
                style={{resize: 'none'}}
                placeholder="Notes"
            />
            <button type="submit">Save</button>
        </form> );
}
 
export default EmployeeForm;