import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import UserConversation from "../components/UserConversation";
import { useAuth } from "../context/Auth";
import {useContext} from "react";
import ThemeContext from "../themes/ThemeContext";

export default function HistoricScreen() {
    const [conversations, setConversations] = React.useState([]);
    const { user } = useAuth();
    const { selectedTheme } = useContext(ThemeContext);


    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: selectedTheme.primaryColor,
            alignItems: 'center',
            justifyContent: 'center',
        },
        scrollViewContainer: {
            alignItems: 'center',
            flexGrow: 1,
            paddingTop: 50,
            paddingBottom: 100,
        },
        title: {
            fontSize: 18,
            fontWeight: 'bold',
            marginBottom: 8,
            color: selectedTheme.secondaryColor,
        },
    });

    const getConversations = async () => {
        const response = await fetch('http://minikit.pythonanywhere.com/conversations/user/' + user.id);
        const json = await response.json();
        setConversations(json);
    }

    React.useEffect(() => {
        getConversations();
        const interval = setInterval(() => {
            getConversations();
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                <Text style={[styles.title, {marginTop: 20}]}>Vos messages</Text>
                {conversations.map((conversation, index) => (
                    <View key={index}>
                        <UserConversation conversation={conversation} />
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

