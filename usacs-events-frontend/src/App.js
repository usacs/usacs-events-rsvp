import React from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

import EventsList from './components/EventsList.js'
import EventPage from './components/EventPage.js'
import AdminDashboard from './components/Admin/AdminDashboard.js'
import RegisterRSVP from './components/RegisterRSVP.js'
import './App.css'

export default class App extends React.Component {
  render(){
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={EventsList} />
          <Route exact path="/admin" component={AdminDashboard} />
          <Route exact path="/register" component={RegisterRSVP} />
          <Route exact path="/:id" component={EventPage} />
        </Switch>
      </Router>
    );
  }
}