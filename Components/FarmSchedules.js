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
      widthArr: [100, 120, 120]
    }
  };

  render() {
    const { route, navigation } = this.props;
    const { item } = route.params;
    const { FarmSchedules } = route.params.item;
    const tableRow = FarmSchedules.map(item=>([item.day, item.start_time + ' à ' + item.end_time, item.activity]));
    // console.log(FarmSchedules);
    // console.log(tableRow);

    return (
      <View style={styles1.container}>
        <ScrollView horizontal={true}>
          <View>
            <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
              <Row data={this.state.tableHead} widthArr={this.state.widthArr} style={{height: 50}} textStyle={{textAlign: 'center', fontWeight: '100'}}/>
            </Table>
            <ScrollView style={styles1.dataWrapper}>
              <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
              {
                tableRow.map((rowData, index) => (
                  <Row
                    key={index}
                    data={rowData}
                    widthArr={this.state.widthArr}
                    style={[styles1.row, index%2 && {backgroundColor: '#F7F6E7'}]}
                    textStyle={styles1.text}
                  />
                ))
              }
              </Table>
            </ScrollView>
          </View>
        </ScrollView>

        {/* back to farm details */}
        <TouchableOpacity
          style={{ backgroundColor: '#FF0099'}}
          onPress={() => { navigation.navigate('FarmDetails'); }}
        >
          <Text style={styles.DataStyle}>Retourner à la Ferme</Text>
        </TouchableOpacity>
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
    backgroundColor: '#FF0000'
  },
  TouchableOpacityContainer: {
    flex: 1,
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

const styles1 = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  header: { height: 50, backgroundColor: '#537791' },
  text: { textAlign: 'center', fontWeight: '100' },
  dataWrapper: { marginTop: -1 },
  row: { height: 40, backgroundColor: '#E7E6E1' }
});
