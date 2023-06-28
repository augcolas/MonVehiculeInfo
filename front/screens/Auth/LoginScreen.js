import {ActivityIndicator, Button, StyleSheet, Text, TextInput, View} from "react-native";
import {useAuth} from "../../context/Auth";
import {useState} from "react";
import {checkPassword, getUserByEmail} from "../../services/user.service";

export default function LoginScreen() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);

    const {logIn} = useAuth();

    async function logUser(e) {
        e.preventDefault();
        try {
            setLoading(true);
            const user = await getUserByEmail(email);
            if (user) {
                const res = await checkPassword(user.id, password);
                if (res.result === true) {
                    logIn(user);
                } else {
                    setLoading(false);
                    setError('Le mot de passe est incorrect')
                }
            }
        } catch (e) {
            setLoading(false);
            setError("L'utilisateur n'existe pas")
        }
    }


    return (

        <View style={styles.container}>
            {loading && <ActivityIndicator size='large' color='#000' style={styles.activityIndicator} /> }
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
                    <Button color={"#2ec530"} title="Se Connecter" onPress={logUser}/>
                </View>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    container_login: {
        backgroundColor: "#fff",
        borderRadius: 5,
        display: "flex",
        alignItems: "center",
        padding: 10,
        height: 400,
        width: 280,
        shadowOffset: {width: -2, height: 4},
        shadowColor: '#171717',
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
        color: "#2ec530",
        fontSize: 48
    },
    label: {
        fontSize: 20
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
        borderColor: "#808080",
        padding: 6
    },
    forgotPassword: {
        marginTop: 24,
        fontSize: 12,
        color: "#2ec530",
        fontWeight: "700"
    },
    error:{
        color: "#f00",
        fontSize: 16
    },
    activityIndicator: {
        position: "absolute",
        top: 50,
        bottom: 50,
        zIndex: 99,
        transform: [{ scale: 2 }],
    },
});
