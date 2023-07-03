import React, {useContext, useState} from 'react'
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail
} from "firebase/auth/react-native";
import {auth} from "../config/firebaseConfig";
import {addUser, getUserByFirebaseUuId, updateExpoToken} from "../services/user.service";
import {registerForPushNotificationsAsync} from "../config/notification";

const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = (props) => {
    const [user, setUser] = useState(null);
    const [firstTime, setFirstTime] = useState(true);
    const [loadingRetrieve, setOnloadingRetrieve] = useState(false);

    const signIn = async (email, password) => {
        return signInWithEmailAndPassword(auth, email, password).then((user) => {
            retrieveUserData(user.user.uid);
        });
    }

    const register = async (name, email, password) => {
        return createUserWithEmailAndPassword(auth, email, password).then((result) => {
            addUser({name, email, firebase_uuid: result.user.uid, vehicles: []}).then((data) => {
                retrieveUserData(result.user.uid);
            })
        })
    }

    const retrieveUserData = (uuid) => {
        setOnloadingRetrieve(true);
        getUserByFirebaseUuId(uuid).then((result) => {
            setUser(result);
            setOnloadingRetrieve(false)
        });
    }

    const registerNotifications = (uuid) => {
        registerForPushNotificationsAsync().then((token) => {
            updateExpoToken(uuid, token).then((result) => console.log('result', result))
        });
    }

    const signout = () => {
        setUser(null);
        return signOut(auth);
    }

    const resetPassword = (email) => {
        return sendPasswordResetEmail(auth, email);
    }

    onAuthStateChanged(auth, (user) => {
        if (firstTime) {
            setFirstTime(false);
            if (user) {
                retrieveUserData(user.uid);
                registerNotifications(user.uid);
            }
        }
    })

    const value = {
        user, signIn, signout, register, loadingRetrieve, resetPassword
    }

    return (
        <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
    )
}
