import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity
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
    const { FarmProducts } = route.params.item;
    console.log(FarmProducts);

    return (
      <View style={styles.MainContainer}>
        <ScrollView>
          {
            FarmProducts.map((item) => (
              <React.Fragment key={item.id.toString()}>
                <Text style={styles.DataStyle}>Nom : {item.name}</Text>
                <Text style={styles.DataStyle}>Saison : {item.season}</Text>
                <Text style={styles.DataStyle}>Label : {item.ProductLabels[0].name}</Text>
                <Text style={styles.DataStyle}>Label : {item.ProductLabels[0].image}</Text>
              </React.Fragment>
            ))
          }
        </ScrollView>
        {/* back to farm details */}
        <TouchableOpacity
          style={{backgroundColor: '#FF0099'}}
          onPress={() => { navigation.navigate('FarmDetails'); }}
        >
          <Text style={styles.DataStyle}>Retourner à le Ferme</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 10,
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
