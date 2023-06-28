import React, {useEffect, useRef, useState} from 'react';
import {ActivityIndicator, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Camera} from 'expo-camera';
import * as FileSystem from 'expo-file-system';
import * as ImageManipulator from 'expo-image-manipulator';
import RectangleCorners from "../components/rectangleCorners";

export default function CameraScreen() {
    const [hasPermission, setHasPermission] = useState(null);
    const [ratio, setRatio] = useState('4:3');
    const cameraRef = useRef(null);
    const [detectedPlate, setDetectedPlate] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [scannedQR, setScannedQR] = useState(null);


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
                .then((json) => {
                    if (json.results && json.results.length > 0) {
                        let plate = json.results[0].plate;
                        let regex = /^[A-Z]{2}\d{3}[A-Z]{2}$/i;
                        if (regex.test(plate)) {
                            setDetectedPlate(plate.toUpperCase().replace(/(\w{2})(\d{3})(\w{2})/, "$1-$2-$3"));
                        } else {
                            setDetectedPlate(plate.toUpperCase());
                        }
                    } else {
                        setDetectedPlate('Aucune plaque détectée');
                    }
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
                <Text style={styles.buttonText}>Scanner une plaque</Text>
            </TouchableOpacity>
            {detectedPlate && (
                <Text style={styles.plateText}>{detectedPlate}</Text>
            )}
        </Camera>
    );
}

const styles = StyleSheet.create({
    camera: {
        flex: 1,
        width: '100%',
    },
    captureButton: {
        position: 'absolute',
        bottom: '25%',
        alignSelf: 'center',
        padding: 10,
        backgroundColor: '#2196F3',
        borderRadius: 8,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
    },
    plateText: {
        position: 'absolute',
        bottom: '20%',
        alignSelf: 'center',
        color: 'white',
        fontSize: 18,
    },
    loader: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -80,
        marginLeft: -15,
    },
    activityIndicator: {
        transform: [{ scale: 2 }],
    },
    qrText: {
        position: 'absolute',
        bottom: '15%',
        alignSelf: 'center',
        color: 'white',
        fontSize: 18,
    },
});
