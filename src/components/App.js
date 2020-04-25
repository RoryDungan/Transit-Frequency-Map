import React, { Component } from 'react'

import MapContainer from './MapContainer'
import Controls from './Controls'

import cities from './cities.json'

import './App.css'

const defaultCity = 'sydney'

class App extends Component {
  constructor() {
    super()

    this.state = {
      city: defaultCity,
      position: cities[defaultCity],
      loading: true,
      geoJson: undefined,
    }
  }

  componentDidMount() {
    this.setCity(defaultCity)
  }

  componentWillUnmount() {
    this.shouldCancel = true
  }

  async setCity(cityId) {
    this.setState({
      ...this.state,
      city: cityId,
      position: cities[cityId],
      loading: true,
      // geoJson: undefined,
    })
    const geoJson = await this.props.cityService.getCityData(cityId)

    if (this.shouldCancel) {
      return
    }

    this.setState({
      ...this.state,
      loading: false,
      geoJson,
    })
  }

  render() {
    return (
      <div className="App">
        <Controls />
        <MapContainer
          position={this.state.position}
          geoJson={this.state.geoJson}
          // geoJson={sydney}
        />
      </div>
    )
  }
}

export default App
