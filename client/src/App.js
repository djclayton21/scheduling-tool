import React, { useContext, useEffect } from 'react';
import { Switch, Route, Redirect} from 'react-router-dom';
import './style.css';

import Navbar from './components/Navbar/Navbar.js';
import Auth from './components/Auth/Auth.js';
import EmployeesPage from './components/Employees/EmployeesPage.js';
import SchedulePage from './components/Schedule/SchedulePage.js';
import HomePage from './components/Home/HomePage.js';
import Title from './components/Title/Title.js';
import JobsPage from './components/Jobs/JobsPage';

import { UserContext } from './context/UserProvider.js';
import { JobContext } from './context/JobProvider';
import { EmployeeContext } from './context/EmployeeProvider';
import userAxios from './functions/userAxios';

const App = () => {
    const { isLoggedIn } = useContext(UserContext);
    const { setJobs } = useContext(JobContext);
    const { setEmployees } = useContext(EmployeeContext)

    useEffect(() => {
        const getUserData = () => {
            userAxios.get('/api/jobs')
                .then(res => {
                    setJobs(res.data)
                })
                .catch(err => console.error(err.response.data.errMsg))
            userAxios.get('/api/employees/populated')
                .then(res => {
                    setEmployees(res.data)
                })
                .catch(err => console.error(err.response.data.errMsg))
        }
        const clearUserData = () => {
            setJobs([]);
            setEmployees([])
        }

        isLoggedIn ? getUserData() : clearUserData()
    }, [isLoggedIn, setJobs, setEmployees])
    

    return ( 
        <div className="app">
            {isLoggedIn ? <Navbar /> : <Title />}
            <Switch>
                <Route path="/auth">
                    {isLoggedIn ? <Redirect to="/" /> : <Auth />}
                </Route>
                <Route path="/employees">
                    {isLoggedIn ? <EmployeesPage /> : <Redirect to="/auth" />}
                </Route>
                <Route path="/schedule">
                    {isLoggedIn ? <SchedulePage /> : <Redirect to="/auth" />}  
                </Route>
                <Route path="/jobs">
                    {isLoggedIn ? <JobsPage /> : <Redirect to="/auth" />}  
                </Route>
                <Route path="/">
                   {isLoggedIn ? <HomePage /> : <Redirect to="/auth" />}
                </Route>
            </Switch>
        </div>
     );
}

export default App;