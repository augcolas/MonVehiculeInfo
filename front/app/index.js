import { StyleSheet, View } from 'react-native';
import LoginScreen from '../components/loginScreen';
import UserProfileScreen from '../components/userProfileScreen';
import { useState } from 'react';

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

      {user && <UserProfileScreen user={user} onLogout={handleLogout} />}
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
