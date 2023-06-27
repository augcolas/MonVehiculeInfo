import {useAuth} from "./context/Auth";
import Tabs from "./components/Tabs";
import * as React from "react";
import LoginScreen from "./screens/Auth/LoginScreen";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

export default function MainApp() {
    const {isLoggedIn} = useAuth();

    const Stack = createNativeStackNavigator();


    return (
       <>
            {isLoggedIn && <Tabs></Tabs>}
            {!isLoggedIn &&
                <Stack.Navigator>
                    <Stack.Screen name="Login" component={LoginScreen}/>
                </Stack.Navigator>
            }
       </>)
}
