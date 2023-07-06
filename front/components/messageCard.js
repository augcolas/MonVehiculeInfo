import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {useContext} from "react";
import ThemeContext from "../themes/ThemeContext";


const MessageCard = ({ message, isReceived }) => {
    // Utilise la propriété "isReceived" pour déterminer la couleur de la bulle de conversation
const { selectedTheme } = useContext(ThemeContext);
const bubbleColor = isReceived ? '#E5E5EA' : selectedTheme.buttonColor
const textColor = isReceived ? "black" : "white"

return (
    <View style={[styles.container, { backgroundColor: bubbleColor }, isReceived ? {marginRight: 80} : {marginLeft: 80}]}>
        <Text style={[styles.message, {color: textColor}]}>{message}</Text>
    </View>
);
};


const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        padding: 10,
        margin: 5,
        maxWidth: '80%',
    },
    message: {
        fontSize: 16,
        color: 'white',
    },
});

export default MessageCard