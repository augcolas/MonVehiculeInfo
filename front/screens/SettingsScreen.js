import React, {useContext} from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import ThemeSelection from "../components/themeSelector";
import ThemeContext from "../themes/ThemeContext";

export default function SettingsScreen() {
    const { selectedTheme } = useContext(ThemeContext);

    return (
        <View style={[styles.container, { backgroundColor: selectedTheme.primaryColor }]}>
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                <Text style={[styles.title, { color: selectedTheme.textColor }]}>Paramètres</Text>
                <ThemeSelection />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollViewContainer: {
        alignItems: 'center',
        flexGrow: 1,
        paddingTop: 50,
        paddingBottom: 100,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
});
