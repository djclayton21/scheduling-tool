import React from 'react';
import './style.css'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return ( 
    <nav className="navbar">
        <Link to="/" >Home</Link>
        <Link to="/employees" >Employees</Link>
        <Link to="/schudule" >Schedule</Link>
        <Link to="/jobs" >Jobs</Link>
    </nav>
    );
}
 
export default Navbar;