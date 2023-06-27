import {Ionicons} from '@expo/vector-icons';
import { StyleSheet, Text, View, Button, ScrollView, Dimensions, TouchableOpacity, Modal, TextInput } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import React from "react";

export default function VehiclesScreen() {
    const [vehicles, setVehicles] = React.useState([]);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [selectedType, setSelectedType] = React.useState('voiture');
    const [newVehicleInfo, setNewVehicleInfo] = React.useState({
        type: selectedType,
        brand: '',
        color: '',
        license_plate: '',
        user_id: 1
    });

    React.useEffect(() => {
        getOwnVehicles().then((data) => {
            setVehicles(data);
        });
    },[]);

    const getOwnVehicles = async () => {
        let response = await fetch(
            'http://minikit.pythonanywhere.com/vehicles/user/1'
        );
        let json = await response.json();
        return json;
    };

    const addVehicle = async () => {
        try {
            console.log('newVehicleInfo',newVehicleInfo)
            const response = await fetch('http://minikit.pythonanywhere.com/vehicles', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newVehicleInfo)
            });

            if (response.ok) {
                //updating display and cleaning states
                const addedVehicle = await response.json();
                setVehicles([...vehicles, addedVehicle]);
                setModalVisible(false);
                setNewVehicleInfo({
                    type: '',
                    brand: '',
                    color: '',
                    license_plate: '',
                    user_id: 1
                });
            } else {
                console.error('Failed to add vehicle');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const deleteVehicle = async (vehicleId) => {
        try {
            const response = await fetch(`http://minikit.pythonanywhere.com/vehicles/${vehicleId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setVehicles(vehicles.filter((vehicle) => vehicle.id !== vehicleId));
            } else {
                console.error('Failed to delete vehicle');
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
                        <TouchableOpacity
                            style={styles.deleteButton}
                            onPress={() => deleteVehicle(data.id)}
                        >
                            <Ionicons name="close" size={24} color="black" />
                        </TouchableOpacity>
                        <View style={styles.cardContent}>
                            <Text style={styles.title}>{data.brand}</Text>
                            <Text style={styles.text}>Type: {data.type}</Text>
                            <Text style={styles.text}>Color: {data.color}</Text>
                            <Text style={styles.text}>License Plate: {data.license_plate}</Text>
                            <Text style={styles.text}>ID: {data.id}</Text>
                            <Text style={styles.text}>User ID: {data.user_id}</Text>
                        </View>
                    </View>
                ))}
                <View style={styles.buttonContainer}>
                    <Button color={"white"} title="Ajouter un véhicule" onPress={() => setModalVisible(true)} />
                </View>
            </ScrollView>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Ajouter un véhicule</Text>
                        <View style={styles.pickerContainer}>
                            <Picker
                                selectedValue={newVehicleInfo.type}
                                onValueChange={(itemValue) =>{
                                    setNewVehicleInfo({...newVehicleInfo, type: itemValue})

                                }}
                                style={styles.picker}
                            >
                                {/* Options de type */}
                                <Picker.Item label="Voiture" value="voiture" />
                                <Picker.Item label="Vélo" value="velo" />
                                <Picker.Item label="Trotinette" value="trotinette" />
                            </Picker>
                        </View>
                        <TextInput
                            style={styles.input}
                            placeholder="Brand"
                            value={newVehicleInfo.brand}
                            onChangeText={(text) => setNewVehicleInfo({...newVehicleInfo, brand: text})}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Color"
                            value={newVehicleInfo.color}
                            onChangeText={(text) => setNewVehicleInfo({...newVehicleInfo, color: text})}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="License Plate"
                            value={newVehicleInfo.license_plate}
                            onChangeText={(text) => setNewVehicleInfo({...newVehicleInfo, license_plate: text})}
                        />
                        <View style={styles.buttonContainer}>
                            <Button color={"white"} title="Ajouter" onPress={addVehicle} />
                        </View>
                        <View style={styles.buttonContainer}>
                            <Button color={"white"} title="Annuler" onPress={() => setModalVisible(false)} />
                        </View>
                    </View>
                </View>
            </Modal>
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
        alignItems: 'center',
        flexGrow: 1,
        paddingTop: 50,
        paddingBottom: 100,
    },
    card: {
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        padding: 16,
        marginVertical: 8,
        width: windowWidth * 0.9,
        maxWidth: 400,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    deleteButton: {
        marginRight: 8,
    },
    cardContent: {
        flex: 1,
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
        backgroundColor: '#36e038',
        borderRadius: 10,
        padding: 1,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        alignItems: 'center',
        width: windowWidth * 0.9,
        maxWidth: 400,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    input: {
        width: '100%',
        padding: 8,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
    },
    picker: {
        width: '100%',
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
    },
    pickerContainer: {
        width: '50%', // Ajustez la largeur selon vos préférences
        marginBottom: 16,
    }
});
