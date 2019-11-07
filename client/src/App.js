import React, { useContext, useEffect } from 'react';
import { Switch, Route, Redirect} from 'react-router-dom';
import userAxios from './functions/userAxios';

import { UserContext } from './context/UserProvider.js';
import { JobContext } from './context/JobProvider.js';
import { EmployeeContext } from './context/EmployeeProvider.js';
import { SimpleScheduleContext } from './context/SimpleScheduleProvider.js';

import Navbar from './components/Navbar/Navbar.js';
import Auth from './components/Auth/Auth.js';
import EmployeesPage from './components/Employees/EmployeesPage.js';
import SchedulePage from './components/Schedule/SchedulePage.js';
import HomePage from './components/Home/HomePage.js';
import Title from './components/Title/Title.js';
import JobsPage from './components/Jobs/JobsPage';


const App = () => {
    const { isLoggedIn } = useContext(UserContext);
    const { setJobs } = useContext(JobContext);
    const { setEmployees } = useContext(EmployeeContext);
    const { setSimpleSchedules } = useContext(SimpleScheduleContext);

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
            userAxios.get('/api/schedules/simple')
                .then(res => {
                    setSimpleSchedules(res.data)
                })
                .catch(err => console.error(err.response.data.errMsg))
        }
        const clearUserData = () => {
            setJobs([]);
            setEmployees([]);
            setSimpleSchedules([]);
        }

        isLoggedIn ? getUserData() : clearUserData()
    }, [isLoggedIn, setJobs, setEmployees, setSimpleSchedules])
    

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
                <Route path="/schedule/:scheduleId">
                    {isLoggedIn ? <SchedulePage /> : <Redirect to="/auth" />}  
                </Route>
                <Route path="/jobs">
                    {isLoggedIn ? <JobsPage /> : <Redirect to="/auth" />}  
                </Route>
                <Route exact path="/">
                   {isLoggedIn ? <HomePage /> : <Redirect to="/auth" />}
                </Route>
            </Switch>
        </div>
     );
}

export default App;