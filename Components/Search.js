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

  _loadFilms = async() => {
    if (this.searchedText.length > 0) {
      this.setState({ isLoading: true });

      const response = await fetch('https://local-farmers-api.herokuapp.com/API/search/' + this.selectedCategory + '?value=' + this.searchedText);
      const result = await response.json();

      this.setState({ data: result });
    }
  };

  _searchFilms() {
    this.setState({ films: [] }, () => {
      this._loadFilms();
    });
  };

  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.MainContainer}>
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
        <TextInput
          style={styles.textinput}
          placeholder='Enter a film title'
          onChangeText={(text) => this._searchTextInputChanged(text)}
          onSubmitEditing={() => this._searchFilms()}
        />
        <Button title='Search' onPress={() => this._searchFilms()}/>

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
  container: {
    flex: 1,
    marginTop: 20,
    marginBottom: 1,
    marginHorizontal: 1,
    padding: 3,
    justifyContent: 'center',
  },
  textinput: {
    height: 70,
    marginVertical: 1,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.4)',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    color: '#000'
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
  }
});
