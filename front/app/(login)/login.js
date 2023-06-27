import { Button, StyleSheet, View } from "react-native";
import {useAuth} from "../../context/Auth";

// Composant pour l'écran de connexion
export default function Login() {
    const { signIn } = useAuth();

    const handleLoginPress = () => {
        // Gérer la logique de connexion ici et appeler onLogin avec les données de l'utilisateur
        const userData = { name: 'John Doe', email: 'john.doe@example.com' };
        signIn();
    };

    return (
        <View style={styles.screen}>
            {/* Formulaire de connexion */}
            {/* ... */}
            {/* Bouton de connexion */}
            <Button title="Se connecter" onPress={handleLoginPress} />
        </View>
    );
}

const styles = StyleSheet.create({
});
