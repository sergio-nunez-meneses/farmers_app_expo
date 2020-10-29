import React from 'react';
import {
  StyleSheet,
  Image,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Linking
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
        <ScrollView vertical={true}>
        {
          this.state.data.map((item) => (
            <React.Fragment key={item.id.toString()}>
              <View style={{flex: 10, marginVertical: 5, padding: 0, borderWidth: 1, borderColor: '#ddd'}}>
                <Image
                  style={styles.AvatarPhoto}
                  source={{uri: 'https://img.pngio.com/account-avatar-circle-people-profile-user-icon-circle-people-png-512_512.png'}}
                />
                <TouchableOpacity
                  style={{
                    backgroundColor: '#52AD9C',
                    color: '#fff'
                  }}
                  onPress={() => {
                    navigation.navigate('FarmDetails', {
                      item: item
                    });
                }}>
                  <Text style={{
                    paddingHorizontal: 80,
                    paddingVertical: 5,
                    color:'#fff',
                    textAlign:'center',
                    textTransform: 'uppercase'
                  }}>{item.name}</Text>
                </TouchableOpacity>
                <Text
                  style={styles.DataStyle}
                  onPress={() => Linking.openURL('mailto:support@example.com')}
                >
                  {item.email}
                </Text>
                <Text
                  style={styles.DataStyle}
                  onPress={() => Linking.openURL(`tel:${item.phone}`)}
                >
                  {item.phone}
                </Text>
              </View>
            </React.Fragment>
          ))
        }
        </ScrollView>

        {/* go to client registration */}
        <View style={styles.TouchableOpacityContainer}>
          <Text style={{marginBottom: 5, textAlign:'center', textTransform: 'uppercase'}}>Notre liste est incomplète ?</Text>
          <TouchableOpacity
            activeOpacity = { .4 }
            style={styles.TouchableOpacityStyle}
            onPress={() => { navigation.navigate('ClientRegistration'); }}
          >
            <Text style={styles.TextStyle}>Contibuer à nos registres!</Text>
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
  AvatarPhoto: {
    width: '100%',
    height: 100,
    margin: 1,
    backgroundColor: 'transparent'
  },
  TouchableOpacityContainer: {
    flex: 2,
    alignItems: 'center',
    width: '100%',
    marginTop: '-36%',
    padding: 10,
    backgroundColor: '#fff'
  },
  TouchableOpacityStyle: {
    paddingTop: 20,
    paddingBottom: 20,
    borderRadius: 5,
    marginBottom: 10,
    width: '90%',
    backgroundColor: '#6CC551'
  },
  TextStyle: {
    color:'#fff',
    textAlign:'center',
    textTransform: 'uppercase'
  },
  DataStyle: {
    paddingHorizontal: 80,
    paddingVertical: 5,
    color:'#000',
    textAlign:'center',
    textTransform: 'uppercase'
  }
});
