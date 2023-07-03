import React, { useEffect } from "react";
import { Button, Modal, StyleSheet, Text, TextInput, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import ConversationScreen from "../screens/conversationScreen";

export default function UserConversation(conversation) {

    const [modalVisible, setModalVisible] = React.useState(false);
    const [messages, setMessages] = React.useState([]);
    const [lastMessage, setLastMessage] = React.useState();

    React.useEffect(() => {
        console.log(conversation)
        fetch(`http://minikit.pythonanywhere.com/conversations/${conversation.conversation.id}/messages`)
            .then((res) => res.json())
            .then((res) => {if(res.length>=0){setMessages(res)} });
    }, []);

    React.useEffect(() => {
        if (messages.length >= 0) {
            if(messages[0]){
                console.log(messages[0].content);
                setLastMessage(messages[0].content);
            }
        }
    }, [messages]);

    const handlePress = () => {
        setModalVisible(true);
    }


    return (
        <View style={styles.header}>
            <Text style={styles.conversationNumber}>
                Conversation # {conversation.conversation.license_plate}
            </Text>
            <TouchableOpacity onPress={handlePress}>
                <Text>
                    {lastMessage}
                </Text>
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <ConversationScreen messages={messages}></ConversationScreen>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        backgroundColor: '#fff',
        marginBottom: 10,
    },
    conversationNumber: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});