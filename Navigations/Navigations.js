import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Ionicons from '@expo/vector-icons/Ionicons';
import Home from '../Components/Home';
import Map from '../Components/Map';
import List from '../Components/List';
import React from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity } from 'react-native';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function map() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="Home"
                component={Home}
                options={{
                    title: 'Home',
                    headerTitleAlign: 'center',
                    headerStyle: {
                        backgroundColor: '#0000FF',
                    },
                    headerTintColor: '#FFE436',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }}
            />
            <Stack.Screen name="Map" component={RightBar} />
            <Stack.Screen name="List" component={List} />
        </Stack.Navigator>
    );
}
function SignNav() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="Map"
                component={Map}
                options={{
                    title: 'Map',
                    headerTitleAlign: 'center',
                    headerStyle: {
                        backgroundColor: '#2651D4',
                    },
                    headerTintColor: '#E2D537',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }}
            />
        </Stack.Navigator>
    );
}

function BarNav() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="List"
                component={List}
                options={{
                    title: 'List',
                    headerTitleAlign: 'center',
                    headerStyle: {
                        backgroundColor: '#2651D4',
                    },
                    headerTintColor: '#E2D537',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }}
            />
        </Stack.Navigator>
    );
}

export default function RightBar() {
    return (
        <Drawer.Navigator
            drawerStyle={{
                backgroundColor: '#08585E',
                width: 240,
            }}
            drawerContentOptions={{
                activeTintColor: '#fddd00',
                activeBackgroundColor: '#1c2d51',
                inactiveBackgroundColor: '#fddd00',
                inactiveTintColor: '#1c2d51',
            }}>
            <Drawer.Screen
                name="Map"
                component={SignNav}
                options={{ title: 'Map' }}
            />
            <Drawer.Screen
                name="List"
                component={BarNav}
                options={{ title: 'List' }}
            />
            <Drawer.Screen
                name="Home"
                component={map}
                options={{ title: 'Home' }}
            />
        </Drawer.Navigator>
    );
}

// export default map;
