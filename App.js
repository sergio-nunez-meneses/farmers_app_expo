import React from 'react';
import {
  Alert,
  Platform,
  View,
  Text,
  StyleSheet,
  UseState,
  TouchableHighlight,
  UseRef,
  SafeAreaView,
  UseEffect
} from 'react-native';
import MapView, {
  Marker,
  AnimatedRegion,
} from 'react-native-maps';
import * as geolib from 'geolib';
import { getDistance, getPreciseDistance } from 'geolib';


const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = 0.01;

const origin = {latitude: 37.3318456, longitude: -122.0296002};
const destination = {latitude: 46.987471, longitude: 3.150616};

const initialRegion = {
  latitude: -37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
}

export default class App extends React.Component {
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
    currentPosition: [],

  };

  setRegion(region) {
    if (this.state.ready) {
      setTimeout(() => {
      this.mapView && this.mapView.animateToRegion(this.state.region, 500)
    }, 10)
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
            currentPosition: { latitude: position.coords.latitude, longitude: position.coords.longitude },
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
          // console.log('My current position:', this.state.currentPosition);

          console.log(
            'You are ',
            geolib.getDistance(position.coords, {
                latitude: 47.001512,
                longitude: 3.134294,
            }),
            'meters away from 47.001512, 3.134294'
          );
        },
        (error) => {
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

  _calculateDistance = async (id) => {
    console.log(id);
    try {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          var dis = geolib.getDistance(this.state.currentPosition, {
            latitude: parseFloat(this.state.data.location.split(',')[0]),
            longitude: parseFloat(this.state.data.location.split(',')[1]),
          });
          console.log(`Distance\n\n${dis} Meter\nOR\n${dis / 1000} KM`);
        });
    } catch (e) {
      Alert.alert(e.message);
    }
  };

  onMapReady = (e) => {
    if (!this.state.ready) {
      this.setState({ready: true});
    }
  };

  getFarmers = async () => {
    const response = await fetch('https://local-farmers-api.herokuapp.com/API/farms/getFarms');
    const farms = await response.json();
    this.setState({ data: farms.farms });
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
        description={data.address + ', ' + data.postal_code + ', ' + data.city}
        onPress= {()=>{ this._calculateDistance(data.id)}}
      >
        {/* <View style={{ flex: 2, borderWidth: 1, borderColor: '#ddd', padding: 10, backgroundColor: '#0058b8'}}>
          <Text>{data.name}</Text>
        </View> */}
      </Marker>
    )
  }

  render() {
    const { region } = this.state;
    const { children, renderMarker, markers } = this.props;

    return (
      <MapView
        showsUserLocation
        ref={ map => { this.map = map }}
        initialRegion={this.state.region}
        renderMarker={renderMarker}
        onMapReady={this.onMapReady}
        showsMyLocationButton={true}
        onRegionChange={this.onRegionChange}
        onRegionChangeComplete={this.onRegionChangeComplete}
        style={StyleSheet.absoluteFill}
        textStyle={{ color: '#bc8b00' }}
        containerStyle={{flex: 2, backgroundColor: 'white', borderColor: '#BC8B00'}}>
        {this.farmerMarkers()}
        {children && children || null}

      </MapView>
    );
  }
}
