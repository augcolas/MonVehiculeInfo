import {initializeApp} from 'firebase/app';
import {getReactNativePersistence, initializeAuth} from "firebase/auth/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Optionally import the services that you want to use
// import { getAuth } from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDDyOMUSldE5ku66VahYrfP4BWL-PH5l2Q",
    authDomain: "monvehiculeinfo-firebase.firebaseapp.com",
    projectId: "monvehiculeinfo-firebase",
    storageBucket: "monvehiculeinfo-firebase.appspot.com",
    messagingSenderId: "852797199903",
    appId: "1:852797199903:web:0ac2f79e759e9fa369672a",
    measurementId: "G-13EC59G38V"
};
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {persistence: getReactNativePersistence(AsyncStorage)})


