import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Search from './Components/search.js';
import GeneralSearch from './Components/generalSearch.js';

export default function App() {
  return (
    <View style={styles.container}>
      <GeneralSearch/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
