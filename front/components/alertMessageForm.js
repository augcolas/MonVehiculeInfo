import {Button, StyleSheet, TextInput, View} from "react-native";
import {ALERT} from "../utils/options.helper";
import {useState, useContext} from "react";
import {useAuth} from "../context/Auth";
import {Alert} from "react-native";
import {checkConversationExist, createConversation, createMessage} from "../services/conversation.service";
import ThemeContext from '../themes/ThemeContext';
import {modifyVehicleState} from "../services/vehicule.service";
import {useNavigation} from "@react-navigation/native";

const AlertMessageForm = ({option, identification, type, contact, vehicule, closeModal}) => {
    const {user} = useAuth();
    const [message, setMessage] = useState(ALERT.replace("{option}", option).replace("{vehicle_type}", vehicule.type).replace("{vehicle_brand}", vehicule.brand))
    const {selectedTheme} = useContext(ThemeContext);
    const nav = useNavigation();

    const styles = StyleSheet.create({
        input: {
            height: 100,
            width: 200,
            margin: 12,
            borderWidth: 1,
            padding: 10,
            backgroundColor: selectedTheme.primaryColor,
            color: selectedTheme.secondaryColor,
            borderColor: selectedTheme.secondaryColor,
        },
        buttonContainer: {
            marginVertical: 16,
            backgroundColor: selectedTheme.buttonColor,
            borderColor: selectedTheme.secondaryColor,
            borderRadius: 10,
            padding: 1,
        },
        buttonText: {
            color: selectedTheme.secondaryColor,
        },
    });

    const sendMessage = async () => {
        //getting the conversation infos
        let conversation = await checkConversationExist(user.id, contact.id);

        conversation = await createConversation(user.id, contact.id, identification, type);

        await createMessage(conversation.id, message, user.id);
        modifyVehicleState(identification, 'alert');
        closeModal();
        nav.navigate('Historic');
    }

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
                <Button title="ENVOYER" color={selectedTheme.primaryColor}
                        onPress={() => sendMessage()}>
                </Button>
            </View>
        </>
    )
}

export default AlertMessageForm;
