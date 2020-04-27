import React, { Component } from 'react'
import { Button, Modal } from 'antd'

import MapContainer from './MapContainer'
import Controls from './Controls'

import cities from './cities.json'

import './App.css'

const defaultCity = 'sydney'
const defaultTime = 'allday'
const defaultFrequency = 15

const availableFrequencies = [10, 15, 20]

const availableTimes = {
  allday: '7 AM to 10 PM',
  night: '10 PM to 12AM',
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
      introPopupVisible: true,
    }
  }

  componentDidMount() {
    this.setDisplay(
      this.props.match.params.city || defaultCity,
      this.props.match.params.time || defaultTime,
      parseInt(this.props.match.params.frequency) || defaultFrequency
    )
  }

  componentWillUnmount() {
    this.shouldCancel = true
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.match.params.city &&
      this.props.match.params.city !== prevProps.match.params.city &&
      this.props.match.params.city !== this.state.city
    ) {
      this.setCity(this.props.match.params.city)
    }

    if (
      this.props.match.params.time &&
      this.props.match.params.time !== prevProps.match.params.time &&
      this.props.match.params.time !== this.state.time
    ) {
      this.setTime(this.props.match.params.time)
    }

    if (
      this.props.match.params.frequency &&
      this.props.match.params.frequency !== prevProps.match.params.frequency &&
      this.props.match.params.frequency !== this.state.frequency
    ) {
      this.setFrequency(parseInt(this.props.match.params.frequency))
    }
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

    this.props.history.push(`/${cityId}/${time}/${frequency}`)
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

  setIntroPopupVisible(visible) {
    if (this.state.introPopupVisible === visible) {
      return
    }

    this.setState({ ...this.state, introPopupVisible: visible })
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
          showInfo={() => this.setIntroPopupVisible(true)}
        />
        <MapContainer
          position={cities[this.state.city].position}
          geoJson={this.state.geoJson}
          loading={this.state.loading}
        />

        <Modal
          title="Transit Frequency Map"
          visible={this.state.introPopupVisible}
          onCancel={() => this.setIntroPopupVisible(false)}
          footer={[
            <Button
              key="submit"
              onClick={() => this.setIntroPopupVisible(false)}
            >
              Okay
            </Button>,
          ]}
        >
          <p>Hello!</p>
        </Modal>
      </div>
    )
  }
}

export default App
