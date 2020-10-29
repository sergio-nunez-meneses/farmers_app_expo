import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  ScrollView,
  View,
  TextInput,
  Text,
  TouchableOpacity
} from 'react-native';
import MapView, {
  Marker,
  AnimatedRegion
} from 'react-native-maps';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

export default class EditFarmer extends React.Component {
  constructor(props) {
    super(props);
  };

  map = null;

  state = {
    region: {
      latitude: 46.987471,
      longitude: 3.150616,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    }
  };

  render() {
    const { region } = this.state;
    const { children, renderMarker, markers, route, navigation } = this.props;
    const { item } = route.params;
    const { id, name, email, phone, Farms } = route.params.item;
    console.log(Farms);

    if (this.state.region.latitude !== parseFloat(Farms[0].location.split(',')[0])) {
      this.setState({ ...this.state, region: {
        latitude: parseFloat(Farms[0].location.split(',')[0]),
        longitude: parseFloat(Farms[0].location.split(',')[1]),
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      }})
    }

    return (
      <View style={styles.MainContainer}>
        <ScrollView>
          {
            Farms.map((item) => (
              <React.Fragment key={item.id.toString()}>
                <Image
                  style={styles.AvatarPhoto}
                  source={{uri: 'https://local-farmers-api.herokuapp.com/images/' + item.FarmImages[0].name}}
                />
                <Text style={styles.DataStyle}>{item.name}</Text>
                <Text style={styles.DataStyle}>{item.address}, {item.postal_code} {item.city}</Text>
                <Text style={styles.DataStyle}>{item.website}</Text>

                <View style={{height: '80%'}}>
                  <MapView
                    showsPointsOfInterest={true}
                    provider="google"
                    initialRegion={this.state.region}
                    showsUserLocation
                    ref={ map => { this.map = map }}
                    renderMarker={renderMarker}
                    showsMyLocationButton={true}
                    style={StyleSheet.absoluteFill}
                    textStyle={{ color: '#bc8b00' }}
                    containerStyle={{
                      flex: 2,
                      backgroundColor: 'white',
                      borderColor: '#BC8B00'
                    }}>

                    <Marker
                      key={item.id}
                      coordinate={{
                        latitude: parseFloat(item.location.split(',')[0]),
                        longitude: parseFloat(item.location.split(',')[1])
                      }}
                      title={item.name}
                      description={item.address}
                    >
                    </Marker>
                    {children && children || null}
                  </MapView>
                </View>

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
                  style={{ backgroundColor: '#FF0999'}}
                  onPress={() => { navigation.navigate('FarmersList'); }}
                >
                  <Text style={styles.DataStyle}>Retourner</Text>
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
  },
  AvatarPhoto: {
    width: '100%',
    height: 100,
    // margin: 1,
    backgroundColor: 'transparent'
  },
});
