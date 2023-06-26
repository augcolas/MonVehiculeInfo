import {StyleSheet, Touchable, TouchableOpacity, View} from "react-native";
import React from "react";
import Ionicons from '@expo/vector-icons/Ionicons';
import {Link, useRouter} from "expo-router";

export default function Navbar({route}) {

    const router = useRouter();
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={()=> {router.push("/profile")}} style={[styles.item]}><View style={route === "profile" ? styles.current : {}}><Ionicons name="person-circle-outline" size={24} color="black" /></View></TouchableOpacity>
            <TouchableOpacity onPress={()=> {router.push("/vehicles")}} style={[styles.item]}><View style={route === "vehicles" ? styles.current : {}}><Ionicons name="car-outline" size={24} color="black" /></View></TouchableOpacity>
            <TouchableOpacity onPress={()=> {router.push("/")}} style={[styles.item]}><View style={route === undefined ? styles.current : {}}><Ionicons name="md-camera-outline" size={24} color="black" /></View></TouchableOpacity>
            <TouchableOpacity onPress={()=> {router.push("/notification")}} style={[styles.item]}><View style={route === "notification" ? styles.current : {}}><Ionicons name="chatbox-outline" size={24} color="black" /></View></TouchableOpacity>
            <TouchableOpacity onPress={()=> {router.push("/settings")}} style={[styles.item]}><View style={route === "settings" ? styles.current : {}}><Ionicons name="ios-settings-outline" size={24} color="black" /></View></TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderRadius: 5,
        width: '100%',
        position:"absolute",
        bottom:0,
        left:0,
        display: "flex",
        flexDirection: "row",
        alignItems:"center",
    },
    item: {
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 50,
    },
    current: {
        backgroundColor: "#58A1D9",
        transform: [{scale: 1.5}],
        height: 40,
        width:40,
        top: -25,
        display:"flex",
        alignItems: "center",
        justifyContent: "center",
        borderWidth:2,
        borderColor: "#000",
        borderRadius: 50,
        transition:'0.5s'
    },
});
