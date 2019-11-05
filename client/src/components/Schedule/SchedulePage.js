import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import userAxios from '../../functions/userAxios.js';
import './style.css';

import ScheduleTitle from './ScheduleHeader.js';
import ScheduleContainer from './ScheduleContainer.js';

const SchedulePage = () => {
    const [ schedule, setSchedule ] = useState({})
    const [ isLoaded, setIsLoaded ] = useState(false)
    const { scheduleId } = useParams();

    useEffect(() => {
        userAxios.get(`/api/schedules/populated/${scheduleId}`)
            .then(res => {
                setSchedule(res.data)
                setIsLoaded(true)
            })
            .catch(err => console.error(err.response.data.errMsg))
    }, [scheduleId, setIsLoaded], 
    () => {
        setSchedule({})
        setIsLoaded(false)
    })

    return ( 
        <main className="schedule-page">
            {isLoaded && <ScheduleTitle schedule={schedule} />}
            {isLoaded && <ScheduleContainer schedule={schedule} setSchedule={setSchedule} />}
        </main>
     );
}
 
export default SchedulePage;