import {StyleSheet, View} from "react-native";
import React from "react";
import Ionicons from '@expo/vector-icons/Ionicons';
import {Link, useRouter} from "expo-router";

export default function Navbar() {
    return (
        <View style={styles.container}>
            <View style={styles.item}><Link href="/profile"><Ionicons name="person-circle-outline" size={24} color="black" /></Link></View>
            <View style={styles.item}><Link href="/vehicules"><Ionicons name="car-outline" size={24} color="black" /></Link></View>
            <View style={styles.item}><Link href="/"><Ionicons name="md-camera-outline" size={24} color="black" /></Link></View>
            <View style={styles.item}><Link href="/chat"><Ionicons name="chatbox-outline" size={24} color="black" /></Link></View>
            <View style={styles.item}><Link href="/settings"><Ionicons name="ios-settings-outline" size={24} color="black" /></Link></View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderRadius: 5,
        height: '8%',
        width: '100%',
        position:"absolute",
        bottom:0,
        left:0,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    item: {
        flex: 1,
        textAlign:"center"
    }
});
