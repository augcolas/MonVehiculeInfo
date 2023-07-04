import React, { useContext } from 'react';
import { View, Text, Button } from 'react-native';
import ThemeContext from "../themes/ThemeContext";
import {lightTheme,darkTheme} from "../themes/theme";
const ThemeSelection = () => {
    const { selectedTheme, handleThemeChange } = useContext(ThemeContext);

    const changeToLightTheme = () => {
        handleThemeChange(lightTheme);
    };

    const changeToDarkTheme = () => {
        handleThemeChange(darkTheme);
    };

    return (
        <View>
            <Text>Sélectionnez un thème :</Text>
            <Button
                title="Thème clair"
                onPress={changeToLightTheme}
                disabled={selectedTheme === lightTheme}
            />
            <Button
                title="Thème sombre"
                onPress={changeToDarkTheme}
                disabled={selectedTheme === darkTheme}
            />
        </View>
    );
};

export default ThemeSelection;
