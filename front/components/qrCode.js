import React, { useRef } from 'react';
import QRCode from 'react-native-qrcode-svg';
import {Button, Text, View} from "react-native";
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';


function VehicleQRCode({vehicleId, styles, setQrModalVisible}) {
    const value = `vehiculeId: ${vehicleId}`;
    let qrCode = useRef(null);

    const saveQrToDisk = async () => {
        // Check for permissions
        const { status } = await MediaLibrary.requestPermissionsAsync();
        if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
        } else {
            qrCode.toDataURL((dataURL) => {
                let date = new Date();
                let path = FileSystem.documentDirectory + "qr_" + Math.floor(date.getTime() + date.getSeconds() / 2) + ".png";
                FileSystem.writeAsStringAsync(path, dataURL, { encoding: FileSystem.EncodingType.Base64 })
                    .then(async () => {
                        const asset = await MediaLibrary.createAssetAsync(path);
                        await MediaLibrary.createAlbumAsync('MediaLibrary/Default', asset, false);
                    })
                    .catch((error) => {
                        console.error('Error saving QR to disk ', error);
                    });
            });
        }
    };


    return (
        <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Partager mon QR Code</Text>
                <QRCode
                    getRef={(c) => (qrCode = c)}
                    value={value}
                    size={150}
                    color={selectedTheme.buttonColor}
                    backgroundColor='white'
                    logo={require('../assets/logo_green.png')}
                    logoSize={30}
                    logoBackgroundColor='white'
                />
                <View style={styles.buttonContainer} >
                    <Button color={"white"} title="Télécharger" onPress={saveQrToDisk} />
                </View>
                <View style={styles.buttonContainer}>
                    <Button color={"white"} title="Fermer" onPress={() => setQrModalVisible(false)} />
                </View>
            </View>
        </View>
    );
}

export default VehicleQRCode;
