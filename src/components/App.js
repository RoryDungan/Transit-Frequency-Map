import React, { Component } from 'react'

import MapContainer from './MapContainer'
import Controls from './Controls'

import cities from './cities.json'

import './App.css'

const defaultCity = 'sydney'
const defaultTime = 'allday'
const defaultFrequency = 15

const availableFrequencies = [10, 15, 20]

const availableTimes = {
  allday: 'All day',
  night: 'Night',
}

class App extends Component {
  constructor() {
    super()

    this.state = {
      city: defaultCity,
      time: defaultTime,
      frequency: defaultFrequency,
      loading: true,
      geoJson: undefined,
    }
  }

  componentDidMount() {
    this.setDisplay(defaultCity, defaultTime, defaultFrequency)
  }

  componentWillUnmount() {
    this.shouldCancel = true
  }

  componentDidUpdate(prevProps) {
    if (
      !this.props.match.params.city ||
      this.props.match.params.city === prevProps.match.params.city ||
      this.props.match.params.city === this.state.city
    ) {
      return
    }

    this.setCity(this.props.match.params.city)
  }

  async setDisplay(cityId, time, frequency) {
    this.setState({
      ...this.state,
      city: cityId,
      time: time,
      frequency: frequency,
      loading: true,
      geoJson: undefined,
    })
    const geoJson = await this.props.cityService.getCityData(
      cityId,
      time,
      frequency
    )

    if (this.shouldCancel) {
      return
    }

    this.setState({
      ...this.state,
      loading: false,
      geoJson,
    })

    this.props.history.push(cityId)
  }

  setCity(newCity) {
    if (this.state.city === newCity) {
      return
    }

    this.setDisplay(newCity, this.state.time, this.state.frequency)
  }

  setFrequency(newFrequency) {
    if (this.state.frequency === newFrequency) {
      return
    }

    this.setDisplay(this.state.city, this.state.time, newFrequency)
  }

  setTime(newTime) {
    if (this.state.time === newTime) {
      return
    }

    this.setDisplay(this.state.city, newTime, this.state.frequency)
  }

  render() {
    return (
      <div className="App">
        <Controls
          cities={cities}
          selectedCity={this.state.city}
          setCity={(newCity) => this.setCity(newCity)}
          frequencies={availableFrequencies}
          selectedFrequency={this.state.frequency}
          setFrequency={(f) => this.setFrequency(f)}
          times={availableTimes}
          selectedTime={this.state.time}
          setTime={(newTime) => this.setTime(newTime)}
          disabled={this.state.loading}
        />
        <MapContainer
          position={cities[this.state.city].position}
          geoJson={this.state.geoJson}
          loading={this.state.loading}
        />
      </div>
    )
  }
}

export default App
