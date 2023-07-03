import { Button, StyleSheet, TextInput, View } from "react-native";
import { ALERT } from "../utils/options.helper";
import {useState} from "react";
import {useAuth} from "../context/Auth";

const AlertMessageForm = ({ option, licensePlate }) => {
    const {user} = useAuth();
    const [message,setMessage] = useState(ALERT.replace("{option}", option).replace("{licensePlate}", licensePlate))

    const sendMessage = async () => {
        //getting the contact infos
        const response1 = await fetch(
            'http://minikit.pythonanywhere.com/user/get_by_license_plate/'+licensePlate
        );
        const contact = await response1.json();
        console.log('contact :',contact)

        if(contact == null && contact.id == null){
            console.log('unable to find the car owner')
            return
        }

        //getting the conversation infos
        const response2 = await fetch('http://minikit.pythonanywhere.com/conversations/exist?user_id='+user.id+'&contact_id='+contact.id);
        let conversation = await response2.json();
        console.log('conversation :',conversation)

        //creating the conversation if it doesn't exist
        if(conversation.id == null) {
            const messages = []
            console.log('messages :',messages)
            const response3 = await fetch(
                'http://minikit.pythonanywhere.com/conversations/',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        user_id: user.id,
                        contact_id: contact.id,
                        license_plate: licensePlate
                    }),
                }
            );
            conversation = await response3.json();
            console.log('conversation :',conversation)
        }

        //adding the first message to the conversation
        const response4 = await fetch(
            'http://minikit.pythonanywhere.com/messages/',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content: message,
                    conversation_id: conversation.id,
                    date: new Date().getDate(),
                }),
            }
        );
        const result_message = await response4.json();
        console.log('message :',result_message)
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
