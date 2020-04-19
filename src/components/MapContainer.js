import React from 'react'

import './MapContainer.css'
import 'leaflet/dist/leaflet.css'

import { Map, TileLayer, Marker, Popup } from 'react-leaflet'

export default function MapContainer(props) {
  const position = [-33.8688, 151.2093]
  return (
    <Map center={position} style={{ flex: '1 1 auto' }} zoom={12}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </Map>
  )
}
