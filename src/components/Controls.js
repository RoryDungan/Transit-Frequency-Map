import React from 'react'

import './Controls.css'
import { Select, Space, Tooltip, Button, Divider } from 'antd'
import { InfoOutlined } from '@ant-design/icons'

const { Option } = Select

export default function Controls(props) {
  return (
    <Space className="Controls" direction="vertical" >
      <Select
        className="CitySelect"
        showSearch
        value={props.selectedCity}
        disabled={props.disabled}
        onChange={(evt) => props.setCity(evt)}
        style={{width: '100%'}}
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
        style={{width: '100%'}}
      >
        {props.frequencies.map((f) => (
          <Option value={f} key={f}>
            Every {f} minutes
          </Option>
        ))}
      </Select>

      <Select
        onChange={(evt) => props.setTime(evt)}
        value={props.selectedTime}
        disabled={props.disabled}
        style={{width: '100%'}}
      >
        {Object.keys(props.times).map((t) => (
          <Option key={t} value={t}>
            {props.times[t]}
          </Option>
        ))}
      </Select>

      <Divider/>

      <Tooltip title="About">
        <Button
          shape="round"
          icon={<InfoOutlined />}
          onClick={() => props.showInfo()}

        >
          About
        </Button>
      </Tooltip>
    </Space>
  )
}
