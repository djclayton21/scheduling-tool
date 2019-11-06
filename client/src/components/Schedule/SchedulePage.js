import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import userAxios from '../../functions/userAxios.js';
import './style.css';

import ScheduleTitle from './ScheduleHeader.js';
import ScheduleContainer from './ScheduleContainer.js';



const SchedulePage = () => {
    const [ schedule, setSchedule ] = useState({});
    const [ isLoaded, setIsLoaded ] = useState(false);
    const turnOnSave = useRef(false);

    const { scheduleId } = useParams();
    useEffect(() => {
        userAxios.get(`/api/schedules/populated/${scheduleId}`)
            .then(res => {
                setSchedule(res.data);
                setIsLoaded(true);
                turnOnSave.current = true;
            })
            .catch(err => console.error(err.response.data.errMsg))
        
    }, [scheduleId, setIsLoaded], 
    () => {
        setSchedule({})
        setIsLoaded(false)
    })

    useEffect(() => {
        if (turnOnSave.current) {
            turnOnSave.current = false;
            return;
        }
        const saveSchedule = () => {
            userAxios.put(`/api/schedules/${scheduleId}`, schedule)
                .then(res => console.log('saved!', res.data))
                .catch(err => console.alert(err.response.data.errMsg))
        };
        if(isLoaded){
            saveSchedule()
        }
    },[
        isLoaded,
        schedule,
        scheduleId
    ])

   

    return ( 
        <main className="schedule-page">
            {isLoaded && <ScheduleTitle schedule={schedule} />}
            {isLoaded && <ScheduleContainer schedule={schedule} setSchedule={setSchedule} />}
        </main>
     );
}
 
export default SchedulePage;