import React, { useState, useEffect, useRef } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Camera } from 'expo-camera';
import * as FileSystem from 'expo-file-system';
import { encode as btoa } from 'base-64';
import * as ImageManipulator from 'expo-image-manipulator';

export default function App() {
    const [hasPermission, setHasPermission] = useState(null);
    const [ratio, setRatio] = useState('4:3');  // Set initial ratio
    const cameraRef = useRef(null);
    const [detectedPlate, setDetectedPlate] = useState('');

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();

    }, []);

    const handleScanPlate = async () => {
        if (cameraRef.current) {
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
                    'Authorization': 'Token b8aaed1bbccb04d8e32a55147bf3e563ddf971e1',  // Replace with your token
                },
                body: form,
            })
                .then((response) => response.json())
                .then((json) => {
                    if (json.results && json.results.length > 0) {
                        let plate = json.results[0].plate;
                        setDetectedPlate(plate);  // Update the detectedPlate state
                    } else {
                        setDetectedPlate('Aucune plaque détectée');
                    }
                })
                .catch((error) => console.error(error));
        }
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <Camera style={styles.camera} type={Camera.Constants.Type.back} ref={cameraRef} ratio={ratio}>
            <View style={styles.topLeftCorner} />
            <View style={styles.topRightCorner} />
            <View style={styles.bottomLeftCorner} />
            <View style={styles.bottomRightCorner} />
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
    topLeftCorner: {
        position: 'absolute',
        top: '35%',
        left: '7%',
        width: 30,
        height: 30,
        borderTopWidth: 2,
        borderLeftWidth: 2,
        borderColor: 'white',
    },
    topRightCorner: {
        position: 'absolute',
        top: '35%',
        right: '7%',
        width: 30,
        height: 30,
        borderTopWidth: 2,
        borderRightWidth: 2,
        borderColor: 'white',
    },
    bottomLeftCorner: {
        position: 'absolute',
        bottom: '50%',
        left: '7%',
        width: 30,
        height: 30,
        borderBottomWidth: 2,
        borderLeftWidth: 2,
        borderColor: 'white',
    },
    bottomRightCorner: {
        position: 'absolute',
        bottom: '50%',
        right: '7%',
        width: 30,
        height: 30,
        borderBottomWidth: 2,
        borderRightWidth: 2,
        borderColor: 'white',
    },
    captureButton: {
        position: 'absolute',
        bottom: '25%', // Adjust this value as needed
        alignSelf: 'center',
        padding: 10,
        backgroundColor: '#2196F3', // You can customize the color of the button
        borderRadius: 8,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
    },
    plateText: {
        position: 'absolute',
        bottom: '20%', // Adjust this value as needed
        alignSelf: 'center',
        color: 'white',
        fontSize: 18,
    },
});
