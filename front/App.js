import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AuthProvider} from "./context/Auth";
import MainApp from "./mainApp";
import {configNotification} from "./config/notification";


export default function App() {
    configNotification();
    return (
        <NavigationContainer>
            <AuthProvider>
                <MainApp></MainApp>
            </AuthProvider>
        </NavigationContainer>
    );
}
