import {StyleSheet, View} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import ProfileScreen from "../screens/ProfileScreen";
import VehiclesScreen from "../screens/vehiclesScreen";
import CameraScreen from "../screens/CameraScreen";
import HistoricScreen from "../screens/HistoricScreen";
import SettingsScreen from "../screens/SettingsScreen";
import * as React from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {useAuth} from "../context/Auth";

export default function Tabs() {

    const Tab = createBottomTabNavigator();

    const {authUser, setAuthUser, isLoggedIn, setIsLoggedIn} = useAuth();


    return <Tab.Navigator initialRouteName="Camera" screenOptions={{
        headerShown: false, tabBarStyle: {
            backgroundColor: '#fff',
            borderRadius: 5
        }
    }}>
        <Tab.Screen options={{
            tabBarIcon: ({focused}) => (
                <View style={styles.item}>
                    <View style={focused ? styles.current : {}}>
                        <Ionicons name="person-circle-outline" size={24} color={focused ? "white":"black"}/>
                    </View>
                </View>
            )
            , tabBarShowLabel: false
        }
        } name="Profile" component={ProfileScreen}/>
        <Tab.Screen options={{
            tabBarIcon: ({focused}) => (
                <View style={styles.item}>
                    <View style={focused ? styles.current : {}}>
                        <Ionicons name="car-outline" size={24} color={focused ? "white":"black"}/>
                    </View>
                </View>
            )
            , tabBarShowLabel: false
        }
        } name="Vehicle" component={VehiclesScreen}/>
        <Tab.Screen options={{
            tabBarIcon: ({focused}) => (
                <View style={styles.item}>
                    <View style={focused ? styles.current : {}}>
                        <Ionicons name="md-camera-outline" size={24} color={focused ? "white":"black"}/>
                    </View>
                </View>
            )
            , tabBarShowLabel: false
        }
        } name="Camera" component={CameraScreen}/>
        <Tab.Screen options={{
            tabBarIcon: ({focused}) => (
                <View style={styles.item}>
                    <View style={focused ? styles.current : {}}>
                        <Ionicons name="chatbox-outline" size={24} color={focused ? "white":"black"}/>
                    </View>
                </View>
            )
            , tabBarShowLabel: false
        }
        } name="Historic" component={HistoricScreen}/>
        <Tab.Screen options={{
            tabBarIcon: ({focused}) => (
                <View style={styles.item}>
                    <View style={focused ? styles.current : {}}>
                        <Ionicons name="ios-settings-outline" size={24} color={focused ? "white":"black"}/>
                    </View>
                </View>
            )
            , tabBarShowLabel: false
        }
        } name="Settings" component={SettingsScreen}/>
    </Tab.Navigator>

}

const styles = StyleSheet.create({
    item: {
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 50,
    },
    current: {
        backgroundColor: "#2ec530",
        transform: [{scale: 1.1}],
        height: 40,
        width: 40,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderColor: "#000",
        borderRadius: 10,
    },
});
