import React, {useContext, useState} from 'react'
import {onAuthStateChanged, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword} from "firebase/auth/react-native";
import {auth} from "../config/firebaseConfig";

const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = (props) => {
    const [user, setUser] = useState(null);
    const [onRetrieve, setOnRetrieve] = useState(true);


    const signIn = async (email, password) => {
        return signInWithEmailAndPassword(auth, email, password).then((user) => {
            setUser(user.user);
        });
    }

    const register = async (name, email, password) => {
        createUserWithEmailAndPassword(auth,email, password).then((result) => {
            console.log(result);
        });
    }

 onAuthStateChanged(auth, (userT) =>{
     if(onRetrieve) {
         setUser(userT);
         setOnRetrieve(false);
     }
 });
    const signout = () => {
        setUser(null);
        return signOut(auth);
    }

    const value = {
        user, signIn, signout
    }

    return (
        <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
    )
}
