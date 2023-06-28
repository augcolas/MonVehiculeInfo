import QRCode from 'react-native-qrcode-svg';
import {SvgXml} from 'react-native-svg';

export default function VehicleQRCode ({vehicleId}) {

    const value = `vehiculeId: ${vehicleId}`;

    return (
        <QRCode
            value={value}
            logoSize={100}
            logoBackgroundColor='transparent'
            color='black'
            logo={require('../assets/logo.png')}
        />
    );
};

