import {StyleSheet, Text, TextInput, View} from "react-native";

export default function Login() {
    return (
        <View style={styles.form}>
            <View><Text>Connexion</Text></View>

            <View><Text>Identifiant</Text></View>
            <View><TextInput>Champ1</TextInput></View>

            <View><Text>Mot de Passe</Text></View>
            <View><TextInput>Champ2</TextInput></View>

            <View><Button>Se Connecter</Button></View>
        </View>
    );
}

const styles = StyleSheet.create({
    form: {
        backgroundColor: 'white',
        alignItems: 'center'
    }
});