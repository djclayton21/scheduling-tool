import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import UserProvider from './context/UserProvider.js';
import JobProvider from './context/JobProvider.js';
import SimpleScheduleProvider from './context/SimpleScheduleProvider.js';
import EmployeeProvider from './context/EmployeeProvider.js';
import App from './App.js';
import './reset.css';
import './style.css';


ReactDOM.render(
    <BrowserRouter>
        <UserProvider>
            <JobProvider>
                <EmployeeProvider>
                    <SimpleScheduleProvider>
                        <App />
                    </SimpleScheduleProvider>
                </EmployeeProvider>
            </JobProvider>
        </UserProvider>
    </BrowserRouter>
    , document.getElementById('root')
)