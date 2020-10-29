import React from 'react';
import {
  Alert,
  Platform,
  View,
  Text,
  StyleSheet
} from 'react-native';
import MapView, {
  Marker,
  AnimatedRegion
} from 'react-native-maps';
import * as geolib from 'geolib';
import {
  getDistance,
  getPreciseDistance
} from 'geolib';
// import { getDB } from '../API/fetchDB'

const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = 0.01;

const initialRegion = {
  latitude: -37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
}

export default class FarmersMap extends React.Component {

  map = null;

  state = {
    region: {
      latitude: 46.987471,
      longitude: 3.150616,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
    ready: true,
    data: [],
    currentPosition: []
  };

  setRegion(region) {
    if (this.state.ready) {
      setTimeout(() => {
        this.mapView && this.mapView.animateToRegion(this.state.region, 5000)
      }, 1000)
    }
    this.setState({ region });
  }

  componentDidMount() {
    // console.log('Component did mount');
    this.getCurrentPosition();
    this.getFarmers();
  }

  getCurrentPosition() {
    try {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // console.log(position.coords);
          // if (geolib.isValidCoordinate(position.coords)) { const region... }

          const region = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          };

          this.setRegion(region);
          this.setState({
            currentPosition: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            },
          });
          // console.log('My current position:', this.state.currentPosition);
        },
        (error) => {
          console.error(error);

          // TODO: better design
          switch (error.code) {
            case 1:
              if (Platform.OS === "ios") {
                Alert.alert("", "Para ubicar tu locación habilita permiso para la aplicación en Ajustes - Privacidad - Localización");
              } else {
                Alert.alert("", "Para ubicar tu locación habilita permiso para la aplicación en Ajustes - Apps - ExampleApp - Localización");
              }
              break;
            default:
              Alert.alert("", "Error al detectar tu locación");
          }
        }
      );
    } catch(e) {
      alert(e.message || "");
    }
  };

  calculateDistance = async (id, latitude, longitude) => {

    try {
      let dis = geolib.getDistance(this.state.currentPosition,
        {
          latitude: latitude,
          longitude: longitude,
        }
      );
      Alert.alert('', `Vous êtes actuellement à ${dis / 1000} KM`);
      // console.log(`Vous êtes actuellement à ${dis} mettres (${dis / 1000} KM)`);
    } catch (error) {
      console.error(error);
    }
  };

  getFarmers = async () => {
    try {
      const response = await fetch('https://local-farmers-api.herokuapp.com/API/farms/getFarms');
      const farms = await response.json();
      this.setState({ data: farms.farms });
    } catch (e) {
      console.error(e);
    }
  };

  onMapReady = (e) => {
    if (!this.state.ready) {
      this.setState({ ready: true });
    }
  };

  farmerMarkers = () => {
    return this.state.data.map(
      (data) =>
      <Marker
        key={data.id}
        coordinate={{
          latitude: parseFloat(data.location.split(',')[0]),
          longitude: parseFloat(data.location.split(',')[1])
        }}
        title={data.name}
        description={`${data.address}, ${data.postal_code}, ${data.city}`}
        onPress= {() => {
          this.calculateDistance(data.id, parseFloat(data.location.split(',')[0]), parseFloat(data.location.split(',')[1]));
        }}
      >
        {/* <View style={{ flex: 2, borderWidth: 1, borderColor: '#ddd', padding: 10, backgroundColor: '#0058b8'}}>
          <Text>{data.name}</Text>
        </View> */}
      </Marker>
    )
  }

  render() {
    const { navigation } = this.props;
    const { region } = this.state;
    const { children, renderMarker, markers } = this.props;

    return (
      <MapView
        showsPointsOfInterest={true}
        provider="google"
        showsUserLocation
        ref={ map => { this.map = map }}
        initialRegion={this.state.region}
        renderMarker={renderMarker}
        onMapReady={this.onMapReady}
        showsMyLocationButton={true}
        style={StyleSheet.absoluteFill}
        textStyle={{ color: '#bc8b00' }}
        containerStyle={{
          flex: 2,
          backgroundColor: 'white',
          borderColor: '#BC8B00'
        }}>

        {this.farmerMarkers()}
        {children && children || null}
      </MapView>
    );
  }
}
