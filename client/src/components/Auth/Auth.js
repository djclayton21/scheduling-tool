import React, { useState } from 'react';
import './style.css'
import AuthForm from './AuthForm';

const Auth = () => {
    const [ signUpToggle, setSignUpToggle ] = useState(true)
    return ( 
    <div className="auth-page">
        {signUpToggle ? <AuthForm formType="login" /> : <AuthForm formType="signup"/>}
        <button onClick={() => setSignUpToggle(!signUpToggle)}>Toggle</button>
    </div>
     );
}
 
export default Auth;