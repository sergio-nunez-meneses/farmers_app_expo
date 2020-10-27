import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
    Button,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    SafeAreaView,
    Image,
    TouchableHighlight,
    TextInput,
    Alert
} from 'react-native';
import MapView from 'react-native-maps';

// const image = { uri: 'https://i.stack.imgur.com/JwmQG.png' };

const menuPress = () => {
    Alert.alert('sheet');
};

const Nevers = {
    latitude: 46.988302,
    longitude: 3.157983,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
};

export default class Map extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { navigation } = this.props;
        return (
            <SafeAreaView style={styles.main}>
                <View style={styles.header}>
                    <Image
                        style={styles.imgIcon}
                        source={{ uri: 'https://i.ibb.co/d0TCxN9/shop-1.png' }}
                    />
                    <View>
                        <Text style={styles.Title}>CARTE</Text>
                    </View>
                </View>

                <View style={styles.map}>
                    <MapView
                        showsPointsOfInterest={true}
                        provider="google"
                        // mapType='satellite'
                        initialRegion={Nevers}
                        style={{ width: '100%', height: '100%' }}
                    />
                </View>

                <View style={styles.footer}>
                    <TouchableHighlight
                        onPress={menuPress}
                        style={styles.btn}>
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
        width: '100%',
        height: '100%',
        backgroundColor: '#08585E',
        alignItems: 'center',
    },
    // ###############
    header: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
    },
    mainLogo: {
        width: 35,
        height: 35,
    },
    map: {
        height: '100%',
        width: '100%',
        borderRadius: 200
    },

    footer: {
        width: '100%',
        position: 'absolute',
        flexDirection: 'row',
        marginTop: '170%',
        paddingLeft: '7%',
        paddingRight: '7%',
        // flex: 1,
        // justifyContent: 'flex-end',
        // marginBottom: 36,
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
        display: 'flex',
        marginLeft: '45%',
        marginTop: 35,
        marginRight: 'auto',
        marginBottom: 0,
        marginLeft: 'auto',
    },
    Title: {
        color: 'white',
        marginTop: 10,
        marginRight: 'auto',
        marginBottom: 6,
        marginLeft: 'auto',
        fontSize: 20,
    },
});
