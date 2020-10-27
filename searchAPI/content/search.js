import React from 'react';
import { StyleSheet, View, Button, TextInput, FlatList, Text, Image, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default class Search extends React.Component {
  constructor(props){
    super(props)
    this.state = {
       food: [],
      nutrients: [],
      defaultImg: null,
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
      <SafeAreaView style={stileNutri.Wrapper}>

        <View>
          <View style={stileNutri.searchWrapper}>
          <TextInput onChangeText={(txt) => this._searchText(txt)} placeholder="alimenti" stile={stileNutri.ricerca} onSubmitEditing={() => this._loadAliments()} />
          <Button title='Rechercher' onPress={() => this._loadAliments()}/>
          </View>
        </View>

      <View>

        <View style={stileNutri.imgWrapper}>
          <Image source={{uri: this.state.defaultImg}} style={stileNutri.img}/>
        </View>

        <Text>{this.state.food.label}</Text>
  
        <View>
          <Text style={stileNutri.kal}>ENERC_KCAL: {this.state.nutrients.ENERC_KCAL}</Text>
          <Text style={stileNutri.kal}>PROCNT: {this.state.nutrients.PROCNT}</Text>
          <Text style={stileNutri.kal}>FAT: {this.state.nutrients.FAT}</Text>
          <Text style={stileNutri.kal}>CHOCDF: {this.state.nutrients.CHOCDF}</Text>
          <Text style={stileNutri.kal}>FIBTG: {this.state.nutrients.FIBTG}</Text>
        </View>
        
      </View>
      </SafeAreaView>
    );
  }
}

const stileNutri = StyleSheet.create({
  // #####
  Wrapper: {
    width: '100%',
    height: '100%',
  },
  // #####
  searchWrapper:{
    zIndex: 2,
    width: '100%',
    position: 'absolute',
    flexDirection: 'row',
    backgroundColor: 'grey',
    fontSize: 23,
  },

  imgWrapper: {
    width: '100%',
    height: '60%',
    backgroundColor: 'black',
  },
  img: {
    width: '100%',
    height: '100%',
  },
})