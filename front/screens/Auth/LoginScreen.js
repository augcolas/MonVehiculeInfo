import React from "react";
import {Button, StyleSheet, Text, View} from "react-native";
import {useAuth} from "../../context/Auth";

export default function LoginScreen() {
    const {logIn, logout} = useAuth();


    const handleLoginPress = () => {
        logIn({name: "MONCACA", email:"MON BEBE"});
    };

    return (
        <View style={styles.container}>
            <Text>TEST</Text>
            {/* Formulaire de connexion */}
            {/* ... */}
            {/* Bouton de connexion */}
            <Button title="Se connecter" onPress={handleLoginPress}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#000"
    }
});
