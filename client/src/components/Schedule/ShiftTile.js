import React, { useContext } from 'react';
import { EmployeeContext } from '../../context/EmployeeProvider.js'
import moment from 'moment';

const ShiftTile = ({ shift, setSchedule }) => {
    const { employees } = useContext(EmployeeContext);

    const availableEmployees = employees.filter(employee => (
        employee.jobs.some(job => job._id === shift.job)
    ))

    const { shiftStart, employees: shiftEmployees } = shift;
    const shiftStartDisplay = moment(shiftStart).format('HH:mm')
    const mappedEmployees = shiftEmployees.map(employee => <li key={`${shift._id}-${employee._id}`} >{employee.name}</li>)
    return ( 
        <div className="shift-tile">
            <span className="shift-start">{shiftStartDisplay}</span>
            <ul>{mappedEmployees}</ul>
            <button>Edit</button>
            <button>Delete</button>
        </div>
     );
}
 
export default ShiftTile;