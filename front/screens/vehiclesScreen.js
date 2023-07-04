import React, { useContext, useEffect, useState } from 'react';
import { Button, Dimensions, Modal, ScrollView, Share, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import * as MediaLibrary from 'expo-media-library';
import { useAuth } from '../context/Auth';
import { ALERT } from '../utils/options.helper';
import ThemeContext from '../themes/ThemeContext';
import VehicleQRCode from '../components/qrCode';
import { modifyVehicleState } from '../services/vehicule.service';

export default function VehiclesScreen() {
    const { user } = useAuth();
    const { selectedTheme } = useContext(ThemeContext);
    const [vehicles, setVehicles] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedType, setSelectedType] = useState('voiture');
    const [qrModalVisible, setQrModalVisible] = useState(false);
    const [newVehicleInfo, setNewVehicleInfo] = useState({
        type: selectedType,
        brand: '',
        color: '',
        license_plate: '',
        user_id: user.id,
        state: 'good',
    });
    const [isValid, setIsValid] = useState(false);

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
        card: {
            backgroundColor: selectedTheme.cardColor,
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
            position: 'relative',
            marginRight: 8,
            top: -40,
            left: 300,
        },
        cardContent: {
            flex: 1,
        },
        title: {
            fontSize: 18,
            fontWeight: 'bold',
            marginBottom: 8,
            color: selectedTheme.secondaryColor,
        },
        text: {
            marginBottom: 4,
            color: selectedTheme.secondaryColor,
        },
        buttonContainer: {
            marginVertical: 16,
            backgroundColor: selectedTheme.buttonColor,
            borderRadius: 10,
            padding: 1,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            paddingLeft: 10,
            paddingRight: 10,
        },
        modalContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: selectedTheme.primaryColor,
        },
        modalContent: {
            backgroundColor: selectedTheme.primaryColor,
            borderRadius: 8,
            padding: 16,
            alignItems: 'center',
            width: windowWidth * 0.9,
            maxWidth: 400,
        },
        modalHeader: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 16,
        },
        modalTitle: {
            fontSize: 18,
            fontWeight: 'bold',
            marginBottom: 16,
            color: selectedTheme.secondaryColor,
        },
        input: {
            width: '100%',
            padding: 8,
            marginBottom: 16,
            borderWidth: 1,
            borderColor: '#6b6b6',
            borderRadius: 4,
            color: '#6b6b6b',
        },
        picker: {
            width: '100%',
            marginBottom: 16,
            color: selectedTheme.secondaryColor,
        },
        pickerContainer: {
            width: '100%',
            marginBottom: 16,
        },
        pickerItem: {
            fontSize: 15,
            height: 120,
            color: selectedTheme.secondaryColor,
        },
        stateIndicator: {
            position: 'absolute',
            top: 40,
            left: -27,
            width: 16,
            height: 16,
            borderRadius: 8,
            marginRight: 8,
        },
        qr: {
            position: 'absolute',
            top: 9,
            left: 85,
            color: selectedTheme.buttonColor,
        }
    });

    const getStateColor = (state) => {
        return state == 'good' ? 'green' : 'red';
    };

    const initVehicles = () => {
        getOwnVehicles().then((data) => {
            console.log('data', data)
            setVehicles(data);
        });
    }

    React.useEffect(() => {
        initVehicles();
    }, []);

    const getOwnVehicles = async () => {
        let response = await fetch(
            'http://minikit.pythonanywhere.com/vehicles/user/' + user.id
        );
        let json = await response.json();
        return json;
    };

    const addVehicle = async () => {
        try {
            console.log('newVehicleInfo', newVehicleInfo)
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
                    type: selectedType,
                    brand: '',
                    color: '',
                    license_plate: '',
                    user_id: user.id,
                    state: 'good'
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

    const shareQRCode = async () => {
        try {
            const result = await Share.share({
                message: 'Here is the QR code for my vehicle',
            });

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    console.log('Shared with activity: ' + result.activityType);
                } else {
                    console.log('Shared successfully!');
                }
            } else if (result.action === Share.dismissedAction) {
                console.log('Share dialog was closed');
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    const saveQrToDisk = async (vehicleId) => {
        const { status } = await MediaLibrary.requestPermissionsAsync();

        if (status !== 'granted') {
            alert('Désolé, nous avons besoin des autorisations de la galerie pour faire cela !');
            return;
        }

        // Nous recherchons le QRCode associé au véhicule
        const qrCodeRef = qrCodesRef[vehicleId];

        if (qrCodeRef) {
            const uri = await qrCodeRef.toDataURL();
            const asset = await MediaLibrary.createAssetAsync(`data:image/png;base64,${uri}`);

            await MediaLibrary.createAlbumAsync('QR Codes', asset, false)
                .then(() => {
                    alert('Le QR Code a été sauvegardé dans la galerie !');
                })
                .catch((error) => {
                    console.log('err', error);
                });
        }
    };

    const qrCodesRef = vehicles.reduce((refs, vehicle) => {
        // Nous créons une ref pour chaque véhicule
        refs[vehicle.id] = React.createRef();
        return refs;
    }, {});

    /*const handleChangeState = async (lp) => {
        const test = await modifyVehicleState(lp, 'alert');
        initVehicles();
        console.log(test);
    }*/


    <Button color={"white"} title="Télécharger" onPress={() => saveQrToDisk(data.id)} />


    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                <Text style={styles.title}>Vos véhicules</Text>
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
                            <View style={[styles.stateIndicator, { backgroundColor: getStateColor(data.state) }]} />
                            {data.state === 'good' &&
                                <TouchableOpacity onPress={() => handleChangeState(data.license_plate)} style={[styles.buttonContainer]}>
                                    <Text style={{color: '#fff'}}>Problème résolu</Text>
                                </TouchableOpacity>}
                            <Text style={styles.text}>Type: {data.type}</Text>
                            <Text style={styles.text}>Color: {data.color}</Text>
                            <Text style={styles.text}>License Plate: {data.license_plate}</Text>
                            <View>
                                <Ionicons style={styles.qr} name={'qr-code-outline'} size={20} />
                                <Button
                                    title="QR Code"
                                    color={selectedTheme.buttonColor}
                                    onPress={() => {
                                        console.log('data.id:', data.id);
                                        setQrModalVisible(true);
                                    }}
                                >

                                </Button>
                            </View>


                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={qrModalVisible}
                                onRequestClose={() => setQrModalVisible(false)}
                            >
                                <VehicleQRCode vehicleId={data.id} styles={styles} setQrModalVisible={setQrModalVisible} />
                            </Modal>

                        </View>

                    </View>
                ))}
                <View style={styles.buttonContainer}>
                    <Ionicons name="add-outline" size={30} color={"white"} />
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
                        <View style={styles.modalHeader}>
                            <Ionicons name={'car-outline'} size={30} />
                            <Text style={styles.modalTitle}>Ajouter un véhicule</Text>
                        </View>

                        <TextInput
                            placeholderTextColor={'#6b6b6b'}
                            style={styles.input}
                            placeholder="Brand"
                            value={newVehicleInfo.brand}
                            onChangeText={(text) => setNewVehicleInfo({ ...newVehicleInfo, brand: text })}
                        />
                        <TextInput
                            placeholderTextColor={'#6b6b6b'}
                            style={styles.input}
                            placeholder="Color"
                            value={newVehicleInfo.color}
                            onChangeText={(text) => setNewVehicleInfo({ ...newVehicleInfo, color: text })}
                        />
                        <View style={styles.pickerContainer}>
                            <Picker
                                selectedValue={newVehicleInfo.type}
                                onValueChange={(itemValue) => {
                                    setNewVehicleInfo({ ...newVehicleInfo, type: itemValue })

                                }}
                                style={styles.picker}
                                itemStyle={styles.pickerItem}
                            >
                                {/* Options de type */}
                                <Picker.Item label="Voiture" value="voiture" />
                                <Picker.Item label="Vélo" value="velo" />
                                <Picker.Item label="Trotinette" value="trotinette" />
                            </Picker>
                        </View>
                        {newVehicleInfo.type === 'voiture' && (
                            <TextInput
                                placeholderTextColor={'#6b6b6b'}
                                style={styles.input}
                                placeholder="License Plate"
                                value={newVehicleInfo.license_plate}
                                onChangeText={(text) => {
                                    setNewVehicleInfo({...newVehicleInfo, license_plate: text});
                                    const validateInput = text => {
                                        if (text.trim() !== '') {
                                            setIsValid(true);
                                        } else {
                                            setIsValid(false);
                                        }
                                    };
                                    validateInput(text);
                                }}
                            />
                        )}
                        <View style={styles.buttonContainer}>
                            <Button
                                color={"white"}
                                title="Ajouter"
                                disabled={!isValid && newVehicleInfo.type === 'voiture'}
                                onPress={addVehicle} />
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