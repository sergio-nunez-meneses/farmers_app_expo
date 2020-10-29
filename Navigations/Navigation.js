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
        <this.Stack.Screen name="Home" component={Home}/>
        <this.Stack.Screen name="Search" component={Search}/>
          <this.Stack.Screen name="FarmersMap" component={FarmersMap}/>
          <this.Stack.Screen name="FarmersList" component={FarmersList}/>
          <this.Stack.Screen name="FarmDetails" component={FarmDetails}/>
          <this.Stack.Screen name="FarmSchedules" component={FarmSchedules}/>
          <this.Stack.Screen name="FarmProducts" component={FarmProducts}/>
          <this.Stack.Screen name="ClientRegistration" component={ClientRegistration}/>
          <this.Stack.Screen name="ClientContributions" component={ClientContributions}/>
        </this.Stack.Navigator>
      </NavigationContainer>
    );
  }
}
