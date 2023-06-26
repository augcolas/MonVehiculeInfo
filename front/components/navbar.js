import {StyleSheet, Text, View} from "react-native";

export default function Navbar() {
    return (
        <View style={styles.container}>
            <View style={styles.item}><Text>Profile</Text></View>
            <View style={styles.item}><Text>Vehicule</Text></View>
            <View style={styles.item}><Text>Photo</Text></View>
            <View style={styles.item}><Text>Chat</Text></View>
            <View style={styles.item}><Text>Réglage</Text></View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderRadius: 5,
        height: '5%',
        width: '100%',
        position:"absolute",
        bottom:50,
        left:0,
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
    item: {
        flex: 1,
    }
});
