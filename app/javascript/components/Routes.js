import React from "react"
import PropTypes from "prop-types"
import { Route, Switch, Link } from 'react-router-dom'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap'

//Routes
import Landing from './Landing'

class Routes extends React.Component {
  constructor(props) {
    super(props)
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    }
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  render () {
    const { 
      userLoggedIn,
      userSignInRoute,
      userSignOutRoute,
    } = this.props
    return (
      <React.Fragment>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Method Master</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Flashcards
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    Languages
                  </DropdownItem>
                  <DropdownItem>
                    Difficulty
                  </DropdownItem>
                  <DropdownItem>
                    Data Type
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    All
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <NavItem>
                <NavLink href="#">Playground</NavLink>
              </NavItem>
              {!userLoggedIn &&
              <NavItem>
                <NavLink href="#users/sign_in">Log In</NavLink>
              </NavItem>
              }
              {userLoggedIn &&
              <NavItem>
                <NavLink href="#">Log Out</NavLink>
              </NavItem>
              }
            </Nav>
          </Collapse>
        </Navbar>
        <Switch>
          <Route exact path='/' component={ Landing } />
        </Switch>
      </React.Fragment>
    );
  }
}

export default Routes
