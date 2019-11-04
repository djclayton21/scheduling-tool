import React from 'react';

const EmployeeTile = ({ employee, handleUpdateEmployee, handleDeleteEmployee}) => {
    const { name } = employee;
    return ( 
        <li className="employee-tile">
            <span>{name}</span>
            <button onClick={() => handleUpdateEmployee(employee)} >edit</button>
            <button onClick={() => handleDeleteEmployee(employee)} >delete</button>
        </li>
     );
}
 
export default EmployeeTile;