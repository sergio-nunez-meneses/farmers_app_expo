import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from '../Components/Home';
import Map from '../Components/Map';
import List from '../Components/List';
import ClientRegistration from '../Components/ClientRegistration';
import ClientContributions from '../Components/ClientContributions';
import FarmersList from '../Components/FarmersList';

export default class Navigation extends React.Component {
    Stack = createStackNavigator();

    render() {
        return (
            <NavigationContainer>
                <this.Stack.Navigator
                    screenOptions={{
                        headerShown: false,
                        headerTitleAlign: 'center',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <this.Stack.Screen
                        name="Home"
                        component={Home}
                        options={{
                            title: 'home',
                            headerStyle: {
                                backgroundColor: '#08585E',
                                elevation: 0,
                            },

                            headerTintColor: '#fff',
                            headerTitleStyle: {
                                fontWeight: 'bold',
                                textAlign: 'center',
                            },
                        }}
                    />
                    <this.Stack.Screen
                        name="Map"
                        component={Map}
                        options={{
                            title: 'Map',
                            headerStyle: {
                                backgroundColor: '#f4511e',
                                elevation: 0,
                            },

                            headerTintColor: '#fff',
                            headerTitleStyle: {
                                fontWeight: 'bold',
                            },
                        }}
                    />
                    <this.Stack.Screen
                        name="List"
                        component={List}
                        options={{
                            title: 'List',
                            headerStyle: {
                                backgroundColor: '#08585E',
                                elevation: 0,
                            },

                            headerTintColor: '#fff',
                            headerTitleStyle: {
                                fontWeight: 'bold',
                            },
                        }}
                    />

                    <this.Stack.Screen
                        name="ClientRegistration"
                        component={ClientRegistration}
                        options={{
                            title: 'ClientRegistration',
                            headerStyle: {
                                backgroundColor: '#08585E',
                                elevation: 0,
                            },

                            headerTintColor: '#fff',
                            headerTitleStyle: {
                                fontWeight: 'bold',
                            },
                        }}
                    />

                    <this.Stack.Screen
                        name="FarmersList"
                        component={FarmersList}
                        options={{
                            title: 'FarmersList',
                            headerStyle: {
                                backgroundColor: '#08585E',
                                elevation: 0,
                            },

                            headerTintColor: '#fff',
                            headerTitleStyle: {
                                fontWeight: 'bold',
                            },
                        }}
                    />


                </this.Stack.Navigator>
            </NavigationContainer>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
    },
    img: {
        width: 40,
        height: 40,
    }
});
