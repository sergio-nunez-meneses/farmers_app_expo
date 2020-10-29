import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class List extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { navigation } = this.props;
        return (
            <View style={styles.container}>
                <Text></Text>
                <TouchableOpacity
                    activeOpacity={0.4}
                    style={styles.TouchableOpacityStyle}
                    onPress={() => {
                        navigation.navigate('Home');
                    }}>
                    <Text style={styles.TextStyle}> Home </Text>
                </TouchableOpacity>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#08585E',
        alignItems: 'center',
        justifyContent: 'center',
    },
    TouchableOpacityStyle: {
        paddingTop: 20,
        paddingBottom: 20,
        borderRadius: 5,
        marginBottom: 10,
        width: '50%',
        backgroundColor: '#08585E',
    },
    TextStyle: {
        color: '#fff',
        textAlign: 'center',
        textTransform: 'uppercase',
    },
});
