import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import Weather from './Weather'
/**
 * 1. React-native는 React와 다르게 return 할 수 있는 Component가 정해저 있다.
 * 2. ex) <View/> : ios -> object-c / android -> java로 변한다.
 */

const API_KEY = "f130d8a69932fb68ab6e7f1fde4cf132";

export default class App extends Component {
  state = {
    isLoaded: false,
    error: null,
    temperature: null,
    name: null
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this._getWeather(position.coords.latitude, position.coords.longitude)
      },
      error => {
        this.setState({
          error
        })
      }
    )
  }

  _getWeather = (lat, long) => {
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&APPID=${API_KEY}`)
    .then(response => response.json())
    .then(json => {
      this.setState({
        temperature: json.main.temp,
        name: json.weather[0].main,
        isLoaded: true
      })
    })
  }

  render() {
    const { isLoaded, error, temperature, name } = this.state

    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        {
          isLoaded ? (
            <Weather weatherName={name} temp={Math.floor(temperature - 273.15)}/>
          ) : (
            <View style={styles.loading}>
              <Text style={styles.loadingText}>Getting the weather</Text>
              {error ? <Text style={styles.error}>{error}</Text> : null}
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
  error: {
    color: 'red',
    backgroundColor: 'transparent',
    marginBottom: 40
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
