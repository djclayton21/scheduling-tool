import React, { useState, useContext } from 'react';
import { EmployeeContext } from '../../context/EmployeeProvider';
import './style.css'
import ModalFull from '../shared/ModalFull.js'
import EmployeeTile from './EmployeeTile';
import EmployeeForm from './EmployeeForm';

const EmployeesPage = () => {
    const [ dialogIsOpen, setDialogIsOpen ] = useState(false)
    const [ formType, setFormType ] = useState('');
    const [ employeeToEdit, setEmployeeToEdit ] = useState(null);
    const { employees, deleteEmployee } = useContext(EmployeeContext)

    const handleAddEmployee = () => {
        setFormType('createEmployee');
        setEmployeeToEdit(null);
        setDialogIsOpen(true);
    }
    const closeDialog = () => {
        setDialogIsOpen(false);
        setFormType('');
    }
    const handleUpdateEmployee = (employee) => {
        setFormType('updateEmployee');
        setEmployeeToEdit(employee);
        setDialogIsOpen(true);
    }
    const handleDeleteEmployee = (employee) => {
        const confirmDelete = window.confirm(`Are you sure you want to delete '${employee.name}'?`)
        confirmDelete && deleteEmployee(employee);
    }

    const mappedEmployees = employees.map(employee => <EmployeeTile 
        employee={employee} 
        handleUpdateEmployee={handleUpdateEmployee} 
        handleDeleteEmployee={handleDeleteEmployee} 
        key={employee._id} 
    />)

    return ( 
        <main className="employees-page" >
            <button className="employees-add-button" onClick={handleAddEmployee} >Add Employee</button>
            <ul className="employees-list">
                {mappedEmployees}
            </ul>
            {dialogIsOpen && <ModalFull closeFunction={closeDialog} >
                <EmployeeForm formType={formType} employeeToEdit={employeeToEdit} setDialogIsOpen={setDialogIsOpen} />
            </ModalFull> }
        </main>
     );
}
 
export default EmployeesPage;