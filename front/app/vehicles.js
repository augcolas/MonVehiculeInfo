import {StyleSheet, Text, View} from 'react-native';
import Navbar from "../components/navbar";
import React from "react";
import {useRouter, useSegments} from "expo-router";

export default function Page() {
    const segments = useSegments()[0];

    const [vehicles, setVehicles] = React.useState([]);

    React.useEffect(() => {
        getOwnVehicles().then((data) => {
            setVehicles(data);
        });
    },[]);
    return (
        <View style={styles.container}>
            <Text>Vehicles</Text>
            {
                vehicles.map((data) => {
                    return (
                        <Text key={data.id}>{data.license_plate}</Text>
                    )
                })
            }
            <Navbar route={segments}></Navbar>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

const getOwnVehicles = async () => {
    let response = await fetch(
        'http://minikit.pythonanywhere.com/vehicles/user/1'
    );
    let json = await response.json();
    return json;
};