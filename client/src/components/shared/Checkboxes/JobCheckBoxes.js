import React, { useState, useContext } from 'react';
import { JobContext } from '../../../context/JobProvider.js';
import CheckBox from './CheckBox.js';

const JobCheckBoxes = ({ initJobs, setFormState }) => {
    const { jobs } = useContext(JobContext);
    const initCheckedJobs = jobs.map(job => (
        [job.jobName, initJobs.some(initJob => job._id === initJob._id)]
    ))
    const [ checkedJobs, setCheckedJobs ] = useState(new Map(initCheckedJobs));

    const handleChange = (event) => {
        const { name, checked: isChecked } = event.target
        setCheckedJobs(prevCheckedJobs => {
            prevCheckedJobs.set(name, isChecked)
            const newJobs = Array.from(prevCheckedJobs, ([name, isChecked]) => {
                if(isChecked) {
                    return jobs.find(job => job.jobName === name)
                } else {
                    return null
                }
            })
            setFormState(prevFormState => ({
                ...prevFormState,
                jobs: newJobs.filter(job => job)
            }))
            return prevCheckedJobs
        })
    };

    const checkboxes = jobs.map(job => <CheckBox 
        key={`checkbox-${job._id}`} 
        name={job.jobName} 
        isChecked={checkedJobs.get(job.jobName)}
        handleChange={handleChange}
        />
    )
    return ( 
        <div className="job-checkboxes">
            {checkboxes}
        </div>
    );
}
 
export default JobCheckBoxes;