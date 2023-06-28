import React from 'react';
import QRCode from 'react-native-qrcode-svg';

function VehicleQRCode({vehicleId}, ref) {
    const value = `vehiculeId: ${vehicleId}`;

    return (
        <QRCode
            value={value}
            size={150}
            color='#58A1D9'
            backgroundColor='white'
            logo={require('../assets/logo_blue.png')}
            logoSize={30}
            logoBackgroundColor='white'
            getRef={ref} // Nous passons la ref ici
        />
    );
};

export default React.forwardRef(VehicleQRCode);
