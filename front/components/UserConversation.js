import React, {useContext} from "react";
import {Modal, StyleSheet, Text, View} from "react-native";
import {TouchableOpacity} from "react-native-gesture-handler";
import ConversationScreen from "../screens/conversationScreen";
import {Ionicons} from "@expo/vector-icons";
import ThemeContext from "../themes/ThemeContext";

export default function UserConversation(conversation) {

    const [modalVisible, setModalVisible] = React.useState(false);
    const [messages, setMessages] = React.useState([]);
    const [lastMessage, setLastMessage] = React.useState();
    const { selectedTheme } = useContext(ThemeContext);

    const styles = StyleSheet.create({
        header: {
            alignItems: 'center',
            paddingVertical: 10,
            borderBottomWidth: 1,
            borderBottomColor: selectedTheme.cardColor,
            backgroundColor: selectedTheme.primaryColor,
            marginBottom: 10,
        },
        conversationNumber: {
            fontSize: 18,
            fontWeight: 'bold',
            color: selectedTheme.secondaryColor,
        },
        label: {
            color: selectedTheme.secondaryColor,
        }
    });

    React.useEffect(() => {
        fetch(`http://minikit.pythonanywhere.com/conversations/${conversation.conversation.id}/messages`)
            .then((res) => res.json())
            .then((res) => { if (res.length >= 0) { setMessages(res.reverse())} });
    }, []);

    React.useEffect(() => {
        if (messages.length >= 0) {
            if (messages[0]) {
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
                Alerte ! {conversation.conversation.vehicle.brand} {conversation.conversation.vehicle.color}
            </Text>
            <TouchableOpacity onPress={handlePress}>
                <Text style={styles.label}>
                    {lastMessage}
                </Text>
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <Ionicons onPress={() => setModalVisible(false)} style={[{ paddingTop: 35 }, {height: 70}, styles.label] } name="arrow-back-outline"
                        size={36} color="black" />
                <ConversationScreen
                    messages={messages}
                    vehicle={conversation.conversation.vehicle}
                    conversation_id={conversation.conversation.id}
                >
                </ConversationScreen>
            </Modal>
        </View>
    )
}
