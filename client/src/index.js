import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import UserProvider from './context/UserProvider.js';
import JobProvider from './context/JobProvider.js';
import EmployeeProvider from './context/EmployeeProvider.js';
import App from './App.js';
import 'normalize.css';


ReactDOM.render(
    <BrowserRouter>
        <UserProvider>
            <JobProvider>
                <EmployeeProvider>
                    <App />
                </EmployeeProvider>
            </JobProvider>
        </UserProvider>
    </BrowserRouter>
    , document.getElementById('root')
)