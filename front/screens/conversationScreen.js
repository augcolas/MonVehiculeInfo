import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import MessageCard from '../components/messageCard';

class ConversationScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [
                { id: 1, content: 'Hello!', isReceived: true },
                { id: 2, content: 'Hi there!', isReceived: true },
                { id: 3, content: 'Test', isReceived: true },
                { id: 4, content: 'TG!', isReceived: false },
                { id: 5, content: 'How are you?', isReceived: true },
                { id: 6, content: "I'm good, thanks!", isReceived: false },
                { id: 7, content: 'What are you up to?', isReceived: false },
                { id: 8, content: 'Just working on a project.', isReceived: true },
                { id: 9, content: 'Sounds interesting. Tell me more about it.', isReceived: false },
                { id: 10, content: "Sure, it's a web development project.", isReceived: true },
                { id: 11, content: 'Have you made any progress?', isReceived: false },
                { id: 12, content: "Yes, I've completed the frontend part.", isReceived: true },
                { id: 13, content: "That's great! How about the backend?", isReceived: false },
                { id: 14, content: "I'm still working on it. It's taking longer than expected.", isReceived: true },
                { id: 15, content: "Don't worry, take your time.", isReceived: false },
                { id: 16, content: 'Thanks for understanding!', isReceived: true },
                { id: 17, content: 'By the way, did you watch the latest movie?', isReceived: false },
                { id: 18, content: 'No, not yet. Is it good?', isReceived: true },
                { id: 19, content: 'I loved it! You should definitely watch it.', isReceived: false },
                { id: 20, content: "I'll check it out. Thanks for the recommendation!", isReceived: true },
                // ... add more messages here
            ],

            conversationNumber: 42, // Numéro de conversation
            plaqueNumber: '567JKJKA90'
        };
    }

    renderMessageCard = ({ item }) => (
        <MessageCard message={item.content} isReceived={item.isReceived} />
    );

    renderHeader = () => (
        <View style={styles.header}>
            <Text style={styles.conversationNumber}>
                Conversation #{this.state.conversationNumber}
            </Text>
            <Text>
                Plaque: {this.state.plaqueNumber}
            </Text>
        </View>
    );

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    stickyHeaderIndices={[0]}
                    ListHeaderComponent={this.renderHeader}
                    data={this.state.messages}
                    renderItem={this.renderMessageCard}
                    keyExtractor={(item) => item.id.toString()}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f5f5f5',
    },
    header: {
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginBottom: 10,
    },
    conversationNumber: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default ConversationScreen;
