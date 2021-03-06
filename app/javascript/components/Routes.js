import React from "react"
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
  DropdownItem
} from 'reactstrap'
import '../../assets/stylesheets/flashcards.scss'

//Routes
import CPlusPlus from './languages/CPlusPlus'
import Javascript from './languages/Javascript'
import Landing from './Landing'
import LanguageSelector from './languages/LanguageSelector'
import Flashcards from './Flashcards'
import MyFlashcards from './MyFlashcards'
import NewFlashcard from './NewFlashcard'
import Python from './languages/Python'
import Ruby from './languages/Ruby'
import SingleFlashcard from './SingleFlashcard'
import UserProfile from './UserProfile'
import UsersSession from './UsersSession'

export default class Routes extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false,
      flashcards: [],
    }
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  componentDidMount = () => {
    fetch('/flashcards.json')
      .then(resp => resp.json())
      .then(data => this.setState({ flashcards: data }))
  }

  handleNewFlashcard = newFlashcards => {
    this.setState({ flashcards: newFlashcards })
  }

  handleDelete = id => {
    const { flashcards } = this.state
    let updatedFlashcards = flashcards.filter(value => value.id !== id)
    this.setState({ flashcards: updatedFlashcards })
  }

  render () {
    const {
      currentUser,
      userLoggedIn,
      userSignInRoute,
      userSignOutRoute,
    } = this.props

    const { flashcards } = this.state

    return (
      <React.Fragment>
        <Navbar light expand="md">
          <NavbarBrand href="/" id="brand">Method Master</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret id="mainNavbarItem">
                  Flashcards
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem href="#flashcards/languages/select" id="subNavbarItem">
                    Languages
                  </DropdownItem>
                  <DropdownItem href="#" id="subNavbarItem">
                    Difficulty
                  </DropdownItem>
                  <DropdownItem href="#" id="subNavbarItem">
                    Data Type
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem href="#flashcards" id="subNavbarItem">
                    All
                  </DropdownItem>
                  {userLoggedIn &&
                    <DropdownItem href={`#users/${currentUser.id}/flashcards`} id="subNavbarItem">
                      My Flashcards
                    </DropdownItem>
                  }
                </DropdownMenu>
              </UncontrolledDropdown>
              <NavItem>
                <NavLink href="#" id="mainNavbarItem">Playground</NavLink>
              </NavItem>
              {!userLoggedIn &&
                <NavItem>
                  <NavLink href="#users/session" id="mainNavbarItem">Sign In</NavLink>
                </NavItem>
              }
              {userLoggedIn &&
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret id="mainNavbarItem">
                    {currentUser.email}
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem href="#" id="subNavbarItem">
                      My Profile
                    </DropdownItem>
                    <DropdownItem href={`#users/${currentUser.id}/flashcards`} id="subNavbarItem">
                      My Flashcards
                    </DropdownItem>
                    <DropdownItem href={`#users/${currentUser.id}/newflashcard`} id="subNavbarItem">
                      Create Flashcards
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem href="#users/session" id="subNavbarItem">
                      Sign Out
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              }
            </Nav>
          </Collapse>
        </Navbar>


        <Switch>
          <Route exact path="/" component={ Landing } />

          <Route
            path="/flashcards/languages/select"
            render={
              props => 
              <LanguageSelector
                {...props}
                flashcards={ flashcards }
              />
            }
          />

          <Route
            path="/flashcards/languages/javascript"
            render={
              props =>
              <Javascript
                {...props}
                flashcards={ flashcards }
              />
            }
          />

          <Route
            path="/flashcards/languages/ruby"
            render={
              props =>
              <Ruby
                {...props}
                flashcards={ flashcards }
              />
            }
          />

          <Route
            path="/flashcards/languages/python"
            render={
              props =>
              <Python
                {...props}
                flashcards={ flashcards }
              />
            }
          />

          <Route
            path="/flashcards/languages/cplusplus"
            render={
              props =>
              <CPlusPlus
                {...props}
                flashcards={ flashcards }
              />
            }
          />

          <Route
            path="/flashcards"
            render={
              (props) =>
              <Flashcards
                {...props}
                flashcards={ flashcards }
              />
            }
          />

          <Route
            path="/flashcards/:id"
            render={
              props =>
              <SingleFlashcard
                {...props}
                flashcards={ flashcards }
              />
            }
          />

          <Route
            path={`/users/:user_id/flashcards`}
            render={
              props =>
              <MyFlashcards
                {...props}
                currentUser={ currentUser }
                userSignInRoute={ userSignInRoute }
                handleDelete={ this.handleDelete }
              />
            }
          />

          <Route
            path={`/users/:user_id/newflashcard`}
            render={
              props =>
              <NewFlashcard
                {...props}
                currentUser={ currentUser }
                handleNewFlashcard={ this.handleNewFlashcard }
              />
            }
          />

          <Route
            path={`/users/:user_id/editflashcard`}
            render={
              props =>
              <EditFlashcard
                {...props}
                flashcards={ flashcards }
              />
            }
          />

          <Route
            path="/users/session"
            render={
              props => 
              <UsersSession
              {...props}
              userLoggedIn={ userLoggedIn }
              userSignInRoute={ userSignInRoute }
              userSignOutRoute={ userSignOutRoute }
              />
            }
          />

          <Route path="/users/:id" component={ UserProfile } />

        </Switch>
      </React.Fragment>
    );
  }
}
