import React from 'react'

import './Controls.css'

export default function Controls(props) {
  const cities = [
    'Sydney',
    'Brisbane',
    'Melbourne',
    'Canberra',
    'Gold Coast',
    'Adelaide',
  ]
  return (
    <div className="Controls">
      <select>
        {cities.map((c) => (
          <option value={c}>{c}</option>
        ))}
      </select>
    </div>
  )
}
