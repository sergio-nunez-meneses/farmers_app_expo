import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from '../Components/Home';
import Search from '../Components/Search';
import FarmersMap from '../Components/FarmersMap';
import FarmersList from '../Components/FarmersList';
import FarmDetails from '../Components/FarmDetails';
import FarmSchedules from '../Components/FarmSchedules';
import FarmProducts from '../Components/FarmProducts';
import ClientRegistration from '../Components/ClientRegistration';
import ClientContributions from '../Components/ClientContributions';

export default class Navigation extends React.Component {
  Stack = createStackNavigator();

  render() {
    return (
      <NavigationContainer>
        <this.Stack.Navigator>
          <this.Stack.Screen
            name="Home"
            component={Home}
            name="Home"
            component={Home}
            options={{
              title: 'Acceuil',
              headerStyle: {
                elevation: 0,
                backgroundColor: '#447604',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
                textAlign: 'center',
              },
            }}
          />
          <this.Stack.Screen
            name="Search"
            component={Search}
            options={{
              title: 'Trouver...',
              headerStyle: {
                backgroundColor: '#447604',
                elevation: 0,
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          <this.Stack.Screen
            name="FarmersMap"
            component={FarmersMap}
            options={{
              title: 'Carte des fermes',
              headerStyle: {
                backgroundColor: '#447604',
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
              title: 'Les Producteurs.trices',
              headerStyle: {
                backgroundColor: '#447604',
                elevation: 0,
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          <this.Stack.Screen
            name="FarmDetails"
            component={FarmDetails}
            options={{
              title: 'Carte des fermes',
              headerStyle: {
                backgroundColor: '#447604',
                elevation: 0,
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          <this.Stack.Screen
            name="FarmSchedules"
            component={FarmSchedules}
            options={{
              title: 'Horaires',
              headerStyle: {
                backgroundColor: '#447604',
                elevation: 0,
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          <this.Stack.Screen
            name="FarmProducts"
            component={FarmProducts}
            options={{
              title: 'Carte des fermes',
              headerStyle: {
                backgroundColor: '#447604',
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
              title: 'Inscription',
              headerStyle: {
                backgroundColor: '#447604',
                elevation: 0,
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          <this.Stack.Screen
            name="ClientContributions"
            component={ClientContributions}
            options={{
              title: 'Contributions',
              headerStyle: {
                backgroundColor: '#447604',
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
