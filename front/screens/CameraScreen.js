import React, {useEffect, useRef, useState} from 'react';
import {
    ActivityIndicator,
    Alert,
    Button,
    Dimensions,
    Modal,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import {Camera} from 'expo-camera';
import * as FileSystem from 'expo-file-system';
import * as ImageManipulator from 'expo-image-manipulator';
import RectangleCorners from "../components/rectangleCorners";
import {Picker} from "@react-native-picker/picker";
import ModalAlert from "../components/modalAlert";
import ThemeContext from "../themes/ThemeContext";
import {useContext} from "react";
import {Ionicons} from "@expo/vector-icons";

export default function CameraScreen() {
    const [hasPermission, setHasPermission] = useState(null);
    const [ratio, setRatio] = useState('4:3');
    const cameraRef = useRef(null);
    const [detectedPlate, setDetectedPlate] = useState('');
    const [contact, setContact] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [scannedQR, setScannedQR] = useState(null);
    const [modalVisible, setModalVisible] = React.useState(false);

    const { selectedTheme } = useContext(ThemeContext);

    const styles = StyleSheet.create({
        camera: {
            flex: 1,
            width: '100%',
        },
        captureButton: {
            position: 'absolute',
            bottom: '15%',
            alignSelf: 'center',
            padding: 10,
            backgroundColor: selectedTheme.buttonColor,
            borderRadius: 8,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
        },
        buttonText: {
            color: 'white',
            fontSize: 18,
        },
        plateText: {
            position: 'absolute',
            bottom: '10%',
            alignSelf: 'center',
            color: 'white',
            fontSize: 18,
        },
        loader: {
            position: 'absolute',
            top: '60%',
            left: '50%',
            marginTop: -80,
            marginLeft: -15,
        },
        activityIndicator: {
            transform: [{ scale: 2 }],
        },
        qrText: {
            position: 'absolute',
            bottom: '5%',
            alignSelf: 'center',
            color: 'white',
            fontSize: 18,
        },modalContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            marginBottom: 100,
        },
        modalContent: {
            backgroundColor: selectedTheme.primaryColor,
            borderRadius: 8,
            padding: 16,
            alignItems: 'center',
            width: windowWidth * 0.9,
            maxWidth: 300,
        },
        modalTitle: {
            fontSize: 18,
            fontWeight: 'bold',
            marginBottom: 16,
        },
        modalText: {
            fontSize: 20,
            marginBottom: 20,
        },
        scan:{
            marginRight: 10,
        }
    });


    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();

    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        const prefix = 'vehiculeId: ';

        if (data.startsWith(prefix)) {
            const vehicleId = data.slice(prefix.length);

            setScannedQR(vehicleId);
        } else {
            setDetectedPlate("QR code invalide");
        }
    }
    const handleScanPlate = async () => {
        if (cameraRef.current) {
            setIsLoading(true);
            setDetectedPlate('');

            let photo = await cameraRef.current.takePictureAsync();
            let resizedPhoto = await ImageManipulator.manipulateAsync(
                photo.uri,
                [{ resize: { width: 1024, height: 768 } }],
                { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
            );

            let fileInfo = await FileSystem.getInfoAsync(resizedPhoto.uri);
            if (fileInfo.size > 3 * 1024 * 1024) {
                console.error('File size is too large');
                return;
            }

            let form = new FormData();
            form.append('upload', {
                uri: resizedPhoto.uri,
                type: 'image/jpeg',
                name: 'upload.jpg',
            });
            form.append('regions', 'fr'); // Change to your country

            fetch("https://api.platerecognizer.com/v1/plate-reader/", {
                method: "POST",
                headers: {
                    'Authorization': 'Token b8aaed1bbccb04d8e32a55147bf3e563ddf971e1',
                },
                body: form,
            })
            .then((response) => response.json())
            .then(async (json) => {
                let license_plate = ""
                if (json.results && json.results.length > 0) {
                    let plate = json.results[0].plate;
                    let regex = /^[A-Z]{2}\d{3}[A-Z]{2}$/i;
                    if (regex.test(plate)) {
                        license_plate = plate.toUpperCase().replace(/(\w{2})(\d{3})(\w{2})/, "$1-$2-$3");
                        setDetectedPlate(plate.toUpperCase().replace(/(\w{2})(\d{3})(\w{2})/, "$1-$2-$3"));
                    } else {
                        license_plate = plate.toUpperCase();
                        setDetectedPlate(plate.toUpperCase());
                    }
                } else {
                    //setDetectedPlate('Aucune plaque détectée');
                    license_plate = 'PLAQUE';
                    setDetectedPlate('PLAQUE');
                }

                //getting the contact infos
                const response1 = await fetch(
                    `http://minikit.pythonanywhere.com/user/get_by_license_plate/${license_plate}`
                );
                const contact1 = await response1.json();
                console.log(contact1)
                if(contact1.id == null){
                    Alert.alert("Avertissement", "Ce véhicule n'est pas enregistré dans notre base de données");
                    setIsLoading(false);
                    return
                }

                setContact(contact1);

                setModalVisible(true)
                setIsLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setIsLoading(false);
            });

        }
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <Camera
            style={styles.camera}
            type={Camera.Constants.Type.back}
            ref={cameraRef}
            ratio={ratio}
            onBarCodeScanned={scannedQR ? undefined : handleBarCodeScanned}
        >
            {isLoading ? (
                <View style={styles.loader}>
                    <ActivityIndicator size='large' color='rgba(255,255,255,0.5)' style={styles.activityIndicator} />
                </View>
            ) : <RectangleCorners />}
            <TouchableOpacity onPress={handleScanPlate} style={styles.captureButton}>
                <Ionicons name={'scan-outline'} size={24} color={'white'} style={styles.scan}/>
                <Text style={styles.buttonText}>Scanner une plaque</Text>
            </TouchableOpacity>
            {detectedPlate && (
                <Text style={styles.plateText}>dernier scan : "{detectedPlate}"</Text>
            )}

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>

                        {contact != null && contact.id != null &&(
                                <ModalAlert license_plate={detectedPlate} contact={contact}></ModalAlert>
                        )}
                        <Button onPress={() => setModalVisible(false)}  title={"Annuler"} color={selectedTheme.buttonColor}></Button>
                    </View>
                </View>
            </Modal>
        </Camera>
    );
}
const windowWidth = Dimensions.get('window').width;


const styles = StyleSheet.create({
    camera: {
        flex: 1,
        width: '100%',
    },
    captureButton: {
        position: 'absolute',
        bottom: '15%',
        alignSelf: 'center',
        padding: 10,
        backgroundColor: '#2ec530',
        borderRadius: 8,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
    },
    plateText: {
        position: 'absolute',
        bottom: '10%',
        alignSelf: 'center',
        color: 'white',
        fontSize: 18,
    },
    loader: {
        position: 'absolute',
        top: '60%',
        left: '50%',
        marginTop: -80,
        marginLeft: -15,
    },
    activityIndicator: {
        transform: [{ scale: 2 }],
    },
    qrText: {
        position: 'absolute',
        bottom: '5%',
        alignSelf: 'center',
        color: 'white',
        fontSize: 18,
    },modalContainer: {
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
        maxWidth: 300,
        marginBottom: 100,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    modalText: {
        fontSize: 20,
        marginBottom: 20,
    },
    scan:{
        marginRight: 10,
    }
});