import React, { useState } from 'react';

export const JobContext = React.createContext();

const JobProvider = (props) => {
    const initJobs = []
    const [ jobs, setJobs ] = useState(initJobs)
    
    const createJob = (newJob) => {
        
    }
    const updateJob = (updatedJob) => {
        
    }
    const deleteJob = (deletedJob) => {
        
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