import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import MessageCard from '../components/messageCard';
import { createMessage, getMessages } from '../services/conversation.service';
import { useAuth } from '../context/Auth';

const ConversationScreen = ({ conversation_id, plaque }) => {
    const [messages, setMessages] = useState([]);
    const [messageToSend, setMessageToSend] = useState('');
    const { user } = useAuth();

    useEffect(() => {
        loadMessages();
        // Vérifier les nouveaux messages toutes les 5 secondes
        const interval = setInterval(loadMessages, 5000);
        return () => clearInterval(interval);
    }, []);

    const loadMessages = async () => {
        try {
            fetch(`http://minikit.pythonanywhere.com/conversations/${conversation_id}/messages`)
                .then((res) => res.json())
                .then((res) => { if (res.length >= 0) { setMessages(res.reverse()) } });
        } catch (error) {
            console.error('Failed to load messages:', error);
        }
    };

    const renderMessageCard = ({ item }) => (
        <MessageCard message={item.content} isReceived={item.user_id !== user.id} />
    );

    const handleChange = (text) => {
        setMessageToSend(text);
    };

    const handlePress = async () => {
        try {
            await createMessage(conversation_id, messageToSend, user.id);
            setMessageToSend('');
        } catch (error) {
            console.error('Failed to send message:', error);
        }
        loadMessages();
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.conversationNumber}>
                    {`Conversation # ${conversation_id}`}
                </Text>
                <Text>{`Plaque # ${plaque}`}</Text>
            </View>
            <FlatList
                inverted
                data={messages}
                renderItem={renderMessageCard}
                keyExtractor={(item) => item.id.toString()}
            />
            <View style={styles.messageInputContainer}>
                <TextInput
                    style={styles.messageInput}
                    placeholder="Type your message..."
                    value={messageToSend}
                    onChangeText={handleChange}
                />
                <TouchableOpacity style={styles.sendButton} onPress={handlePress}>
                    <Text style={styles.sendButtonText}>Envoyer</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
    },
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
    messageInputContainer: {
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        paddingTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    messageInput: {
        flex: 1,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginRight: 10,
    },
    sendButton: {
        backgroundColor: '#007AFF',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 5,
    },
    sendButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default ConversationScreen;
