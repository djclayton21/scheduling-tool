import React, { useState, useContext, useEffect, useRef } from 'react';
import moment from 'moment';
import userAxios from '../../functions/userAxios.js'
import { EmployeeContext } from '../../context/EmployeeProvider.js';
import ShiftEmployeeSelect from './ShiftEmployeeSelect.js'

const ShiftTile = ({ shift, dayOfWeek, setSchedule, handleUpdateShift, handleDeleteShift }) => {
    const { shiftStart, maxEmployees, employees: shiftEmployees } = shift;
    
    const initShiftEmployees = shiftEmployees || [];
    const [ shiftEmployeesForm, setShiftEmployeesForm ] = useState(initShiftEmployees);
    const isFirstLoad = useRef(true);
    const { employees } = useContext(EmployeeContext);

    useEffect(() => {
        if (isFirstLoad.current) {
            isFirstLoad.current = false;
            return;
        }
        userAxios.put(`/api/shifts/${shift._id}`, {employees: shiftEmployeesForm})
            .then(res => {
                setSchedule(prevSchedule => {
                    const dayShifts = [...prevSchedule[dayOfWeek]];
                    const newShifts = dayShifts.map(shift => shift._id === res.data._id ? res.data : shift);
                    return {...prevSchedule, [dayOfWeek]: newShifts}
                })
            })
            .catch(err => console.error(err.response.data.errMsg))
    },[setSchedule, dayOfWeek, shift._id, shiftEmployeesForm])

    //maintain employee slots
    useEffect(() => {
        const newEmployees = [...shiftEmployees]
        if (newEmployees.length > maxEmployees) {
            newEmployees.splice(0, maxEmployees)
        }
        for (let i = 0; i < maxEmployees; i++){
            if (!newEmployees[i]){
                newEmployees[i] = ""
            }
        }
        setShiftEmployeesForm(newEmployees);
    }, [maxEmployees, setShiftEmployeesForm])

    const availableEmployees = employees.filter(employee => (
        employee.jobs.some(job => job._id === shift.jobId)
    ))

    const employeeSelects = shiftEmployeesForm.map((employeeId, i) => (
        <ShiftEmployeeSelect 
            shift={shift}
            employeeId={employeeId}
            availableEmployees={availableEmployees} 
            shiftEmployeesForm={shiftEmployeesForm} 
            setShiftEmployeesForm={setShiftEmployeesForm} 
            formIndex={i} 
            key={`${shift.id}-${i}`}/>
        ))
    const shiftStartDisplay = moment(shiftStart).format('HH:mm')
    
    return ( 
        <div className="shift-tile">
            <div className="shift-header">
                <span>{shiftStartDisplay}</span>
                <span>{shift.shiftName}</span>
            </div>
            <button onClick={() => handleUpdateShift(shift)} >Edit</button>
            <button onClick={() => handleDeleteShift(shift)} >Delete</button>
            <ul className="employee-select-list">
                {employeeSelects}
            </ul>
        </div>
     );
}
 
export default ShiftTile;