import React from "react"

export default class UsersSession extends React.Component {
  render () {
    const { userLoggedIn, userSignInRoute, userSignOutRoute } = this.props
    return (
      <React.Fragment>
        {!userLoggedIn &&
          <div>
            <h3>You are not signed in! Please Sign In or Sign Up to manage your own Flashcards!</h3>
            <div>
              <a href={ userSignInRoute }>Sign In or Sign Up</a>
            </div>
          </div>
        }
        {userLoggedIn &&
          <div>
            <h3>You are signed in!</h3>
            <div>
              <a href={ userSignOutRoute }>Sign Out</a>
            </div>
          </div>
        }
      </React.Fragment>
    );
  }
}
