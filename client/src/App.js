import React, { useContext, useEffect } from 'react';
import { Switch, Route, Redirect} from 'react-router-dom';
import './style.css';

import Navbar from './components/Navbar/Navbar';
import Auth from './components/Auth/Auth';
import Employees from './components/Employees/Employees.js';
import Schedule from './components/Schedule/Schedule.js';
import Home from './components/Home/Home.js';
import Title from './components/Title/Title.js';
import JobsPage from './components/Jobs/JobsPage';

import { UserContext } from './context/UserProvider.js';
import { JobContext } from './context/JobProvider';
import userAxios from './functions/userAxios';

const App = () => {
    const { isLoggedIn } = useContext(UserContext)
    const { setJobs } = useContext(JobContext)

    useEffect(() => {
        const getJobs = () => {
            userAxios.get('/api/jobs')
                .then((res => {
                    setJobs(res.data)
                }))
                .catch(err => console.error(err.response.data.errMsg))
        }
        const clearJobs = () => {
            setJobs([])
        }

        isLoggedIn ? getJobs() : clearJobs()
    }, [isLoggedIn, setJobs])
    

    return ( 
        <div className="app">
            {isLoggedIn ? <Navbar /> : <Title />}
            <Switch>
                <Route path="/auth">
                    {isLoggedIn ? <Redirect to="/" /> : <Auth />}
                </Route>
                <Route path="/employees">
                    {isLoggedIn ? <Employees /> : <Redirect to="/auth" />}
                </Route>
                <Route path="/schedule">
                    {isLoggedIn ? <Schedule /> : <Redirect to="/auth" />}  
                </Route>
                <Route path="/jobs">
                    {isLoggedIn ? <JobsPage /> : <Redirect to="/auth" />}  
                </Route>
                <Route path="/">
                   {isLoggedIn ? <Home /> : <Redirect to="/auth" />}
                </Route>
            </Switch>
        </div>
     );
}

export default App;