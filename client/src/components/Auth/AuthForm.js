import React, { useState, useContext } from 'react';
import { UserContext } from '../../context/UserProvider';

const AuthForm = (props) => {
    const { formType } = props
    const initUsername = ""
    const initPassword = ""
    const [ username, setUsername ] = useState(initUsername)
    const [ password, setPassword ] = useState(initPassword)
    const submitFunction = useContext(UserContext)[formType]

    const handleSubmit = e => {
        e.preventDefault()
        submitFunction(username, password)
        setUsername(initUsername)
        setPassword(initPassword)
    }

    return ( 
        <form className="auth-form" onSubmit={handleSubmit}>
            <input type="username" name="username" value={username} onChange={e => setUsername(e.target.value)} placeholder="username" />
            <input type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="password" />
            <button>{formType}</button>
        </form>
     );
}
 
export default AuthForm;