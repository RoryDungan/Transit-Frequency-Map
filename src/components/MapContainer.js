import React from 'react'

import { Map, TileLayer, GeoJSON } from 'react-leaflet'

import './MapContainer.css'
import 'leaflet/dist/leaflet.css'

export default function MapContainer(props) {
  return (
    <Map center={props.position} style={{ flex: '1 1 auto' }} zoom={12}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {props.geoJson ? <GeoJSON data={props.geoJson} /> : undefined}
    </Map>
  )
}
