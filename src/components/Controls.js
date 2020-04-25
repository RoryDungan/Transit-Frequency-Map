import React from 'react'

import './Controls.css'

export default function Controls(props) {
  return (
    <div className="Controls">
      <select>
        {Object.keys(props.cities).map((c) => (
          <option value={c} key={c}>
            {props.cities[c].name}
          </option>
        ))}
      </select>

      <select
        value={props.selectedFrequency}
        onChange={(evt) => props.setFrequency(evt.target.value)}
      >
        {props.frequencies.map((f) => (
          <option value={f} key={f}>
            Every {f} minutes
          </option>
        ))}
      </select>
    </div>
  )
}
