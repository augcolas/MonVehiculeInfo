import { Button, StyleSheet, TextInput, View } from "react-native";
import { ALERT } from "../utils/options.helper";
import {useState} from "react";
import {useAuth} from "../context/Auth";
import {Alert} from "react-native";
import {checkConversationExist, createConversation, createMessage} from "../services/conversation.service";

const AlertMessageForm = ({ option, licensePlate,contact }) => {
    const {user} = useAuth();
    const [message,setMessage] = useState(ALERT.replace("{option}", option).replace("{licensePlate}", licensePlate))

    const sendMessage = async () => {
        //getting the conversation infos
        let conversation = await checkConversationExist(user.id, contact.id);

        //creating the conversation if it doesn't exist
        if(conversation.message != null) {
            conversation = await createConversation(user.id, contact.id, licensePlate);
        }
        await createMessage(conversation.id, message, user.id);
    }

    return (
        <>
            <TextInput
                style={styles.input}
                onChangeText={(text) => setMessage(text)}
                value={message}
                editable={true}
                multiline = {true}
                numberOfLines = {4}
            />
            <View style={styles.buttonContainer}>
                <Button title="ENVOYER" color={"white"}
                        onPress={() => sendMessage()}>
                </Button>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    input: {
        height: 100,
        width:200,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    buttonContainer: {
        marginVertical: 16,
        backgroundColor: '#2ec530',
        borderRadius: 10,
        padding: 1,
    },
});


export default AlertMessageForm;
