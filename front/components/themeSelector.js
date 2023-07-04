import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import ThemeContext from "../themes/ThemeContext";
import { lightTheme, darkTheme, purpleTheme } from "../themes/theme";

const ThemeSelection = () => {
    const { selectedTheme, handleThemeChange } = useContext(ThemeContext);

    const changeToLightTheme = () => {
        handleThemeChange(lightTheme);
    };

    const changeToDarkTheme = () => {
        handleThemeChange(darkTheme);
    };

    const changeToPurpleTheme = () => {
        handleThemeChange(purpleTheme);
    }

    const styles = StyleSheet.create({
        container: {
            alignItems: 'center',
            marginVertical: 20,
        },
        title: {
            fontSize: 18,
            fontWeight: 'bold',
            marginBottom: 10,
            color: selectedTheme.secondaryColor,
        },
        themeButton: {
            backgroundColor: selectedTheme.buttonColor,
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 8,
            marginBottom: 10,
        },
        selectedButton: {
            backgroundColor: selectedTheme.buttonColor,
        },
        buttonText: {
            color: 'white',
            fontSize: 16,
            fontWeight: 'bold',
        },
        selectedButtonText: {
            color: 'black',
        },
    });

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sélectionnez un thème :</Text>
            <TouchableOpacity
                style={[styles.themeButton, selectedTheme === lightTheme && styles.selectedButton]}
                onPress={changeToLightTheme}
                disabled={selectedTheme === lightTheme}
            >
                <Text style={[styles.buttonText, selectedTheme === lightTheme && styles.selectedButtonText]}>
                    Thème clair
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.themeButton, selectedTheme === darkTheme && styles.selectedButton]}
                onPress={changeToDarkTheme}
                disabled={selectedTheme === darkTheme}
            >
                <Text style={[styles.buttonText, selectedTheme === darkTheme && styles.selectedButtonText]}>
                    Thème sombre
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.themeButton, selectedTheme === purpleTheme && styles.selectedButton]}
                onPress={changeToPurpleTheme}
                disabled={selectedTheme === purpleTheme}
            >
                <Text style={[styles.buttonText, selectedTheme === purpleTheme && styles.selectedButtonText]}>
                    Thème violet
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default ThemeSelection;
