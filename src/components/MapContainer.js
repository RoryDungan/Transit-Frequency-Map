import React from 'react'
import sydney from './15-min-stops.json'

import './MapContainer.css'
import 'leaflet/dist/leaflet.css'

import { Map, TileLayer, GeoJSON, Marker, Popup } from 'react-leaflet'

const geoJson = {
  type: 'FeatureCollection',
  features: sydney.map((p) => ({
    type: 'Point',
    coordinates: [p.x, p.y],
  })),
}

export default function MapContainer(props) {
  const position = [-33.8688, 151.2093]
  return (
    <Map center={position} style={{ flex: '1 1 auto' }} zoom={12}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <GeoJSON data={geoJson} />
    </Map>
  )
}
