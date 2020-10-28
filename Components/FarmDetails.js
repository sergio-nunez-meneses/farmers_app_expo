import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
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
    const { item } = route.params;
    const { id, name, email, phone, Farms } = route.params.item;

    return (
      <View style={styles.MainContainer}>
        <ScrollView>
          {
            Farms.map((item) => (
              <React.Fragment key={item.id.toString()}>
                <Text style={styles.DataStyle}>{item.name}</Text>
                <Text style={styles.DataStyle}>Photo: {item.FarmImages[0].name}</Text>
                <Text style={styles.DataStyle}>{item.address}, {item.postal_code}</Text>
                <Text style={styles.DataStyle}>{item.city}</Text>

                {/* farm location */}
                <TouchableOpacity
                  style={{ backgroundColor: '#0058b8'}}
                  onPress={() => {
                    navigation.navigate('FarmLocation', {
                      location: item.location
                    });
                }}>
                  <Text style={styles.DataStyle}>Regarder sur la carte</Text>
                </TouchableOpacity>

                {/* farm schedules */}
                <TouchableOpacity
                  style={{ backgroundColor: '#0058b8'}}
                  onPress={() => {
                    navigation.navigate('FarmSchedules', {
                      item: item
                    });
                }}>
                  <Text style={styles.DataStyle}>Voir les horaires</Text>
                </TouchableOpacity>

                {/* farm products */}
                <TouchableOpacity
                  style={{ backgroundColor: '#0058b8'}}
                  onPress={() => {
                    navigation.navigate('FarmProducts', {
                      item: item
                    });
                }}>
                  <Text style={styles.DataStyle}>Voir les produits</Text>
                </TouchableOpacity>

                {/* back to farmers list */}
                <TouchableOpacity
                  style={{ backgroundColor: '#FF0099'}}
                  onPress={() => { navigation.navigate('FarmersList'); }}
                >
                  <Text style={styles.DataStyle}>Retourner sur la liste</Text>
                </TouchableOpacity>

              </React.Fragment>
            ))
          }
        </ScrollView>
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
    borderRadius: 5
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
  DataStyle: {
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 80,
    paddingVertical: 5,
    color:'#000',
    textAlign:'center',
    textTransform: 'uppercase'
  }
});
