import React, { useState } from 'react';
import userAxios from '../functions/userAxios.js'

export const JobContext = React.createContext();

const JobProvider = ({ children }) => {
    const initJobs = []
    const [ jobs, setJobs ] = useState(initJobs)
    
    const createJob = (newJob) => {
        userAxios.post('/api/jobs', newJob)
            .catch(err => console.error(err.response.data.errMsg))
            .then(res => {
                setJobs(prevJobs => ([...prevJobs, res.data]))
            })
    }
    const updateJob = (updatedJob) => {
        userAxios.put(`/api/jobs/${updatedJob._id}`, updatedJob)
            .catch(err => console.error(err.response.data.errMsg))
            .then(res => {
                setJobs(prevJobs => prevJobs.map(job => (
                    res.data._id === job._id ? res.data : job
                )))
            })
    }
    const deleteJob = (deletedJob) => {
        userAxios.delete(`/api/jobs/${deletedJob._id}`)
            .catch(err => console.error(err.response.data.errMsg))
            .then(res => {
                setJobs(prevJobs => prevJobs.filter(job => (
                    res.data._id !== job._id
                )))
            })
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