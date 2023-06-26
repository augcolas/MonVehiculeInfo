import {StyleSheet, View} from 'react-native';
import Navbar from "../components/navbar";
import CameraView from "../components/camPage";
import {useSegments} from "expo-router";
import React from "react";

export default function Page() {
    const segments = useSegments()[0];
  return (
      <View style={styles.container}>
          <CameraView></CameraView>
          <Navbar route={segments}></Navbar>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
