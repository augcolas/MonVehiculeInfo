import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import MessageCard from '../components/messageCard';

const ConversationScreen = ({messages, plaque, conversation_id}) => {


    renderMessageCard = ({ item }) => (
        <MessageCard message={item.content} isReceived={item.isReceived} />
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.conversationNumber}>
                    {`Conversation # ${conversation_id}`}
                </Text>
                <Text>
                {`Plaque # ${plaque}`}
                </Text>
            </View>
            <FlatList
                inverted
                data={messages.reverse()}
                renderItem={renderMessageCard}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
}

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
});

export default ConversationScreen;
