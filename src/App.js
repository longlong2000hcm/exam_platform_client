import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      domain: "http://localhost:4000",
      user: {
        userId: null,
        role: "students",
        token: null
      }
    }
  }
  userIdChangeHandler = (userId) => {
    this.setState({ user: { ...this.state.user, userId: userId } })
  }
  tokenChangeHandler = (token) => {
    this.setState({ user: { ...this.state.user, token: token } })
  }
  roleChangeHandler = (e) => {
    this.setState({ user: { ...this.state.user, role: e.target.value } })
  }
  render() {
    return (
      <>
        <Router>
          <Route
            path="/"
            exact
            render={routerProps => (
              <Login {...routerProps}
                domain={this.state.domain} user={this.state.user}
                userIdChangeHandler={this.userIdChangeHandler}
                tokenChangeHandler={this.tokenChangeHandler}
                roleChangeHandler={this.roleChangeHandler}
              />
            )}
          />
          <Route
            path="/register"
            exact
            render={routerProps => (
              <Register {...routerProps}
                domain={this.state.domain} user={this.state.user}
                roleChangeHandler={this.roleChangeHandler}
              />
            )}
          />
        </Router>
      </>
    )
  }
}