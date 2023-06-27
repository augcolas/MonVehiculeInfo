import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AuthProvider} from "./context/Auth";
import MainApp from "./mainApp";


export default function App() {
    return (
        <NavigationContainer>
            <AuthProvider>
                <MainApp></MainApp>
            </AuthProvider>
        </NavigationContainer>
    );
}
