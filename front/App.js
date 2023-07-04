import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AuthProvider} from "./context/Auth";
import {configNotification} from "./config/notification";
import Splashscreen from "./screens/Splashscreen";

export default function App() {
    configNotification();
    return (
        <NavigationContainer>
            <AuthProvider>
                <Splashscreen/>
            </AuthProvider>
        </NavigationContainer>
    );
}
