import React from 'react'

import './Controls.css'
import { Select, Space } from 'antd'

const { Option } = Select

export default function Controls(props) {
  return (
    <div className="Controls">
      <Space>
        <Select
          className="CitySelect"
          value={props.selectedCity}
          onChange={(evt) => props.setCity(evt)}
        >
          {Object.keys(props.cities).map((c) => (
            <Option value={c} key={c}>
              {props.cities[c].name}
            </Option>
          ))}
        </Select>

        <Select
          className="FrequencySelect"
          value={props.selectedFrequency}
          onChange={(evt) => props.setFrequency(evt)}
        >
          {props.frequencies.map((f) => (
            <Option value={f} key={f}>
              Every {f} minutes
            </Option>
          ))}
        </Select>
      </Space>
    </div>
  )
}
