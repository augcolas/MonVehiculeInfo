import React from 'react';
import { View } from 'react-native';

export default function RectangleCorners() {
    return (
        <>
            <View style={styles.topLeftCorner} />
            <View style={styles.topRightCorner} />
            <View style={styles.bottomLeftCorner} />
            <View style={styles.bottomRightCorner} />
        </>
    );
}

const styles = {
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
};
