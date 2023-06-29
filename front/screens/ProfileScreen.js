import {Button, ScrollView, StyleSheet, Text, View} from "react-native";
import React from "react";
import {useAuth} from "../context/Auth";

export default function ProfileScreen() {
    const {user, signout} = useAuth();

    const handleLogout = (e) => {
        e.preventDefault();
        // Appeler la fonction de déconnexion ici
        signout();
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                <Text style={styles.title}>Votre Profil</Text>

                <View style={styles.pinfos}>
                    <Text style={styles.text} >Prénom : {user.email}</Text>
                    <Text style={styles.text} >Mail : {user.email}</Text>
                </View>

                <View style={styles.buttonContainer}>
                    <Button color={"white"} title="Déconnexion" onPress={handleLogout} />
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center'
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
        backgroundColor: '#2ec530',
        borderRadius: 10,
        padding: 1,
    },
});
