import {StyleSheet, Text, TextInput, View, Button} from "react-native";

export default function Login() {
    return (
        <View style={styles.form}>
            <View><Text style={styles.title}>Connexion</Text></View>

            <View><Text style={styles.subtitle}>Identifiant</Text></View>
            <View><TextInput style={styles.field}></TextInput></View>

            <View><Text style={styles.subtitle}>Mot de Passe</Text></View>
            <View><TextInput style={styles.field}></TextInput></View>

            <View><Button style={styles.submit}>Se Connecter</Button></View>
        </View>
    );
}

const styles = StyleSheet.create({
    form: {
        margin: 0,
        padding: 0,
        fontFamily: 'Quicksand',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        padding: '10vw',
        position: 'absolute',
        backgroundColor: 'white'
    },
    title: {
        fontSize: '3em',
        marginBottom: '10vh'
    },
    subtitle: {
        fontSize: '1.5em'
    },
    field: {
        fontSize: '1em',
        backgroundColor: 'red',
        padding: '3px',
        width: 'auto',
        marginBottom: '2em'
    },
    submit: {
        padding: '1em',
        backgroundColor: 'red',
        marginTop: '1em'
    }
});