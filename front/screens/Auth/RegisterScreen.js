import {ActivityIndicator, Button, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {useAuth} from "../../context/Auth";
import {useState} from "react";
import {useNavigation} from "@react-navigation/native";
import {Ionicons} from "@expo/vector-icons";
import ThemeContext from "../../themes/ThemeContext";
import {useContext} from "react";

export default function RegisterScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();
    const {register} = useAuth();
    const {selectedTheme} = useContext(ThemeContext);

    const styles = StyleSheet.create({
        container: {
            height: "100%", display: "flex", alignItems: "center", justifyContent: "center",backgroundColor: selectedTheme.primaryColor
        }, container_login: {
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
        }, container_inputs: {
            flex: 5, display: "flex"
        }, container_buttons: {
            flex: 1, display: "flex", justifyContent: "center", transform: ([{scale: 1.5}])
        }, header: {
            flex: 1
        },
        title: {
            color: selectedTheme.buttonColor, fontSize: 30, textAlign: "center"
        }, label: {
            fontSize: 20,
            color: selectedTheme.secondaryColor,
        }, input: {
            flex: 1, display: "flex", justifyContent: "center", width: 240
        }, textInput: {
            borderWidth: 1, borderRadius: 5, borderColor: selectedTheme.cardColor, padding: 6, color: selectedTheme.secondaryColor
        }, forgotPassword: {
            marginTop: 24, fontSize: 12, color: selectedTheme.buttonColor, fontWeight: "700"
        }, error: {
            color: "#f00", fontSize: 16, textAlign: "center"
        }, activityIndicator: {
            position: "absolute", top: 50, bottom: 50, zIndex: 99, transform: [{scale: 2}],
        }, arrow_back: {
            position: "absolute", top: 50, left: 10
        }
    });

    async function registerUser(e) {
        e.preventDefault();
        if (name === "") {
            setError("Le nom est vide");
            return;
        }
        setLoading(true);
        register(name, email, password).catch((e) => {
            setLoading(false);
            switch (e.code) {
                case 'auth/invalid-email':
                    setError("L'email est invalide")
                    break;
                case 'auth/weak-password':
                    setError('Mot de passe trop faible (8 caractères minimum)')
                    break;
                case 'auth/missing-password':
                    setError('Mot de passe invalide')
                    break;
                case 'auth/email-already-in-use':
                    setError('Email déjà utilisé')
                    break;
                default:
                    setError('Connexion impossible')
            }
        });

    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.arrow_back}>
                <Ionicons name="arrow-back" size={36} color={selectedTheme.secondaryColor}/>
            </TouchableOpacity>
            {loading && <ActivityIndicator size='large' color='#000' style={styles.activityIndicator}/>}
            <View style={styles.container_login}>
                <View style={styles.header}>
                    <Text style={styles.title}>Nouveau compte</Text>
                    {error && (<Text style={styles.error}>{error}</Text>)}
                </View>
                <View style={styles.container_inputs}>
                    <View style={styles.input}>
                        <Text style={styles.label}>Nom</Text>
                        <TextInput style={styles.textInput}
                                   isRequired
                                   onChangeText={(name) => setName(name)}
                                   value={name}
                                   editable={!loading}
                        ></TextInput>
                    </View>
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
                </View>
                <View style={styles.container_buttons}>
                    <Button color={selectedTheme.buttonColor} title="Créer son compte" onPress={registerUser}/>
                </View>

            </View>
        </View>);
}
