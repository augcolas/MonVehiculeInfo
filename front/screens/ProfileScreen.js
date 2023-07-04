import { Button, ScrollView, StyleSheet, Text, View } from "react-native";
import React, {useContext} from "react";
import ThemeContext from "../themes/ThemeContext";
import { useAuth } from "../context/Auth";

export default function ProfileScreen() {
    const { user, signout } = useAuth();
    const { selectedTheme } = useContext(ThemeContext);

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        },
        text: {
            marginBottom: 4,
        },
        title: {
            fontSize: 18,
            fontWeight: 'bold',
            marginBottom: 8,
        },
        scrollViewContainer: {
            alignItems: 'center',
            flexGrow: 1,
            paddingTop: 50,
            paddingBottom: 100,
        },
        pinfos: {
            marginTop: 50,
            display: "flex",
            justifyContent: "center",
            alignItems: "left",
        },
        buttonContainer: {
            marginVertical: 16,
            backgroundColor: selectedTheme.buttonColor,
            borderRadius: 10,
            padding: 1,
        },

    });

    const handleLogout = (e) => {
        e.preventDefault();
        // Appeler la fonction de déconnexion ici
        signout();
    };

    return (
        <View style={[styles.container, { backgroundColor: selectedTheme.primaryColor }]}>
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                <Text style={[styles.title, { color: selectedTheme.secondaryColor }]}>Votre Profil</Text>

                <View style={styles.pinfos}>
                    <Text style={[styles.text, { color: selectedTheme.secondaryColor }]}>Prénom : {user.name}</Text>
                    <Text style={[styles.text, { color: selectedTheme.secondaryColor }]}>Mail : {user.email}</Text>
                </View>

                <View style={styles.buttonContainer}>
                    <Button color="white" title="Déconnexion" onPress={handleLogout} />
                </View>
            </ScrollView>
        </View>
    );
}

