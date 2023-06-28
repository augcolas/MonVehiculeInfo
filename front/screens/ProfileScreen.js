import {StyleSheet, Text, View, ScrollView} from "react-native";
import React, {useEffect} from "react";
import {useAuth} from "../context/Auth";

export default function ProfileScreen() {
    const {authUser} = useAuth();

    useEffect(() => {
        console.log('authUser',authUser)
    },[])
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                <Text style={styles.title}>Votre Profil</Text>

                <View style={styles.pinfos}>
                    <Text>Prénom : {authUser.name}</Text>
                    <Text>Mail : </Text>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: "#fff"
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    scrollViewContainer: {
        alignItems: 'center',
        flexGrow: 1,
        paddingTop: 50,
        paddingBottom: 100,
    },
    pinfos: {
        marginTop: 50,
    }
});
