import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import UserProvider from './context/UserProvider.js';
import JobProvider from './context/JobProvider.js';
import App from './App.js';
import 'normalize.css';


ReactDOM.render(
    <BrowserRouter>
        <UserProvider>
            <JobProvider>
                <App />
            </JobProvider>
        </UserProvider>
    </BrowserRouter>
    , document.getElementById('root')
)