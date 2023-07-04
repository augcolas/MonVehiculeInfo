import {ActivityIndicator, Button, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {useAuth} from "../../context/Auth";
import {useState} from "react";
import {useNavigation} from "@react-navigation/native";
import ThemeContext from "../../themes/ThemeContext";
import {useContext} from "react";
export default function LoginScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);

    const {signIn, loadingRetrieve} = useAuth();
    const navigation = useNavigation();

    const {selectedTheme} = useContext(ThemeContext);
    const styles = StyleSheet.create({
        container: {
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: selectedTheme.primaryColor
        },
        container_login: {
            backgroundColor: selectedTheme.primaryColor,
            borderRadius: 5,
            display: "flex",
            alignItems: "center",
            padding: 10,
            height: 400,
            width: 280,
            shadowOffset: {width: -2, height: 4},
            shadowColor: selectedTheme.secondaryColor,
            shadowOpacity: 0.2,
            shadowRadius: 3,
        },
        container_inputs: {
            flex: 2,
            display: "flex"
        },
        container_buttons: {
            flex: 1,
            display: "flex",
            justifyContent: "center",
            transform: ([{scale: 1.5}])
        },
        title: {
            flex: 1,
            color: selectedTheme.buttonColor,
            fontSize: 46
        },
        label: {
            fontSize: 20,
            color: selectedTheme.secondaryColor,
        },
        input: {
            flex: 1,
            display: "flex",
            justifyContent: "center",
            width: 240
        },
        textInput: {
            borderWidth: 1,
            borderRadius: 5,
            borderColor: selectedTheme.cardColor,
            color: selectedTheme.secondaryColor,
            padding: 6
        },
        forgotPassword: {
            marginTop: 24,
            fontSize: 12,
            color: selectedTheme.buttonColor,
            fontWeight: "700"
        },
        register: {
            marginTop: 24,
            fontSize: 16,
            color: selectedTheme.buttonColor,
            fontWeight: "500"
        },
        error: {
            color: "#f00",
            fontSize: 16
        },
        activityIndicator: {
            position: "absolute",
            top: 50,
            bottom: 50,
            zIndex: 99,
            transform: [{scale: 2}],
        },
    });

    async function logUser(e) {
        e.preventDefault();
        setLoading(true);
        signIn(email, password).catch((e) => {
            setLoading(false);
            switch(e.code){
                case 'auth/invalid-email':
                    setError("L'email est invalide")
                    break;
                case 'auth/wrong-password':
                    setError('Mot de passe invalide')
                    break;
                default:
                    setError('Connexion impossible')
            }
        });

    }


    return (

        <View style={styles.container}>
            {(loading || loadingRetrieve) && <ActivityIndicator size='large' color='#000' style={styles.activityIndicator}/>}
            <View style={styles.container_login}>
                <Text style={styles.title}>Connexion</Text>
                {error && (<Text style={styles.error}>{error}</Text>)}
                <View style={styles.container_inputs}>
                    <View style={styles.input}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            style={styles.textInput}
                            isRequired
                            onChangeText={(email) => setEmail(email)}
                            value={email}
                            editable={!loading}
                        ></TextInput>
                    </View>
                    <View style={styles.input}>
                        <Text style={styles.label}>Mot de Passe</Text>
                        <TextInput style={styles.textInput}
                                   isRequired
                                   secureTextEntry={true}
                                   onChangeText={(password) => setPassword(password)}
                                   value={password}
                                   editable={!loading}
                        ></TextInput>
                    </View>
                    <Text style={styles.forgotPassword}>Mot de passe oublié?</Text>
                </View>


                <View style={styles.container_buttons}>
                    <Button color={selectedTheme.buttonColor} title="Se Connecter" onPress={logUser}/>
                </View>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={styles.register}>Créer son compte</Text>
            </TouchableOpacity>
        </View>
    );
}
