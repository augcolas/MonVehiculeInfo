import QRCode from 'react-native-qrcode-svg';
import {SvgXml} from 'react-native-svg';

const VehicleQRCode = ({vehicleId}) => {
    const logo = `<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
 width="480.000000pt" height="480.000000pt" viewBox="0 0 480.000000 480.000000"
 preserveAspectRatio="xMidYMid meet">

<g transform="translate(0.000000,480.000000) scale(0.100000,-0.100000)"
fill="#000000" stroke="none">
<path d="M1012 3372 l3 -567 220 -167 c121 -92 223 -167 227 -167 4 -1 9 167
10 372 l3 374 460 -213 c443 -204 461 -212 490 -199 16 7 218 101 449 209 230
108 422 196 427 196 5 0 10 -163 11 -369 l3 -369 227 171 228 172 0 562 0 562
-62 -28 c-35 -16 -344 -160 -688 -320 l-624 -292 -621 287 c-341 158 -653 302
-693 320 l-72 34 2 -568z"/>
<path d="M3119 2003 c-721 -545 -724 -547 -745 -539 -8 3 -314 232 -680 508
-366 277 -669 505 -675 506 -5 2 -9 -108 -9 -280 l1 -283 207 -156 c114 -86
277 -210 362 -274 85 -65 238 -181 340 -258 102 -78 246 -187 321 -244 l137
-104 548 408 c302 225 615 458 697 518 l147 109 0 288 c0 159 -2 288 -3 288
-2 0 -294 -219 -648 -487z"/>
</g>`;
    const value = `vehicule: ${vehicleId}`;

    return (
        <QRCode
            value={value}
            logoSize={30}
            logoBackgroundColor='transparent'
            color='black'
            logo={<SvgXml xml={logo} width="100%" height="100%" />}
        />
    );
};

export default VehicleQRCode;