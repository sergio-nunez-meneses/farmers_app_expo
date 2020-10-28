import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  Alert,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Button
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

export default class EditFarmer extends React.Component {
  constructor(props) {
    super(props);
  };

  render() {
    const { route, navigation } = this.props;
    const { id, name, email, phone, Farms } = route.params.item;
    console.log(Farms);

    return (
      <View style={styles.MainContainer}>

        <View style={styles.FormContainer}>
          <ScrollView style={{flex: 1}}>
            {
              Farms.map((item) => (
                <Text>{item.name}</Text>
              ))
            }
          </ScrollView>
        </View>

        <View style={styles.FormContainer}>
          <Text style={{marginBottom: 8, fontSize: 20, textAlign: 'center', textTransform: 'uppercase'}}> edit farmer {JSON.stringify(id)}</Text>
          <TextInput
            placeholder="name"
            defaultValue = {name}
            underlineColorAndroid='transparent'
            style={styles.TextInputStyleClass}
          />
          <TextInput
            placeholder="address"
            defaultValue = {email}
            underlineColorAndroid='transparent'
            style={styles.TextInputStyleClass}
          />
          <TextInput
            placeholder="city"
            defaultValue = {phone}
            underlineColorAndroid='transparent'
            style={styles.TextInputStyleClass}
          />
          <TouchableOpacity
            activeOpacity = { .4 }
            style={styles.TouchableOpacitySubmitStyle} onPress={this.editFarmer}
          >
            <Text style={styles.TextStyle}> submit </Text>
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
