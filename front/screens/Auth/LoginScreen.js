import { ActivityIndicator, Button, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useAuth } from "../../context/Auth";
import React, { useState, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import ThemeContext from "../../themes/ThemeContext";
export default function LoginScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModaleVisible] = useState(false);
    const [modalError, setModalError] = useState();

    const { signIn, loadingRetrieve, resetPassword } = useAuth();
    const navigation = useNavigation();

    const { selectedTheme } = useContext(ThemeContext);
    const styles = StyleSheet.create({
        container: {
            height: "100%", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: selectedTheme.primaryColor
        }, container_login: {
            backgroundColor: selectedTheme.primaryColor,
            borderRadius: 5,
            display: "flex",
            alignItems: "center",
            padding: 10,
            height: 400,
            width: 280,
            shadowOffset: { width: -2, height: 4 },
            shadowColor: selectedTheme.secondaryColor,
            shadowOpacity: 0.2,
            shadowRadius: 3
        }, container_inputs: {
            flex: 3, display: "flex"
        }, container_buttons: {
            flex: 2, display: "flex", justifyContent: "center", transform: ([{ scale: 1.5 }])
        }, container_forgotPassword: {
            flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center'
        }, container_modal: {
            flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)'
        }, container_modal_content: {
            display: 'flex', backgroundColor: selectedTheme.primaryColor, width: 250, height: 200, padding: 20
        }, container_modal_content_inputs: {
            flex: 2, display: 'flex', justifyContent: 'center'
        }, modal_container_button: {
            flex: 1, justifyContent: 'center', textAlign: 'center'
        }, modal_buttons: {
            color: selectedTheme.buttonColor, fontSize: 16, textAlign: 'center'
        }, title: {
            flex: 2, color: selectedTheme.buttonColor, fontSize: 46
        }, label: {
            fontSize: 20,
            color: selectedTheme.secondaryColor,
        }, input: {
            flex: 1, display: "flex", justifyContent: "center", width: 240
        }, textInput: {
            borderWidth: 1, borderRadius: 5, borderColor: selectedTheme.cardColor, padding: 6, color: selectedTheme.secondaryColor
        }, forgotPassword: {
            fontSize: 12, color: selectedTheme.buttonColor, fontWeight: "700"
        }, register: {
            marginTop: 24, fontSize: 16, color: selectedTheme.buttonColor, fontWeight: "500"
        }, error: {
            color: "#f00", fontSize: 16, textAlign: "center"
        }, back: {
            flex: 1, zIndex: 50
        }, activityIndicator: {
            position: "relative", top: 50, bottom: 50, zIndex: 99, transform: [{ scale: 2 }],
        },
    });
    async function logUser(e) {
        e.preventDefault();
        setLoading(true);
        signIn(email, password).catch((e) => {
            setLoading(false);
            switch (e.code) {
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

    async function handleResetPassword(e) {
        e.preventDefault();
        setLoading(true);
        resetPassword(email)
            .then(() => {
                setLoading(false);
                setModaleVisible(false);
            })
            .catch((e) => {
                setLoading(false);
                switch (e.code) {
                    case 'auth/missing-email':
                        setModalError("L'email est manquante")
                        break;
                    case 'auth/invalid-email':
                        setModalError("L'email est invalide")
                        break;
                    case 'auth/too-many-requests':
                        setModalError('Vous avez fait trop de requête. Attendez et réessayez')
                        break;
                    default:
                        setModalError('Reinitialisation du mot de passe impossible')
                }
            })
    }


    return (<View style={styles.container}>
        {(loading || loadingRetrieve) &&
            <ActivityIndicator size='large' color='#000' style={styles.activityIndicator} />}
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
            </View>
            <TouchableOpacity style={styles.container_forgotPassword} onPress={() => setModaleVisible(true)}>
                <Text style={styles.forgotPassword}>Mot de passe oublié?</Text>
            </TouchableOpacity>

            <View style={styles.container_buttons}>
                <Button color={selectedTheme.buttonColor} title="Se Connecter" onPress={logUser} />
            </View>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.register}>Créer son compte</Text>
        </TouchableOpacity>
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModaleVisible(false)}
        >
            <View style={styles.container_modal}>
                <View style={styles.container_modal_content}>
                    <Ionicons onPress={() => setModaleVisible(false)} style={styles.back} name="arrow-back-outline"
                        size={36} color="black" />
                    <View style={styles.container_modal_content_inputs}>
                        {modalError && (<Text style={styles.error}>{modalError}</Text>)}
                        <Text style={styles.label}>Email</Text>
                        <TextInput style={styles.textInput}
                            isRequired
                            onChangeText={(email) => setEmail(email)}
                            value={email}
                            editable={!loading}
                        ></TextInput>
                    </View>
                    <TouchableOpacity style={styles.modal_container_button} onPress={handleResetPassword}>
                        <Text style={styles.modal_buttons}>Reinitialiser le mot de passe</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    </View>


    );
}
