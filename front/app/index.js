import {StyleSheet, View} from 'react-native';
import Navbar from "../components/navbar";
import {useNavigation, useRouter, useSegments} from "expo-router";

export default function Page() {
    const navigation = useNavigation();
    const router = useRouter();
    console.log(router.getInitialState());
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
