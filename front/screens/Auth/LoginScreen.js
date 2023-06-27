import React from "react";
import {Button, StyleSheet, Text, View} from "react-native";
import {useAuth} from "../../context/Auth";
import LoginForm from "../../components/loginForm";

export default function LoginScreen() {
    const {logIn, logout} = useAuth();


    const handleLoginPress = () => {
        logIn({name: "MONCACA", email:"MON BEBE"});
    };

    return (
        <View style={styles.container}>
            <LoginForm></LoginForm>
            {/*<Button title="Se connecter" onPress={handleLoginPress}/>*/}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#000"
    }
});
