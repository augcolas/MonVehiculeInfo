import { useEffect } from "react";
import {useAuth} from "./context/Auth";
import Tabs from "./components/Tabs";
import * as React from "react";
import LoginScreen from "./screens/Auth/LoginScreen";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ModalAlert from "./components/modalAlert";

export default function MainApp() {
    const {isLoggedIn, logIn} = useAuth();

    const Stack = createNativeStackNavigator();

    useEffect(() => {
        const verifyUser = async () => {
            const userJson = await AsyncStorage.getItem('user');
            const user = JSON.parse(userJson);
            if(user){
                logIn(user);
            }
        }
        verifyUser();
    }, []);


    return (
       <>
            {isLoggedIn && <ModalAlert></ModalAlert>}
            {!isLoggedIn &&
                <Stack.Navigator>
                    <Stack.Screen name="Login" component={LoginScreen}/>
                </Stack.Navigator>
            }
       </>)
}
