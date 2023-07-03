import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AuthProvider} from "./context/Auth";
import MainApp from "./mainApp";
import {configNotification, registerForPushNotificationsAsync} from "./config/notification";


export default function App() {
    configNotification();
    registerForPushNotificationsAsync().then((token) => console.log("app.js token", token));
    return (
        <NavigationContainer>
            <AuthProvider>
                <MainApp></MainApp>
            </AuthProvider>
        </NavigationContainer>
    );
}
