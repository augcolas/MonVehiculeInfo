import {Button, StyleSheet, Text, View} from "react-native";

// Composant pour l'écran de l'utilisateur connecté
function UserProfileScreen({user, onLogout}) {
    const handleLogoutPress = () => {
        // Gérer la logique de déconnexion ici
        onLogout();
    };

    return (
        <View style={styles.screen}>
            {/* Afficher les informations de l'utilisateur */}
            <Text>Bienvenue, {user.name}!</Text>
            <Text>Email: {user.email}</Text>
            {/* Bouton de déconnexion */}
            <Button title="Se déconnecter" onPress={handleLogoutPress}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {},
    screen: {},
});

export default UserProfileScreen
