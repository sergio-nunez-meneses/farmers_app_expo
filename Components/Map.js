import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
    Button,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    // SafeAreaView,
    Image,
    TouchableHighlight,
    TextInput,
    Alert,
} from 'react-native';
import MapView from 'react-native-maps';
import {
    SafeAreaView,
    SafeAreaProvider,
    SafeAreaInsetsContext,
    useSafeAreaInsets,
    initialWindowMetrics,
} from 'react-native-safe-area-context';

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

    Home = () => {
        this.props.navigation.navigate('Home');
    };

    render() {
        const { navigation } = this.props;
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
                        initialRegion={Nevers}
                        style={{ width: '100%', height: '100%',  borderTopLeftRadius: 60,
                        borderTopRightRadius: 60, }}
                    />
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
        marginTop: '170%',
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
