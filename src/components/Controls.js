import React from 'react'

import './Controls.css'
import { Select, Space, Radio } from 'antd'

const { Option } = Select

export default function Controls(props) {
  return (
    <div className="Controls">
      <Space>
        <Select
          className="CitySelect"
          showSearch
          value={props.selectedCity}
          disabled={props.disabled}
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
          disabled={props.disabled}
          onChange={(evt) => props.setFrequency(evt)}
        >
          {props.frequencies.map((f) => (
            <Option value={f} key={f}>
              Every {f} minutes
            </Option>
          ))}
        </Select>

        <Radio.Group
          onChange={(evt) => props.setTime(evt.target.value)}
          value={props.selectedTime}
          disabled={props.disabled}
        >
          {Object.keys(props.times).map((t) => (
            <Radio.Button key={t} value={t}>
              {props.times[t]}
            </Radio.Button>
          ))}
        </Radio.Group>
      </Space>
    </div>
  )
}
