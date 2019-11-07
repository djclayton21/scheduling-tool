import React, { useContext } from 'react';
import './style.css'
import { Link } from 'react-router-dom'
import { UserContext } from '../../context/UserProvider';

const Navbar = () => {
    const { logout } = useContext(UserContext);
    
    return ( 
    <header className="navbar">
        <Link to="/" >Home</Link>
        <Link to="/jobs" >Jobs</Link>
        <Link to="/employees" >Employees</Link>
        <button className="navbar-logout" onClick={logout} >Logout</button>
    </header>
    );
}
 
export default Navbar;