import React, { useState } from 'react';
import axios from 'axios';

export const UserContext = React.createContext();

const UserProvider = (props) => {
    const initUser = localStorage.getItem('user') || {};
    const initToken = localStorage.getItem('token') || "";
    const initLoggedIn = localStorage.getItem('token') ? true : false
    const [ currentUser, setCurrentUser ] = useState(initUser);
    const [ currentToken, setCurrentToken ] = useState(initToken);
    const [ isLoggedIn, setIsLoggedIn ] = useState(initLoggedIn)

    const signup = (username, password) => {
        axios.post('/auth/signup', {username , password})
            .then(res => {
                const {user, token} = res.data;
                setCurrentUser(user)
                setCurrentToken(token)
                localStorage.setItem('user', JSON.stringify(user))
                localStorage.setItem('token', token)
                setIsLoggedIn(true)
            })
            .catch(err => console.error(err.response.data.errMsg))
    };
    const login = (username, password) => {
        axios.post('/auth/login', {username, password})
            .then(res => {
                const {user, token} = res.data;
                setCurrentUser(user)
                setCurrentToken(token)
                localStorage.setItem('user', JSON.stringify(user))
                localStorage.setItem('token', token)
                setIsLoggedIn(true)
            })
            .catch(err => console.error(err.response.data.errMsg))
        
    };
    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setCurrentUser({});
        setCurrentToken("");
        setIsLoggedIn(false)
    };
    return ( 
        <UserContext.Provider value = {{
            currentUser,
            currentToken,
            login,
            signup,
            logout,
            isLoggedIn
        }} >
            {props.children}
        </UserContext.Provider>
     );
}
 
export default UserProvider;