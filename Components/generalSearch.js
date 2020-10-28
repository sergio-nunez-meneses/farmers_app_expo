import React from 'react';
import { StyleSheet, View, Button, TextInput, FlatList, Text, Image, ActivityIndicator, ImageBackground, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default class Search extends React.Component {
    constructor(props){
      super(props)
      this.state = {
         food: [],
        nutrients: [],
        defaultImg: null,
        FoodLabel: "",
        searchText: ""
        }
    }
  
  
  _getFood(){
    const API_ID = '24e1badd';
    const API_TOKEN = "5415e30a26af09724f832adf15f972f9";
    const url='https://api.edamam.com/api/food-database/v2/parser?ingr='+ this.state.searchText +'&app_id='+API_ID+'&app_key='+API_TOKEN+'';
  
    fetch(url)
    .then(elements => elements.json().then(data => {
      const foods = data.hints[0].food;
      const nutrients = foods.nutrients;
      this.setState({food: foods, nutrients: nutrients});
  
      const label =  this.state.food.label;
      const upper = label.toUpperCase();
      this.setState({FoodLabel: upper});
  
  
      if(typeof this.state.food.image == 'undefined'){
        const defImg = "https://i.ibb.co/sqtkkkr/diet.png";
        this.setState({defaultImg: defImg});
      }
      else{
        this.setState({defaultImg: this.state.food.image});
      }
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
        <SafeAreaView style={stileGeneral.Wrapper}>
          <View style={stileGeneral.header}>
            {/* ######################## NEED TO BE LINKED TO MAP OR LIST PAGE */}
            <TouchableOpacity activeOpacity={0.4} style={stileGeneral.arrow} onPress={this.home}> 
            <Image style={stileGeneral.arrow} source={{uri: 'https://i.ibb.co/RjK7Mwy/previous.png',}}/>
            </TouchableOpacity>

            <Image style={stileGeneral.imgIcon} source={{ uri: 'https://i.ibb.co/d0TCxN9/shop-1.png' }}/>
            <Text style={stileGeneral.Title}>CARTE</Text>
          </View>

          <View>
            <View style={stileGeneral.searchWrapper}>
              <TextInput style={stileGeneral.ricerca} onChangeText={(txt) => this._searchText(txt)} placeholder="cerca" onSubmitEditing={} />
            </View>
          </View>
          
        </SafeAreaView>
      );
    }
  }
  
  const stileGeneral = StyleSheet.create({
    // #######

  })