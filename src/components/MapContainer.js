import React from 'react'

import { Map, TileLayer, GeoJSON } from 'react-leaflet'

import './MapContainer.css'
import 'leaflet/dist/leaflet.css'
import { Layout, Spin } from 'antd'

const { Content } = Layout

export default function MapContainer(props) {
  return (
    <Content style={{display: 'flex'}}>
      <Map className="Map" zoom={12} center={props.position}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {props.geoJson ? (
          <GeoJSON className="GeoJSON" data={props.geoJson} />
        ) : undefined}
      </Map>

      {props.loading ? (
        <div className="LoadingSpinner">
          <Spin size="large" />
        </div>
      ) : undefined}
    </Content>
  )
}
