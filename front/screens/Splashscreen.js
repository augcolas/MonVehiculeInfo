import { useCallback, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import MainApp from '../mainApp';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';

SplashScreen.preventAutoHideAsync();

export default function Splashscreen() {

  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync(Entypo.font);
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true); 
      }
    }
    prepare();
  }, []);

  const onLayoutView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return (
      <View style={styles.container} onLayout={onLayoutView}>
        <Entypo style={styles.icon} name="info-with-circle" size={60} />
        <Text style={styles.title}>M-V-I</Text>
      </View> 
    );
  } else {
    return (
      <MainApp></MainApp>
    )
  } 

}

const styles = {
  container: {
    flex: 1,
    height: "100%", 
    display: "flex",
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#2EC530",
  },
  icon: {
    color: 'white',
  },
  title: {
    fontSize: 30,
    fontWeight: 700,
    marginTop: 20,
    color: 'white',
  }
  
}