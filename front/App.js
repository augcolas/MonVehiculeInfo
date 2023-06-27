import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Navbar from "./components/navbar";
import Login from "./components/login";
import Register from "./components/register";
export default function App() {

  return (
    <View style={styles.container}>
      <Register></Register>
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
