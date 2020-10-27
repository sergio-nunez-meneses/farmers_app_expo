import React from 'react';
import { StyleSheet, View, Button, TextInput, FlatList, Text, Image, ActivityIndicator, ImageBackground } from 'react-native';
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
      <SafeAreaView style={stileNutri.Wrapper}>

        <View style={stileNutri.header}>
          <Image style={stileNutri.imgIcon}source={{ uri: 'https://i.ibb.co/d0TCxN9/shop-1.png' }}/>
          <Text style={stileNutri.Title}>NUTRITION</Text>
        </View>

        <View>
          <View style={stileNutri.searchWrapper}>
            <TextInput style={stileNutri.ricerca} onChangeText={(txt) => this._searchText(txt)} placeholder="cerca alimenti" onSubmitEditing={() => this._loadAliments()} />
          </View>
        </View>

        <View style={stileNutri.imgWrapper}>
          <ImageBackground source={{uri: this.state.defaultImg}} style={stileNutri.img}></ImageBackground>
        </View>

        <View style={stileNutri.infoWrap}>

          <View style={stileNutri.titleWrap}>
            <Text style={stileNutri.title}>{this.state.FoodLabel}</Text>
          </View>

          <View style={stileNutri.kalWrap}>
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
  // #######
  Wrapper: {
    width: '100%',
    height: '100%',
    backgroundColor: '#08585E',
  },
  // #######
  header:{
    display: 'flex',
    flexDirection: 'row',
  },
  imgIcon: {
    width: 40,
    height: 40,
    marginTop: '3%',
    marginRight: '3%',
    marginLeft: '32%',
    marginBottom: '5%',
},
Title: {
    color: '#E8FCFD',
    marginTop: '5%',
    marginRight: 'auto',
    marginBottom: 6,
    fontSize: 20,
},
  // #######
  searchWrapper:{
    zIndex: 2,
    width: '100%',
    position: 'absolute',
    flexDirection: 'row',
    backgroundColor: 'rgba(232, 252, 253, 0.8)',
  },
  ricerca: {
    height: 50,
    width: '100%', 
    textAlign: 'center', 
    fontSize: 23,
    color: '#1a1a1a',
  },
  // #######
  imgWrapper: {
    width: '100%',
    height: '60%',
    backgroundColor: 'rgba(232, 252, 253, 0.8)',
  },
  img: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  // #######
  infoWrap: {
    width: '100%',
  },
  title: {
    textAlign: 'center',
    color: '#E8FCFD',
    fontSize: 20,
    marginBottom: 20,
  },
  kal: {
    textAlign: 'center',
    color: '#E8FCFD',
    fontSize: 15,
  }
})