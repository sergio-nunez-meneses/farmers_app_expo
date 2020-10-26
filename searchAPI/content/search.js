import React from 'react';
import { StyleSheet, View, Button, TextInput, FlatList, Text, Image, ActivityIndicator } from 'react-native';


export default class Search extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      food: [],
      nutrients: [],
      searchText: ""
      }
  }
 

_getFood(){
  const API_ID = '24e1badd';
  const API_TOKEN = '5415e30a26af09724f832adf15f972f9';
  const url='https://api.edamam.com/api/food-database/v2/parser?ingr='+ this.state.searchText +'&app_id='+API_ID+'&app_key='+API_TOKEN+'';

  fetch(url)
  .then(elements => elements.json().then(data => {
    const foods = data.hints[0].food;
    const nutrients = foods.nutrients;
    this.setState({food: foods, nutrients: nutrients});
  }))
  .catch(err => console.log(err))
}


_loadAliments() {
    this._getFood(this.state.searchText);
}

_searchText(txt){
  this.state.searchText = txt;
}

  render() {
    return(
      <View>
      <TextInput onChangeText={(txt) => this._searchText(txt)} placeholder="alimenti" stile={stile.ricerca} onSubmitEditing={() => this._loadAliments()}/>
      <Button title='Rechercher' onPress={() => this._loadAliments()}/>

      <View>
        <Text>{this.state.food.label}</Text>
        <Image source={{uri: this.state.food.image}} style={{width: 50, height: 50}}/>
        <Text>ENERC_KCAL: {this.state.nutrients.ENERC_KCAL}</Text>
        <Text>PROCNT: {this.state.nutrients.PROCNT}</Text>
        <Text>FAT: {this.state.nutrients.FAT}</Text>
        <Text>CHOCDF: {this.state.nutrients.CHOCDF}</Text>
        <Text>FIBTG: {this.state.nutrients.FIBTG}</Text>
      </View>
      
      </View>
    );
  }
}

const stile = StyleSheet.create({

})