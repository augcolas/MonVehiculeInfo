import { StyleSheet, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useAuth } from "../context/Auth";
import { useContext } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import ProfileScreen from "../screens/ProfileScreen";
import VehiclesScreen from "../screens/vehiclesScreen";
import CameraScreen from "../screens/CameraScreen";
import HistoricScreen from "../screens/HistoricScreen";
import SettingsScreen from "../screens/SettingsScreen";
import ThemeContext from "../themes/ThemeContext";
import * as React from "react";

export default function Tabs() {
    const Tab = createBottomTabNavigator();
    const { selectedTheme } = useContext(ThemeContext);
    const { authUser, setAuthUser, isLoggedIn, setIsLoggedIn } = useAuth();

    return (
        <Tab.Navigator
            initialRouteName="Camera"
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: selectedTheme.primaryColor,
                    borderRadius: 5,
                },
            }}
        >
            <Tab.Screen
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.item}>
                            <View
                                style={[
                                    styles.current,
                                    { backgroundColor: focused ? selectedTheme.buttonColor : selectedTheme.primaryColor },
                                ]}
                            >
                                <Ionicons name="person-circle-outline" size={24} color={focused ? selectedTheme.primaryColor : selectedTheme.secondaryColor} />
                            </View>
                        </View>
                    ),
                    tabBarShowLabel: false,
                }}
                name="Profile"
                component={ProfileScreen}
            />
            <Tab.Screen
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.item}>
                            <View
                                style={[
                                    styles.current,
                                    { backgroundColor: focused ? selectedTheme.buttonColor : selectedTheme.primaryColor },
                                ]}
                            >
                                <Ionicons name="car-outline" size={24} color={focused ? selectedTheme.primaryColor : selectedTheme.secondaryColor} />
                            </View>
                        </View>
                    ),
                    tabBarShowLabel: false,
                }}
                name="Vehicle"
                component={VehiclesScreen}
            />
            <Tab.Screen
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.item}>
                            <View
                                style={[
                                    styles.current,
                                    { backgroundColor: focused ? selectedTheme.buttonColor : selectedTheme.primaryColor },
                                ]}
                            >
                                <Ionicons name="md-camera-outline" size={24} color={focused ? selectedTheme.primaryColor : selectedTheme.secondaryColor} />
                            </View>
                        </View>
                    ),
                    tabBarShowLabel: false,
                }}
                name="Camera"
                component={CameraScreen}
            />
            <Tab.Screen
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.item}>
                            <View
                                style={[
                                    styles.current,
                                    { backgroundColor: focused ? selectedTheme.buttonColor : selectedTheme.primaryColor },
                                ]}
                            >
                                <Ionicons name="chatbox-outline" size={24} color={focused ? selectedTheme.primaryColor : selectedTheme.secondaryColor} />
                            </View>
                        </View>
                    ),
                    tabBarShowLabel: false,
                }}
                name="Historic"
                component={HistoricScreen}
            />
            <Tab.Screen
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.item}>
                            <View
                                style={[
                                    styles.current,
                                    { backgroundColor: focused ? selectedTheme.buttonColor : selectedTheme.primaryColor },
                                ]}
                            >
                                <Ionicons name="ios-settings-outline" size={24} color={focused ? selectedTheme.primaryColor : selectedTheme.secondaryColor} />
                            </View>
                        </View>
                    ),
                    tabBarShowLabel: false,
                }}
                name="Settings"
                component={SettingsScreen}
            />
        </Tab.Navigator>
    );
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
        transform: [{ scale: 1.1 }],
        height: 40,
        width: 40,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderColor: "#000",
        borderRadius: 10,
    },
});
