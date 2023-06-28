import { Button, StyleSheet, TextInput, View } from "react-native";
import { ALERT } from "../utils/options.helper";

const AlertMessageForm = ({ option, licensePlate }) => {
    const message = ALERT.replace("{option}", option).replace("{licensePlate}", licensePlate);
    return (
        <>
            <TextInput
                style={styles.input}
                value={message}
                editable={false}
            />
            <View style={styles.button}>
                <Button title="ENVOYER"></Button>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    input: {
        width: 700,
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    button: {
        marginLeft: 100,
        maxWidth: 200
    },
});

export default AlertMessageForm; 