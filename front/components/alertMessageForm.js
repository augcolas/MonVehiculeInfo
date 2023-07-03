import React, { useContext, useState } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';
import { ALERT } from '../utils/options.helper';
import { useAuth } from '../context/Auth';
import ThemeContext from '../themes/ThemeContext';

const AlertMessageForm = ({ option, licensePlate }) => {
    const { selectedTheme } = useContext(ThemeContext);
    const { user } = useAuth();
    const [message, setMessage] = useState(
        ALERT.replace('{option}', option).replace('{licensePlate}', licensePlate)
    );

    const sendMessage = async () => {
        // Code pour envoyer le message
    };

    const styles = StyleSheet.create({
        input: {
            height: 100,
            width: 200,
            margin: 12,
            borderWidth: 1,
            padding: 10,
            backgroundColor: selectedTheme.backgroundColor,
            color: selectedTheme.textColor,
        },
        buttonContainer: {
            marginVertical: 16,
            backgroundColor: selectedTheme.buttonColor,
            borderRadius: 10,
            padding: 1,
        },
        buttonText: {
            color: selectedTheme.secondaryColor,
        },
    });

    return (
        <>
            <TextInput
                style={styles.input}
                onChangeText={(text) => setMessage(text)}
                value={message}
                editable={true}
                multiline={true}
                numberOfLines={4}
            />
            <View style={styles.buttonContainer}>
                <Button
                    title="ENVOYER"
                    color={selectedTheme.secondaryColor}
                    onPress={sendMessage}
                />
            </View>
        </>
    );
};

export default AlertMessageForm;
