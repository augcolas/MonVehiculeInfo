import {Button, Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useEffect, useState} from "react";

export default function VehiclesScreen() {
    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        getOwnVehicles().then((data) => {
            setVehicles(data);
        });
    },[]);

    const addVehicle = async () => {
        const newVehicle = {
            type: 'Type',
            brand: 'Brand',
            color: 'Color',
            license_plate: 'License Plate',
            user_id: 1
        };

        try {
            const response = await fetch('http://minikit.pythonanywhere.com/vehicles', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newVehicle)
            });

            if (response.ok) {
                const addedVehicle = await response.json();
                setVehicles([...vehicles, addedVehicle]);
            } else {
                console.error('Failed to add vehicle');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>

                {vehicles.map((data) => (
                    <View style={styles.card} key={data.id}>
                        <Text style={styles.title}>{data.brand}</Text>
                        <Text style={styles.text}>Type: {data.type}</Text>
                        <Text style={styles.text}>Color: {data.color}</Text>
                        <Text style={styles.text}>License Plate: {data.license_plate}</Text>
                        <Text style={styles.text}>ID: {data.id}</Text>
                        <Text style={styles.text}>User ID: {data.user_id}</Text>
                    </View>
                ))}
                <View style={styles.buttonContainer}>
                    <Button title="Ajouter un véhicule" onPress={addVehicle} />
                </View>
            </ScrollView>
        </View>
    );
}

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollViewContainer: {
        paddingTop: 50,
        paddingBottom: 100,
        alignItems: 'center',
        flexGrow: 1,
    },
    card: {
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        padding: 16,
        marginVertical: 8,
        width: windowWidth * 0.9,
        maxWidth: 400,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    text: {
        marginBottom: 4,
    },
    buttonContainer: {
        marginVertical: 16,
    },
});

const getOwnVehicles = async () => {
    let response = await fetch(
        'http://minikit.pythonanywhere.com/vehicles/user/1'
    );
    let json = await response.json();
    return json;
};
