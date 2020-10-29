import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
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

        <Text style={{marginBottom: 8, fontSize: 20, textAlign: 'center', textTransform: 'uppercase'}}> les producteurs.trices </Text>

        <ScrollView>
        {
          this.state.data.map((item) => (
            <React.Fragment key={item.id.toString()}>
              <View style={{marginVertical: 5}}>
                <Text style={styles.DataStyle}>Avatar</Text>
                <TouchableOpacity
                  style={{ backgroundColor: '#0058b8'}}
                  onPress={() => {
                    navigation.navigate('FarmDetails', {
                      item: item
                    });
                }}>
                  <Text style={styles.DataStyle}>{item.name}</Text>
                </TouchableOpacity>
                <Text style={styles.DataStyle}>{item.email}</Text>
                <Text style={styles.DataStyle}>{item.phone}</Text>
              </View>
            </React.Fragment>
          ))
        }
        </ScrollView>

        {/* go to client registration */}
        <View style={styles.TouchableOpacityContainer}>
          <TouchableOpacity
            activeOpacity = { .4 }
            style={styles.TouchableOpacityStyle}
            onPress={() => { navigation.navigate('ClientRegistration'); }}
          >
            <Text style={styles.TextStyle}>Contibuer à nos registres</Text>
          </TouchableOpacity>
        </View>
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
  TouchableOpacityContainer: {
    flex: 2,
    alignItems: 'center',
    width: '100%',
    marginTop: -80,
    padding: 10,
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
  }
});
