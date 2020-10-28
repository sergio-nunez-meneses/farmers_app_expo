import React from 'react';
import { StyleSheet, View, Button, TextInput, FlatList, Text, Image, ActivityIndicator, ImageBackground, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default class GeneralSearch extends React.Component {
    constructor(props){
      super(props)
      this.state = {
         searchedText: "",

        }
    }
  
    _getFarms(){
        const url = "https://local-farmers-api.herokuapp.com/API/search/farms?value="+  this.state.searchedText +"";
        fetch(url).then(fetched => fetched.json().then(result => {
            result.forEach(element => {
                const elm = element;
                console.log(elm.address);
            });
        }))
        .catch(err => console.log(err))

        console.log(this.state.searchedText);
    }

    _loadData() {
        this._getFarms(this.state.searchText);
    }

    _contentTxt(ctx){
        this.state.searchedText = txt;
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
            <Text style={stileGeneral.Title}>APP NAME</Text>
          </View>

          <View>
            <View style={stileGeneral.searchWrapper}>
              <TextInput style={stileGeneral.ricerca} onChangeText={(txt) => this._contentTxt(txt)} placeholder="cerca" onSubmitEditing={() => this._loadData()} onPress={this._getFarms()}/>
            </View>

          </View>
          
        </SafeAreaView>
      );
    }
  }
  
  const stileGeneral = StyleSheet.create({
    // #######
    Wrapper: {
        width: '100%',
        height: '100%',
        backgroundColor: '#08585E',
     },
  })