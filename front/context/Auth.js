import React, {useContext, useState} from 'react'

const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = (props) => {
    const [authUser, setAuthUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const logIn = (user) => {
        console.log(user);
        setAuthUser(user);
        setIsLoggedIn(true);
    }

    const logout = () => {
        setAuthUser(null);
        setIsLoggedIn(false);
    }

    const value = {
        isLoggedIn, logIn, logout
    }

    return (
        <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
    )
}
