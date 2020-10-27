import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

// const Separator = () => {
//     return <View style={styles.separator} />;
// };

export default class Map extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { navigation } = this.props;
        return (
            <View style={styles.container}>
                {/* <Text>about there</Text> */}
                {/* <TouchableOpacity
                    activeOpacity={0.4}
                    style={styles.TouchableOpacityStyle}
                    onPress={() => {
                        navigation.navigate('Home');
                    }}>
                    <Text style={styles.TextStyle}> Home </Text>
                </TouchableOpacity> */}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#9dd4a1',
        alignItems: 'center',
        justifyContent: 'center',
    },
    // separator: {
    //     marginVertical: 8,
    // },
    TouchableOpacityStyle: {
        paddingTop: 20,
        paddingBottom: 20,
        borderRadius: 5,
        marginBottom: 10,
        width: '50%',
        backgroundColor: '#08585E',
    },
    TextStyle: {
        color:'#fff',
        textAlign:'center',
        textTransform: 'uppercase'
      }
});
