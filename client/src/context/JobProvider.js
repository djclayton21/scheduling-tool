import React, { useState } from 'react';
import userAxios from '../functions/userAxios.js'

export const JobContext = React.createContext();

const JobProvider = ({ children }) => {
    const initJobs = []
    const [ jobs, setJobs ] = useState(initJobs)
    
    const createJob = (newJob) => {
        userAxios.post('/api/jobs', newJob)
            .then(res => {
                setJobs(prevJobs => ([...prevJobs, res.data]))
            })
            .catch(err => console.error(err.response.data.errMsg))
    }
    const updateJob = (updatedJob) => {
        userAxios.put(`/api/jobs/${updatedJob._id}`, updatedJob)
            .then(res => {
                setJobs(prevJobs => prevJobs.map(job => (
                    res.data._id === job._id ? res.data : job
                )))
            })
            .catch(err => console.error(err.response.data.errMsg))
    }
    const deleteJob = (deletedJob) => {
        userAxios.delete(`/api/jobs/${deletedJob._id}`)
            .then(res => {
                setJobs(prevJobs => prevJobs.filter(job => (
                    res.data._id !== job._id
                )))
            })
            .catch(err => console.error(err.response.data.errMsg))
    }

    return ( 
        <JobContext.Provider value={{
            jobs,
            setJobs,
            createJob,
            updateJob,
            deleteJob
        }} >
            {children}
        </JobContext.Provider>
     );
}
 
export default JobProvider;