import { Button, StyleSheet, TextInput, View } from "react-native";
import { ALERT } from "../utils/options.helper";
import {useState} from "react";
import {useAuth} from "../context/Auth";

const AlertMessageForm = ({ option, licensePlate }) => {
    const {authUser} = useAuth();
    const [message,setMessage] = useState(ALERT.replace("{option}", option).replace("{licensePlate}", licensePlate))
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
                        onPress={() => {
                            console.log(message)
                            const contact_id = fetch(
                                'http://minikit.pythonanywhere.com/users/license_plate/'+licensePlate
                            )
                            const response = fetch(
                                'http://minikit.pythonanywhere.com/conversations/exist?user_id='+authUser.id+'&contact_id='
                            );
                        }}>
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