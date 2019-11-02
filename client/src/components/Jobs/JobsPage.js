import React, {useContext, useState} from 'react';
import './style.css'
import JobTile from './JobTile';
import { JobContext } from '../../context/JobProvider'
import ModalFull from '../shared/ModalFull';

const JobsPage = () => {
    const [ dialogIsOpen, setDialogIsOpen ] = useState(false)
    const { jobs } = useContext(JobContext);
    

    const mappedJobs = jobs.map(job => <JobTile job={job} key={job._id} />)

    return ( 
        <main className="jobs-page">
            <button className="jobs-add-button" onClick={() => setDialogIsOpen(!dialogIsOpen)} >Add Job</button>
            <ul className="jobs-list">
                {mappedJobs}
            </ul>
            {dialogIsOpen && <ModalFull setDialogIsOpen={setDialogIsOpen} >
                <p>longer test</p>
            </ModalFull>}
        </main>
     );
}
 
export default JobsPage;