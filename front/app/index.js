import {StyleSheet, View} from 'react-native';
import Navbar from "../components/navbar";

export default function Page() {
  return (
      <View style={styles.container}>
        <Navbar></Navbar>
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
