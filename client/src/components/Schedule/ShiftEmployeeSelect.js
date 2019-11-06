import React from 'react';

const ShiftEmployeeSelect = ({shift, shiftEmployeesForm, formIndex,  availableEmployees, setShiftEmployeesForm}) => {

    //select options
    const mappedAvailableEmployees = availableEmployees.map((employee, i) => (
        <option value={employee._id} key={`select-${shift._id}-${i}`} >{employee.name}</option>
        ))

    const handleChange = (event) => {
        event.persist();
        setShiftEmployeesForm(prevShiftEmployeesForm => {
            const newShiftEmployeesForm = [...prevShiftEmployeesForm]
            newShiftEmployeesForm[formIndex] = event.target.value;
            return newShiftEmployeesForm;
        })
        
    }
    return ( 
            <select className="employee-select" value={shiftEmployeesForm[formIndex]} onChange={handleChange}>
                <option value=""></option>
                {mappedAvailableEmployees}
            </select>
     );
}
 
export default ShiftEmployeeSelect;