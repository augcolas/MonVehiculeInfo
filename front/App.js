import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AuthProvider} from "./context/Auth";
import {ThemeProvider} from "./themes/ThemeContext";
import MainApp from "./mainApp";
import {configNotification} from "./config/notification";

export default function App() {
    configNotification();
    return (
        <NavigationContainer>
            <ThemeProvider>
                <AuthProvider>
                    <MainApp></MainApp>
                </AuthProvider>
            </ThemeProvider>
        </NavigationContainer>
    );
}
