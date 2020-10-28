import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    TouchableOpacity,
    Image,
} from 'react-native';
import {
    SafeAreaView,
    SafeAreaProvider,
    SafeAreaInsetsContext,
    useSafeAreaInsets,
    initialWindowMetrics,
} from 'react-native-safe-area-context';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    Map = () => {
        this.props.navigation.navigate('Map');
    };

    List = () => {
        this.props.navigation.navigate('List');
    };

    render() {
        return (
            <SafeAreaView style={styles.main}>
                <View style={styles.header}>
                    <Image
                        style={styles.img}
                        source={{ uri: 'https://i.ibb.co/d0TCxN9/shop-1.png' }}
                    />
                    <Text style={styles.txt}>BIENVENUE</Text>
                </View>
                <View style={styles.MainContainer}>
                    <Text style={styles.textColor}>Voir</Text>
                    <TouchableOpacity
                        activeOpacity={0.4}
                        style={styles.TouchableOpacityStyle}
                        onPress={this.Map}>
                        <Text style={styles.TextStyle}> CARTE </Text>
                        <Image
                            style={styles.map}
                            source={{
                                uri: 'https://i.ibb.co/hfnBXnC/location.png',
                            }}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        // activeOpacity={0.9}
                        style={styles.TouchableOpacityStyle}
                        onPress={this.List}>
                        <Text style={styles.TextStyle}> LISTE </Text>
                        <Image
                            style={styles.map}
                            source={{
                                uri: 'https://i.ibb.co/rdfD27g/list.png',
                            }}
                        />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#08585E',
    },
    TouchableOpacityStyle: {
        height: 180,
        width: 200,
        backgroundColor: '#E8FCFD',
        borderRadius: 25,
        opacity: 0.7,
        alignItems: 'center',
        marginBottom: 30
    },
    TextStyle: {
        color: '#16BC81',
        zIndex: 9,
        textTransform: 'uppercase',
        fontSize: 35,
        marginTop: 5,
        
    },
    mainTitle: {
        fontSize: 25,
        marginLeft: '3%',
        color: '#E8FCFD',
    },
    main: {
        width: '100%',
        height: '100%',
        backgroundColor: '#08585E',
        alignItems: 'center',
    },
    header: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
    },
    img: {
        width: 40,
        height: 40,
        display: 'flex',
        marginLeft: '45%',
        marginTop: 13,
        marginRight: 'auto',
        marginBottom: 0,
        marginLeft: 'auto',
    },
    txt: {
        color: 'white',
        marginTop: 10,
        marginRight: 'auto',
        marginBottom: 0,
        marginLeft: 'auto',
        fontSize: 20,
    },
    textColor: {
        color: 'white',
        marginBottom: 10,
        fontSize: 18,
    },
    middletxt: {
        color: 'white',
        fontSize: 35,
        margin: 10,
    },
    map: {
        width: 80,
        height: 80,
        display: 'flex',
        marginLeft: '45%',
        marginTop: 13,
        marginRight: 'auto',
        marginBottom: 0,
        marginLeft: 'auto',
    },
});
