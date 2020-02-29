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
        username: null,
        token: null
      }
    }
  }
  userIdChangeHandler = (userId) => {
    this.setState({user:{ ...this.state.user, userId: userId}})
  }
  tokenChangeHandler = (token) => {
    this.setState({user:{ ...this.state.user, token: token}})
  }
  render() {
    return (
     <>
     <Router>
          <Route
            path="/"
            exact
            render={routerProps => (
              <Login {...routerProps} domain={this.state.domain} user={this.state.user} />
            )}
          />
           <Route
            path="/register"
            exact
            render={routerProps => (
              <Register {...routerProps} domain={this.state.domain} user={this.state.user} />
            )}
          />
          </Router>
     </>
    )
  }
}