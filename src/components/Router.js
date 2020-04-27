import React from 'react'
import { HashRouter, Route } from 'react-router-dom'
import App from './App'

export default function Router(props) {
  return (
    <HashRouter>
      <Route
        path="/:city?/:time?/:frequency?"
        render={(routeProps) => (
          <App
            cityService={props.cityService}
            localStorage={props.localStorage}
            {...routeProps}
          />
        )}
      />
    </HashRouter>
  )
}
