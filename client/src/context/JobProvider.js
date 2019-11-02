import React, { useState } from 'react';

export const JobContext = React.createContext();

const JobProvider = (props) => {
    const initJobs = []
    const [ jobs, setJobs ] = useState(initJobs)
    
    const createJob = (newJob) => {
        console.log('create', newJob )
    }
    const updateJob = (updatedJob) => {
        console.log('update', updatedJob)
    }
    const deleteJob = (deletedJob) => {
        console.log('delete', deletedJob)
    }

    return ( 
        <JobContext.Provider value={{
            jobs,
            setJobs,
            createJob,
            updateJob,
            deleteJob
        }} >
            {props.children}
        </JobContext.Provider>
     );
}
 
export default JobProvider;