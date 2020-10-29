import 'react-native-gesture-handler'
import React from 'react'
import Navigations from './Navigations/Navigations'
import { NavigationContainer } from '@react-navigation/native'
import { StatusBar} from 'react-native'


export default class App extends React.Component {

  
  render() {

    return (

      <NavigationContainer>
      <StatusBar/>
        <Navigations/>
      </NavigationContainer>

    )
  }

}
