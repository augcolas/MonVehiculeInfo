import {StyleSheet, View} from 'react-native';
import LoginScreen from '../components/loginScreen';
import {useState} from 'react';
import App from "../components/camPage";
import Navbar from "../components/navbar";
import CameraScannerLicencePlate from "../components/camPage";

export default function Page() {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <View style={styles.container}>
      {!user && <LoginScreen onLogin={handleLogin} />}

      {user &&
          <>
            <CameraScannerLicencePlate></CameraScannerLicencePlate>
            <Navbar></Navbar>
          </>
      }
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
