import {StyleSheet, Text, View} from "react-native";

export default function SettingsScreen() {

    return (
        <View style={styles.container}>
            <Text style={styles.text}>PROFILE SCREEN</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#000"
    },
    text: {
        color: "#fff"
    }
});
