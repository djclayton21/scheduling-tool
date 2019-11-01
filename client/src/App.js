import React, { useContext } from 'react';
import { Switch, Route, Redirect} from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Auth from './components/Auth/Auth';
import Employees from './components/Employees/Employees.js';
import Schedule from './components/Schedule/Schedule.js';
import Jobs from './components/Jobs/Jobs.js';
import Home from './components/Home/Home.js';
import Title from './components/Title/Title.js';
import { UserContext } from './context/UserProvider.js';

const App = () => {
    const { isLoggedIn } = useContext(UserContext)
    
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
                    {isLoggedIn ? <Jobs /> : <Redirect to="/auth" />}  
                </Route>
                <Route path="/">
                   {isLoggedIn ? <Home /> : <Redirect to="/auth" />}
                </Route>
            </Switch>
        </div>
     );
}

export default App;