import {StyleSheet, Text, View} from 'react-native';
import Navbar from "../components/navbar";
import React from "react";
import {useRouter, useSegments} from "expo-router";
import { useAuth } from '../context/AuthContext';

export default function Page() {

    const {isLoggedIn} = useAuth();

    const segments = useSegments()[0];
    return (
        <View style={styles.container}>
            <Text>PROFILE:</Text>
            <Navbar route={segments}></Navbar>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
