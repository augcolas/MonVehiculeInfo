import * as React from "react";
import {useAuth} from "./context/Auth";
import Tabs from "./components/Tabs";
import LoginScreen from "./screens/Auth/LoginScreen";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import RegisterScreen from "./screens/Auth/RegisterScreen";
import Splashscreen from "./screens/Splashscreen";

export default function MainApp() {

    const {user} = useAuth();
    const Stack = createNativeStackNavigator();

    return (
        <>
            {user && <Tabs></Tabs>}
            {!user &&
                <Stack.Navigator> 
                    <Stack.Screen options={{headerShown: false}} name="Splashscreen" component={Splashscreen}/>
                    <Stack.Screen options={{headerShown: false}} name="Login" component={LoginScreen}/>
                    <Stack.Screen options={{headerShown: false}} name="Register" component={RegisterScreen}/>
                </Stack.Navigator>
            }
        </>
    )
}
