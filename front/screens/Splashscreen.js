import { useCallback, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import {useNavigation} from "@react-navigation/native";
import Entypo from '@expo/vector-icons/Entypo';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';

SplashScreen.preventAutoHideAsync();

export default function App() {

  const [appIsReady, setAppIsReady] = useState(false);
  const navigation = useNavigation();

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

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return (
      <View
        style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: "#2EC530"}}
        onLayout={onLayoutRootView}>
        <Entypo name="info-with-circle" size={60} style={{transform: [{rotate: '180deg'}], color: "white"}} />
        <Text style={{fontFamily: "Montserrat", fontSize: 30, fontWeight: "700", marginTop: 20, color: "white"}}>M.V.I</Text>
      </View> 
    );
  } else {
    return (
      navigation.navigate('Login')
    )
  }

}