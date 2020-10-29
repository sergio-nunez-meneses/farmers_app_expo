import React from 'react';
import {
  StyleSheet,
  ScrollView,
  FlatList,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  ActivityIndicator
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

export default class Search extends React.Component {
  constructor(props) {
    super (props);
    this.searchedText = '';
    this.selectedCategory = '';
    this.state = {
      opacity: 0,
      data: [],
      isLoading: false
    };
  };

  _displayLoading() {
    if (this.state.isLoading) {
      return(
        <View style={styles.loading_container}>
          <ActivityIndicator size='large'/>
        </View>
      )
    }
  };

  _searchTextInputChanged(text) {
    this.searchedText = text;
  };

  _selectCategoryChanged(category) {
    this.selectedCategory = category;
  };

  _getResults = async() => {
    if (this.searchedText.length > 0) {
      this.setState({ isLoading: true });

      const response = await fetch('https://local-farmers-api.herokuapp.com/API/search/' + this.selectedCategory + '?value=' + this.searchedText);
      const result = await response.text();

      if (result.charAt(0) === '<') {
        console.error(result);
        return;
      }

      console.log(JSON.parse(result).length);
      this.setState({ data: JSON.parse(result) });
    }
  };

  _searchResults() {
    this.setState({ films: [] }, () => {
      this._getResults();
    });
  };

  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.MainContainer}>
        <View style={styles.TextInputStyleClass}>
          <RNPickerSelect
            onValueChange={(value) => {
              this._selectCategoryChanged(value);
            }}
            items={[
              { label: 'producteurs', value: 'farmers' },
              { label: 'fermes', value: 'farms' },
              { label: 'produits', value: 'products' },
              { label: 'labels', value: 'labels' },
              { label: 'valeurs nutritionnels', value: 'nutrition' },
            ]}
          />
          </View>
        <TextInput
          style={styles.TextInputStyleClass}
          placeholder='Enter a film title'
          onChangeText={(text) => this._searchTextInputChanged(text)}
          onSubmitEditing={() => this._searchResults()}
        />
        <TouchableOpacity
          activeOpacity = { .4 }
          style={styles.TouchableOpacitySubmitStyle}
          onPress={() => this._searchResults()}
        >
          <Text style={styles.TextStyle}>Rechercher</Text>
        </TouchableOpacity>

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
              </View>
            </React.Fragment>
          ))
        }
        </ScrollView>

        {/* go home */}
        <View style={styles.TouchableOpacityContainer}>
          <TouchableOpacity
            activeOpacity = { .4 }
            style={styles.TouchableOpacityStyle}
            onPress={() => { navigation.navigate('Home'); }}
          >
            <Text style={styles.TextStyle}>retour au menu principal</Text>
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
  TextInputStyleClass: {
    textAlign: 'center',
    width: '90%',
    marginBottom: 7,
    height: 40,
    borderWidth: 1,
    borderColor: '#FF5722',
    borderRadius: 5
  },
  TouchableOpacitySubmitStyle: {
    paddingTop: 20,
    paddingBottom: 20,
    borderRadius: 5,
    marginBottom: 10,
    width: '90%',
    backgroundColor: '#52AD9C'
  },
  TextInputStyleClass: {
    textAlign: 'center',
    width: '90%',
    marginBottom: 7,
    height: 40,
    borderWidth: 1,
    borderColor: '#47624F',
    borderRadius: 5 ,
  },
  loading_container: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    left: 0,
    right: 0,
    top: 110,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)'
  },
  TouchableOpacityContainer: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  }
});
