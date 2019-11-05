import React, { useState } from 'react';
import userAxios from '../functions/userAxios.js';

export const SimpleScheduleContext = React.createContext()

const SimpleScheduleProvider = ({ children }) => {
    const initSchedules = [];
    const [ simpleSchedules, setSimpleSchedules ] = useState(initSchedules);

    const createSchedule = (newSchedule) => {
        userAxios.post('/api/schedules', newSchedule)
            .then(res => {
                setSimpleSchedules(prevSchedules => {
                    const newSchedules = [...prevSchedules, res.data];
                    newSchedules.sort((a, b) => new Date(a.scheduleStart) - new Date(b.scheduleStart))
                    return newSchedules;
                })
            })
            .catch(err => console.error(err.response.data.errMsg))
    }
    
    const deleteSchedule = (deletedSchedule) => {
        userAxios.delete(`/api/schedules/${deletedSchedule._id}`)
            .then(res => {
                setSimpleSchedules(prevSchedules => prevSchedules.filter(schedule => (
                    res.data._id !== schedule._id
                )))
            })
            .catch(err => console.error(err.response.data.errMsg))
    }

    const updateSchedule = (updateSchedule) => {
        console.log('update', updateSchedule)
    }

    return ( 
        <SimpleScheduleContext.Provider value = {{
            simpleSchedules,
            setSimpleSchedules,
            createSchedule,
            deleteSchedule,
            updateSchedule
        }} >
            {children}
        </SimpleScheduleContext.Provider>
     );
}
 
export default SimpleScheduleProvider;