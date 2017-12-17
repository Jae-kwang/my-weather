import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import Weather from './Weather'
/**
 * 1. React-native는 React와 다르게 return 할 수 있는 Component가 정해저 있다.
 * 2. ex) <View/> : ios -> object-c / android -> java로 변한다.
 */
export default class App extends Component {
  state = {
    isLoaded: false
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          isLoaded: true
        })
      },
      error => {
        console.log(error);
      }
    )
  }
  render() {
    const { isLoaded } = this.state

    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        {
          isLoaded ? (
            <Weather />
          ) : (
            <View style={styles.loading}>
              <Text style={styles.loadingText}>Getting the weather</Text>
            </View>
          )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  loading: {
    flex: 1,
    backgroundColor: '#FDF6AA',
    justifyContent: 'flex-end',
    paddingLeft: 25,
  },
  loadingText: {
    fontSize: 38,
    marginBottom: 24,
  }
});
