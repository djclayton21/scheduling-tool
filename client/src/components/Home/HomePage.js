import React, { useState, useContext } from 'react';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import './style.css';
import { SimpleScheduleContext } from '../../context/SimpleScheduleProvider.js';
import ModalFull from '../shared/ModalFull';
import ScheduleTile from './ScheduleTile';
import NewScheduleForm from './NewScheduleForm.js';

const HomePage = () => {
    const [ dialogIsOpen, setDialogIsOpen ] = useState(false);
    const { simpleSchedules, deleteSchedule } = useContext(SimpleScheduleContext)
    const history = useHistory();

    const handleCreateSchedule = () => {
        setDialogIsOpen(true)
    };
    const handleUpdateSchedule = (schedule) => {
        history.push(`/schedule/${schedule._id}`)
    };
    const handleDeleteSchedule = (schedule) => {
        const confirmDelete = window.confirm(`Are you sure you want to delete the schedule beginning on ${moment(schedule.scheduleStart).format('MM/DD/YY')}?`);
        confirmDelete && deleteSchedule(schedule);
    };

    const mappedSimpleSchedules = simpleSchedules.map(simpleSchedule => (
        <ScheduleTile 
            schedule={simpleSchedule}
            handleUpdateSchedule={handleUpdateSchedule}
            handleDeleteSchedule={handleDeleteSchedule}
            key={simpleSchedule._id}
        />
    ))

    return ( 
        <main className="home-page">
            <button className="home-new-schedule-button" onClick={handleCreateSchedule} >New Schedule</button>
            <section className="schedule-list">
                <h2>Schedules</h2>
                <ul >
                    {mappedSimpleSchedules}
                </ul>
            </section>
            { dialogIsOpen && <ModalFull closeFunction={() => setDialogIsOpen(false)} >
                <NewScheduleForm setDialogIsOpen={setDialogIsOpen} />
            </ModalFull> }
        </main>
     );
}
 
export default HomePage;