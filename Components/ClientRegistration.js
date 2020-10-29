import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  TextInput,
  Text,
  TouchableOpacity,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

export default class ClientRegistration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      TextInput_name: '',
      TextInput_email: '',
      TextInput_phone: ''
    }
  }

  registerClient = () => {
    fetch('https://local-farmers-api.herokuapp.com/API/clients/insertClient',
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: this.state.TextInput_name,
        email: this.state.TextInput_email,
        phone: this.state.TextInput_phone
      })
    })
      .then((response) => response.json())
      .then((responseJson) => { console.log(responseJson); })
      .then(() => { this.props.navigation.navigate('ClientContributions'); })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    const { route, navigation } = this.props;

    return (
      <View style={styles.MainContainer}>
        <ScrollView>
          <View style={styles.FormContainer}>
            <TextInput
              placeholder="votre prénom et nom"
              onChangeText={ TextInputValue => this.setState({
                TextInput_name: TextInputValue
              }) }
              underlineColorAndroid='transparent'
              style={styles.TextInputStyleClass}
            />
            <TextInput
              placeholder="email"
              onChangeText={ TextInputValue => this.setState({
                TextInput_email: TextInputValue
              }) }
              underlineColorAndroid='transparent'
              style={styles.TextInputStyleClass}
            />
            <TextInput
              placeholder="portable"
              onChangeText={ TextInputValue => this.setState({
                TextInput_phone: TextInputValue
              }) }
              underlineColorAndroid='transparent'
              style={styles.TextInputStyleClass}
            />
            <TouchableOpacity
              activeOpacity = { .4 }
              style={styles.TouchableOpacitySubmitStyle}
              onPress={this.registerClient}
            >
              <Text style={styles.TextStyle}> envoyer </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.TouchableOpacityContainer}>
            <TouchableOpacity
              activeOpacity = { .4 }
              style={styles.TouchableOpacityStyle}
              onPress={() => { navigation.navigate('Home'); }}
            >
              <Text style={styles.TextStyle}>Retourner à l'acceuil</Text>
            </TouchableOpacity>

          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 10,
    paddingTop: 10,
    backgroundColor: '#fff'
  },
  FormContainer: {
    flex: 3,
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#fff'
  },
  TextInputStyleClass: {
    textAlign: 'center',
    width: '95%',
    marginBottom: 7,
    height: 40,
    borderWidth: 1,
    borderColor: '#47624F',
    borderRadius: 5 ,
  },
  TouchableOpacitySubmitStyle: {
    paddingTop: 20,
    paddingBottom: 20,
    borderRadius: 5,
    marginBottom: 10,
    width: '95%',
    backgroundColor: '#52AD9C'
  },
  TouchableOpacityContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: '#fff'
  },
  TouchableOpacityStyle: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: '95%',
    backgroundColor: '#6CC551'
  },
  TextStyle: {
    color:'#fff',
    textAlign:'center',
    textTransform: 'uppercase'
  }
});
