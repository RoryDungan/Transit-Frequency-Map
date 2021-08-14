import React from 'react'

import { MapContainer, TileLayer, GeoJSON, ZoomControl } from 'react-leaflet'

import './MapContainer.css'
import 'leaflet/dist/leaflet.css'
import { Layout, Spin } from 'antd'

const { Content } = Layout

export default function MyMapContainer(props) {
  return (
    <Content style={{display: 'flex'}}>
      <MapContainer className="Map" zoom={12} zoomControl={false} center={props.position}>
        <ZoomControl position="topright"/>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {props.geoJson ? (
          <GeoJSON className="GeoJSON" data={props.geoJson} />
        ) : undefined}
      </MapContainer>

      {props.loading ? (
        <div className="LoadingSpinner">
          <Spin size="large" />
        </div>
      ) : undefined}
    </Content>
  )
}
