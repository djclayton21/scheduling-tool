import React, { useState } from 'react';
import axios from 'axios';

export const UserContext = React.createContext();

const UserProvider = (props) => {
    const initUser = localStorage.getItem('user') || {};
    const initToken = localStorage.getItem('token') || "";
    const [ currentUser, setCurrentUser ] = useState(initUser);
    const [ currentToken, setCurrentToken ] = useState(initToken);

    const signup = () => {
        
    };
    const login = () => {
        
    };
    const logout = () => {
        
    };
    return ( 
        <UserContext.Provider value = {{
            currentUser: currentUser,
            currentToken: setCurrentToken
        }} >
            {props.children}
        </UserContext.Provider>
     );
}
 
export default UserProvider;