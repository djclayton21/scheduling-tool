import React, { useState } from 'react';
import './style.css'
import AuthForm from './AuthForm';

const Auth = () => {
    const [ signUpToggle, setSignUpToggle ] = useState(true)
    return ( 
    <main className="auth-page">
        {signUpToggle ? <AuthForm formType="login" /> : <AuthForm formType="signup"/>}
        <div className="welcome">
            <h2>Welcome!</h2>
            <p>This is a simple scheduling tool for small business managers.</p>
            <p>It was build with restaurants in mind, but should be useful for any business with shifts that need to change from week to week.</p>
            <p>If you want to see how it works with some prefilled data, you can login with username and password "demo".</p>
        </div>
        {
            signUpToggle ? 
                <button onClick={() => setSignUpToggle(!signUpToggle)}>Need to Signup?</button> 
                : 
                <button onClick={() => setSignUpToggle(!signUpToggle)}>Need to Login?</button>
        }
    </main>
     );
}
 
export default Auth;