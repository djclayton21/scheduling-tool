import React, {useState} from 'react';
import userAxios from '../functions/userAxios.js'

export const EmployeeContext = React.createContext();

const EmployeeProvider = ({ children }) => {
    const initJobs = []
    const [ employees, setEmployees ] = useState(initJobs);
    return ( 
        <EmployeeContext.Provider value={{
            employees,
            setEmployees
        }}>
            {children}
        </EmployeeContext.Provider>
     );
}
 
export default EmployeeProvider;