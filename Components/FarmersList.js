import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TextInput,
  Button,
  TouchableOpacity
} from 'react-native';
import { getDB } from '../API/fetchDB'

export default class FarmersList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  };

  getFarmers = async() => {
    try {
      const farmers = await getDB();
      this.setState({ data: farmers.farmers });
      console.log(this.state.data);
    } catch (e) {
      console.error(e);
    }
  };

  componentDidMount = () => {
    this.getFarmers();
  };

  render() {
    const { navigation } = this.props

    return (
      <View style={styles.MainContainer}>
        <View style={styles.FormContainer}>
          <Text style={{marginBottom: 8, fontSize: 20, textAlign: 'center', textTransform: 'uppercase'}}> current farmers </Text>
          <FlatList
            data={this.state.data}
            keyExtractor={({ id }, index) => id.toString()}
            renderItem={({ item }) => (
              <View style={{marginVertical: 5}}>
                <TouchableOpacity
                  style={{ backgroundColor: '#0058b8'}}
                  onPress={() => {
                    navigation.navigate('EditFarmer', {
                      id: item.id,
                      name: item.name,
                      email: item.email,
                      phone: item.phone,
                      farms: item.Farms
                    });
                }}>
                  <Text style={styles.DataStyle}>{item.name}</Text>
                </TouchableOpacity>
                <Text style={styles.DataStyle}>{item.email}</Text>
                <Text style={styles.DataStyle}>{item.phone}</Text>
                <FlatList
                  data={item.Farms}
                  keyExtractor={({ id }, index) => id.toString()}
                  renderItem={({ item }) => (
                    <View style={{marginVertical: 5}}>
                      <Text style={styles.DataStyle}>{item.name}</Text>
                      <Text style={styles.DataStyle}>{item.address}</Text>
                      <Text style={styles.DataStyle}>{item.FarmImages[0].name}</Text>
                    </View>
                  )}
                />
              </View>
            )}
          />
        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex:1,
    alignItems: 'center',
    paddingTop: 10,
    backgroundColor: '#fff'
  },
  FormContainer: {
    flex: 3,
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#fff'
  },
  TouchableOpacityContainer: {
    flex: 1,
    alignItems: 'center',
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
  TextStyle: {
    color:'#fff',
    textAlign:'center',
    textTransform: 'uppercase'
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
});
