import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Table, Row } from 'react-native-table-component';

export default class EditFarmer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['Jour', 'Horaires', 'Activité'],
      tableWidth: [100, 120, 120]
    }
  };

  render() {
    const { route, navigation } = this.props;
    const { item } = route.params;
    const { FarmSchedules } = route.params.item;
    console.log(FarmSchedules);

    const tableRow = FarmSchedules.map(item => (
      [
        item.day,
        `${item.start_time.replace(/^0(?:0:0?)?/, '')} à ${item.end_time.replace(/^0(?:0:0?)?/, '')}`,
        item.activity
      ]
    ));
    // console.log(tableRow);

    return (
      <View style={styles.MainContainer}>
        <ScrollView horizontal={true}>
          <View>
            <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
              <Row data={this.state.tableHead} widthArr={this.state.tableWidth} style={{height: 50, backgroundColor: '#447604'}} textStyle={{textAlign: 'center', fontWeight: '100', textTransform: 'uppercase', color: '#fff'}}/>
            </Table>
            <ScrollView style={styles1.dataWrapper}>
              <Table borderStyle={{borderWidth: 1, borderColor: '#ddd'}}>
              {
                tableRow.map((rowData, index) => (
                  <Row
                    key={index}
                    data={rowData}
                    widthArr={this.state.tableWidth}
                    style={[styles1.row, index%2 && {backgroundColor: '#6CC551'}]}
                    textStyle={styles1.text}
                  />
                ))
              }
              </Table>
            </ScrollView>
          </View>
        </ScrollView>

        {/* back to farm details */}
        <View style={styles.TouchableOpacityContainer}>
          <TouchableOpacity
            activeOpacity = { .4 }
            style={styles.TouchableOpacityStyle}
            onPress={() => { navigation.navigate('FarmDetails'); }}
          >
            <Text style={styles.TextStyle}>Retourner à la Ferme</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles1 = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    padding: 16,
    paddingTop: 30,
    backgroundColor: '#fff'
  },
  header: {
    height: 50,
    backgroundColor: '#537791'
  },
  text: {
    textAlign: 'center',
    fontWeight: '100'
  },
  dataWrapper: {
    marginTop: -1
  },
  row: {
    height: 40,
    backgroundColor: '#9CFCDE'
  }
});

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
  TouchableOpacityContainer: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: 5,
    backgroundColor: '#fff'
  },
  TouchableOpacitySubmitStyle: {
    paddingTop: 20,
    paddingBottom: 20,
    borderRadius: 5,
    marginBottom: 10,
    width: '90%',
    backgroundColor: '#52AD9C'
  },
  TouchableOpacityStyle: {
    paddingTop: 20,
    paddingBottom: 20,
    borderRadius: 5,
    marginBottom: 10,
    width: '90%',
    backgroundColor: '#00BCD4'
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
  TextStyle: {
    color:'#fff',
    textAlign:'center',
    textTransform: 'uppercase'
  },
});
