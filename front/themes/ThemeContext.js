import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {lightTheme} from "./theme";
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [selectedTheme, setSelectedTheme] = useState(lightTheme);

    useEffect(() => {
        const getSelectedThemeFromStorage = async () => {
            try {
                const storedTheme = await AsyncStorage.getItem('selectedTheme');
                if (storedTheme) {
                    setSelectedTheme(JSON.parse(storedTheme));
                }
            } catch (error) {
                console.error('Erreur lors de la récupération du thème depuis AsyncStorage:', error);
            }
        };

        getSelectedThemeFromStorage();
    }, []);

    const handleThemeChange = async (theme) => {
        try {
            setSelectedTheme(theme);
            await AsyncStorage.setItem('selectedTheme', JSON.stringify(theme));
        } catch (error) {
            console.error('Erreur lors de la sauvegarde du thème dans AsyncStorage:', error);
        }
    };

    return (
        <ThemeContext.Provider value={{ selectedTheme, handleThemeChange }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeContext;
