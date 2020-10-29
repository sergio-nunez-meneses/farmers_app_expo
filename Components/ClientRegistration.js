import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Alert,
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
        <View style={styles.FormContainer}>
          <Text style={{marginBottom: 8, fontSize: 20, textAlign: 'center', textTransform: 'uppercase'}}>Inscrivez-vous pour nous transmettre vos contributions !</Text>
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
            onPress={() => { navigation.navigate('FarmersList'); }}
          >
            <Text style={styles.TextStyle}>Retourner à liste des producteurs.trices</Text>
          </TouchableOpacity>

        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex:1,
    alignItems: 'center',
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
    width: '90%',
    marginBottom: 7,
    height: 40,
    borderWidth: 1,
    borderColor: '#FF5722',
    borderRadius: 5 ,
  },
  TouchableOpacitySubmitStyle: {
    paddingTop: 20,
    paddingBottom: 20,
    borderRadius: 5,
    marginBottom: 10,
    width: '90%',
    backgroundColor: '#FF0000'
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
    borderRadius: 5,
    marginBottom: 10,
    width: '90%',
    backgroundColor: '#00BCD4'
  },
  TextStyle: {
    color:'#fff',
    textAlign:'center',
    textTransform: 'uppercase'
  }
});
