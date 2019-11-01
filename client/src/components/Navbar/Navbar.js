import React, { useContext } from 'react';
import './style.css'
import { Link } from 'react-router-dom'
import { UserContext } from '../../context/UserProvider';

const Navbar = () => {
    const { logout } = useContext(UserContext);
    return ( 
    <nav className="navbar">
        <Link to="/" >Home</Link>
        <Link to="/employees" >Employees</Link>
        <Link to="/schudule" >Schedule</Link>
        <Link to="/jobs" >Jobs</Link>
        <button onClick={logout} >Logout</button>
    </nav>
    );
}
 
export default Navbar;