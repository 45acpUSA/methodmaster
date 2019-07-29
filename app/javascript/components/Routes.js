import React from "react"
import PropTypes from "prop-types"
import { Route, Switch, Link } from 'react-router-dom'

//Routes
import Landing from './Landing'

class Routes extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      
    }
  }
  render () {
    const { 
      userLoggedIn,
      userSignInRoute,
      userSignOutRoute,
    } = this.props
    return (
      <React.Fragment>
        <Switch>
          <Route exact path='/' component={ Landing } />
        </Switch>
      </React.Fragment>
    );
  }
}

export default Routes
