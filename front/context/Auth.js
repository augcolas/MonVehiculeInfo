import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useContext, useState} from 'react'

const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = (props) => {
    const [authUser, setAuthUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const logIn = async (user) => {
        console.log(user);
        setAuthUser(user);
        await AsyncStorage.setItem('user', JSON.stringify(user));
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
