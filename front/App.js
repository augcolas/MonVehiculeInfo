import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Tabs from "./components/Tabs";


export default function App() {
    return (
        <NavigationContainer>
          <Tabs></Tabs>
        </NavigationContainer>
    );
}
