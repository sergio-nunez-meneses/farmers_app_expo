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

export default class ClientContributions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      TextInput_farmerName: '',
      TextInput_farmerEmail: '',
      TextInput_farmerPhone: '',
      TextInput_farmName: '',
      TextInput_farmAddress: '',
      TextInput_farmCity: '',
      TextInput_farmPostalCode: ''
    }
  }

  registerContributions = () => {
    const { route, navigation } = this.props;

    fetch('https://local-farmers-api.herokuapp.com/API/clients/insertContributions',
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        farmerName: this.state.TextInput_farmerName,
        farmerEmail: this.state.TextInput_farmerEmail,
        farmerPhone: this.state.TextInput_farmerPhone,
        farmName: this.state.TextInput_farmName,
        farmAddress: this.state.TextInput_farmAddress,
        farmCity: this.state.TextInput_farmCity,
        farmPostalCode: this.state.TextInput_farmPostalCode,
      })
    })
      .then((response) => response.json())
      .then((responseJson) => { console.log(responseJson); })
      .then(() => { this.props.navigation.navigate('FarmersList'); })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    const { route, navigation } = this.props;

    return (
      <View style={styles.MainContainer}>
        <View style={styles.FormContainer}>
          <Text style={{marginBottom: 8, fontSize: 20, textAlign: 'center', textTransform: 'uppercase'}}> insert farmer </Text>

          <TextInput
            placeholder="nom du producteur"
            onChangeText={ TextInputValue => this.setState({
              TextInput_farmerName: TextInputValue
            }) }
            underlineColorAndroid='transparent'
            style={styles.TextInputStyleClass}
          />
          <TextInput
            placeholder="email"
            onChangeText={ TextInputValue => this.setState({
              TextInput_farmerEmail: TextInputValue
            }) }
            underlineColorAndroid='transparent'
            style={styles.TextInputStyleClass}
          />
          <TextInput
            placeholder="portable"
            onChangeText={ TextInputValue => this.setState({
              TextInput_farmerPhone: TextInputValue
            }) }
            underlineColorAndroid='transparent'
            style={styles.TextInputStyleClass}
          />
          <TextInput
            placeholder="nom de la ferme"
            onChangeText={ TextInputValue => this.setState({
              TextInput_farmName: TextInputValue
            }) }
            underlineColorAndroid='transparent'
            style={styles.TextInputStyleClass}
          />
          <TextInput
            placeholder="adress"
            onChangeText={ TextInputValue => this.setState({
              TextInput_farmAddress: TextInputValue
            }) }
            underlineColorAndroid='transparent'
            style={styles.TextInputStyleClass}
          />
          <TextInput
            placeholder="ville"
            onChangeText={ TextInputValue => this.setState({
              TextInput_farmCity: TextInputValue
            }) }
            underlineColorAndroid='transparent'
            style={styles.TextInputStyleClass}
          />
          <TextInput
            placeholder="code postal"
            onChangeText={ TextInputValue => this.setState({
              TextInput_farmPostalCode: TextInputValue
            }) }
            underlineColorAndroid='transparent'
            style={styles.TextInputStyleClass}
          />
          <TouchableOpacity
            activeOpacity = { .4 }
            style={styles.TouchableOpacitySubmitStyle} onPress={this.registerContributions}
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
