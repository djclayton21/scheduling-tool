import React, { useState, useContext } from 'react';
import { JobContext } from '../../context/JobProvider';

const JobForm = (props) => {
    const { formType, jobToEdit, setDialogIsOpen } = props;
    const { [formType]: submitFunction } = useContext(JobContext)
    const initJob = jobToEdit || {
        jobName: "",
        hourlyPay: 0,
        jobNotes: "",
        jobLocation: ""
    };
    const [ jobForm, setJobForm ] = useState(initJob);
    
    const handleChange = (event) => {
        const { name, value } = event.target;
        setJobForm(prevJobForm => ({...prevJobForm, [name]: value}))
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        await submitFunction(jobForm);
        setDialogIsOpen(false);
    }

    const formHeadline = formType === 'createJob' ? 'Add Job' : `Edit '${jobToEdit.jobName}'`

    return ( 
        <form className="job-form" onSubmit={handleSubmit} >
            <h2>{formHeadline}</h2>
            <input type="text" name="jobName" value={jobForm.jobName} onChange={handleChange} />
            <input type="number" name="hourlyPay" value={jobForm.hourlyPay} onChange={handleChange} />
            <input type="text" name="jobLocation" value={jobForm.jobLocation} onChange={handleChange} />
            <textarea name="jobNotes" value={jobForm.jobNotes} onChange={handleChange} cols="30" rows="10"></textarea>
            <button type="submit">Save</button>
        </form>
     );
}
 
export default JobForm;