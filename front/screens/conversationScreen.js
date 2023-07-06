import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import MessageCard from '../components/messageCard';
import { createMessage, getMessages } from '../services/conversation.service';
import { useAuth } from '../context/Auth';
import {useContext} from "react";
import ThemeContext from "../themes/ThemeContext";

const ConversationScreen = ({ conversation_id, vehicle }) => {
    const [messages, setMessages] = useState([]);
    const [messageToSend, setMessageToSend] = useState('');
    const { user } = useAuth();
    const { selectedTheme } = useContext(ThemeContext);

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            padding: 10,
            backgroundColor: selectedTheme.primaryColor,
        },
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
        messageInputContainer: {
            borderTopWidth: 1,
            paddingBottom: 40,
            borderTopColor: selectedTheme.cardColor,
            paddingTop: 10,
            flexDirection: 'row',
            alignItems: 'center',
        },
        messageInput: {
            flex: 1,
            height: 40,
            borderColor: selectedTheme.cardColor,
            borderWidth: 1,
            borderRadius: 5,
            paddingHorizontal: 10,
            marginRight: 10,
            color: selectedTheme.secondaryColor,
        },
        sendButton: {
            backgroundColor: selectedTheme.buttonColor,
            paddingHorizontal: 12,
            paddingVertical: 8,
            borderRadius: 5,
        },
        sendButtonText: {
            color: '#fff',
            fontWeight: 'bold',
        },
        label: {
            color: selectedTheme.secondaryColor,
        }
    });

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
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <View style={styles.header}>
                <Text style={styles.conversationNumber}>
                    {`Alerte # ${conversation_id}`}
                </Text>
                <Text>{`${vehicle.brand} ${vehicle.color}`}</Text>
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
        </KeyboardAvoidingView>
    );

};

export default ConversationScreen;
