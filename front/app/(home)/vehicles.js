import {View} from "react-native";

export default function Page() {
    return (
        <View style={styles.container}>
            <Text>VEHICLES</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
