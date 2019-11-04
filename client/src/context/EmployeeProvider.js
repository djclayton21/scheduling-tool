import React, {useState} from 'react';
import userAxios from '../functions/userAxios.js'

export const EmployeeContext = React.createContext();

const EmployeeProvider = ({ children }) => {
    const initEmployees = [];
    const [ employees, setEmployees ] = useState(initEmployees);

    const createEmployee = (newEmployee) => {
        userAxios.post('/api/employees', newEmployee)
            .then(res => {
                console.log(res.data)
                setEmployees(prevEmployees => ([...prevEmployees, res.data]))
            })
            .catch(err => (console.error(err.response.data.errMsg)))
    };

    const updateEmployee = (updatedEmployee) => {   
        userAxios.put(`/api/employees/${updatedEmployee._id}`, updatedEmployee)
            .then(res => {
                setEmployees(prevEmployees => prevEmployees.map(employee => (
                    res.data._id === employee._id ? res.data : employee
                    )))
                })
            .catch(err => console.error(err.response.data.errMsg))
    };

    const deleteEmployee = (deletedEmployee) => {
        userAxios.delete(`/api/employees/${deletedEmployee._id}`)
            .then(res => {
                setEmployees(prevEmployees => prevEmployees.filter(employee => (
                    res.data._id !== employee._id
                    )))
                })
            .catch(err => console.error(err.response.data.errMsg))    
    };

    return ( 
        <EmployeeContext.Provider value={{
            employees,
            setEmployees,
            createEmployee, 
            updateEmployee,
            deleteEmployee
        }}>
            {children}
        </EmployeeContext.Provider>
     );
}
 
export default EmployeeProvider;