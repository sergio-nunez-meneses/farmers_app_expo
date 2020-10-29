import { StatusBar } from 'expo-status-bar';
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
  TouchableOpacity,
  Image,
  TextInput,
  UseEffect
} from 'react-native';
import MapView, {
  Marker,
  AnimatedRegion,
} from 'react-native-maps';
import {
    SafeAreaProvider,
    SafeAreaInsetsContext,
    useSafeAreaInsets,
    initialWindowMetrics,
} from 'react-native-safe-area-context';
import * as geolib from 'geolib';
import { getDistance, getPreciseDistance } from 'geolib';
import { RightBar } from '../Navigations/Navigations'

// const image = { uri: 'https://i.stack.imgur.com/JwmQG.png' };

const menuPress = () => {
    // Alert.alert('sheet');
};

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

export default class Map extends React.Component {

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
    Home = () => {
        this.props.navigation.navigate('Home');
    };

    render() {
      const { navigation } = this.props;
      const { region } = this.state;
      const { children, renderMarker, markers } = this.props;

        return (
            <SafeAreaView style={styles.main}>
                <View style={styles.header}>
                    <TouchableOpacity
                        activeOpacity={0.4}
                        style={styles.arrow}
                        onPress={this.Home}>
                        <Image
                            style={styles.arrow}
                            source={{
                                uri: 'https://i.ibb.co/RjK7Mwy/previous.png',
                            }}
                        />
                    </TouchableOpacity>

                    <Image
                        style={styles.imgIcon}
                        source={{ uri: 'https://i.ibb.co/d0TCxN9/shop-1.png' }}
                    />
                    <Text style={styles.Title}>CARTE</Text>
                </View>

                <View style={styles.map}>
                    <MapView
                        showsPointsOfInterest={true}
                        provider="google"
                        // mapType='satellite'
                        initialRegion={this.state.region}
                        style={{ width: '100%', height: '100%',  borderTopLeftRadius: 60,
                        borderTopRightRadius: 60, }}
                        showsUserLocation
                        ref={ map => { this.map = map }}
                        renderMarker={renderMarker}
                        onMapReady={this.onMapReady}
                        showsMyLocationButton={true}
                        onRegionChange={this.onRegionChange}
                        onRegionChangeComplete={this.onRegionChangeComplete}
                        style={StyleSheet.absoluteFill}>
                        {this.farmerMarkers()}
                        {children && children || null}
                  </MapView>
                </View>

                <View style={styles.footer}>
                    <TouchableHighlight onPress={menuPress} style={styles.btn}>
                        <Image
                            style={styles.logo}
                            source={{
                                uri:
                                    'https://i.ibb.co/TDQtNYy/menu-symbol-of-three-parallel-lines.png',
                            }}
                        />
                    </TouchableHighlight>
                    <TextInput style={styles.searchField} value="search" />
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    main: {
        flex: 6,
        width: '100%',
        height: '100%',

        backgroundColor: '#08585E',
        alignItems: 'center',
    },

    header: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: '5%',
    },
    mainLogo: {
        width: 35,
        height: 35,
    },
    map: {
        height: '100%',
        width: '100%',
        marginTop:20,
        borderWidth:1,
        borderRadius:30,
        overflow: 'hidden',

    },

    footer: {
        width: '100%',
        position: 'absolute',
        flexDirection: 'row',
        marginTop: '150%',
        paddingLeft: '7%',
        paddingRight: '7%',
    },
    btn: {
        borderRadius: 100,
        backgroundColor: '#08585E',
        padding: '5%',
        marginBottom: '10%',
    },
    logo: {
        width: 40,
        height: 40,
    },
    searchField: {
        backgroundColor: '#08585E',
        borderRadius: 100,
        marginLeft: '3.5%',
        marginRight: '3.5%',
        paddingLeft: '3.5%',
        paddingRight: '3.5%',
        fontSize: 30,
    },
    imgIcon: {
        width: 40,
        height: 40,
        marginTop: '5%',
        marginRight: '3%',
        marginLeft: '26%',
        marginBottom: '5%',
    },
    Title: {
        color: '#E8FCFD',
        marginTop: '7%',
        marginRight: 'auto',
        marginBottom: 6,
        // marginLeft: '6%',
        fontSize: 20,
    },
    arrow: {
        width: 33,
        height: 33,
        marginTop: '7%',
        marginLeft: '3%',
    },
});
