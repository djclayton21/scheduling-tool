import React, {useContext, useState} from 'react';
import './style.css'
import JobTile from './JobTile';
import { JobContext } from '../../context/JobProvider'
import ModalFull from '../shared/ModalFull';
import JobForm from './JobForm';

const JobsPage = () => {
    const [ dialogIsOpen, setDialogIsOpen ] = useState(false)
    const [ formType, setFormType ] = useState('');
    const [ jobToEdit, setJobToEdit ] = useState(null)
    const { jobs, deleteJob } = useContext(JobContext);

    const handleAddJob = () => {
        setFormType('createJob');
        setJobToEdit(null);
        setDialogIsOpen(true);
    }
    const closeDialog = () => {
        setDialogIsOpen(false)
        setFormType('')
    }
    const handleUpdateJob = (job) => {
        setFormType('updateJob');
        setJobToEdit(job);
        setDialogIsOpen(true);
    }

    const handleDeleteJob = (job) => {
        const confirmDelete = window.confirm(`Are you sure you want to delete '${job.jobName}'?`)
        confirmDelete && deleteJob(job);
    }

    const mappedJobs = jobs.map(job => <JobTile 
        job={job} 
        handleUpdateJob={handleUpdateJob} 
        handleDeleteJob={handleDeleteJob} 
        key={job._id} 
    />)

    return ( 
        <main className="jobs-page">
            <button className="jobs-add-button" onClick={handleAddJob} >Add Job</button>
            <ul className="jobs-list">
                {mappedJobs}
            </ul>
            {dialogIsOpen && <ModalFull closeFunction={closeDialog} >
                <JobForm formType={formType} jobToEdit={jobToEdit} setDialogIsOpen={setDialogIsOpen} />
            </ModalFull>}
        </main>
     );
}
 
export default JobsPage;