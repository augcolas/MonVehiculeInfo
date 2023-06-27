import {StyleSheet, View} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import ProfileScreen from "../screens/ProfileScreen";
import VehiclesScreen from "../screens/vehiclesScreen";
import CameraScreen from "../screens/CameraScreen";
import HistoricScreen from "../screens/HistoricScreen";
import SettingsScreen from "../screens/SettingsScreen";
import * as React from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";

export default function Tabs() {

    const Tab = createBottomTabNavigator();

    return <Tab.Navigator screenOptions={{
            headerShown: false, tabBarStyle: {
                backgroundColor: '#fff',
                borderRadius: 5
            }
        }}>
            <Tab.Screen options={{
                tabBarIcon: ({focused}) => (
                    <View style={styles.item}>
                        <View style={focused ? styles.current : {}}>
                            <Ionicons name="person-circle-outline" size={24} color="black"/>
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
                            <Ionicons name="car-outline" size={24} color="black"/>
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
                            <Ionicons name="md-camera-outline" size={24} color="black"/>
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
                            <Ionicons name="chatbox-outline" size={24} color="black"/>
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
                            <Ionicons name="ios-settings-outline" size={24} color="black"/>
                        </View>
                    </View>
                )
                , tabBarShowLabel: false
            }
            } name="Settings" component={SettingsScreen}/>
        </Tab.Navigator>

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderRadius: 5,
        width: '100%',
        position:"absolute",
        bottom:0,
        left:0,
        display: "flex",
        flexDirection: "row",
        alignItems:"center",
    },
    item: {
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 50,
    },
    current: {
        backgroundColor: "#58A1D9",
        transform: [{scale: 1.5}],
        height: 40,
        width:40,
        top: -25,
        display:"flex",
        alignItems: "center",
        justifyContent: "center",
        borderWidth:2,
        borderColor: "#000",
        borderRadius: 50,
    },
});
