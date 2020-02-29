import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import CreateQuestion from "./components/CreateQuestion";
import CreateExam from "./components/CreateExam";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      domain: "http://localhost:4000",
      user: {
        userId: null,
        role: "students",
        //token: null,
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ0ZWFjaGVyMSIsInBhc3N3b3JkIjoiJDJiJDA0JEI5RUJaSlRIWTJjVEIua083d0tySE80MkFrN2VGRi5JY3FRSjZtU1lHZ3c0TXQwM0RxU1ZPIiwiaWF0IjoxNTgyOTg3MzMzLCJleHAiOjE1ODM1OTIxMzN9.weRw48MYC9WXIb9zmTGA58Qi2lP3r4_gJ9CUxA90Rjw"
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
          <Route
            path="/createQuestions"
            exact
            render={routerProps => (
              <CreateQuestion {...routerProps}
                domain={this.state.domain} user={this.state.user}
              />
            )}
          />
          <Route
            path="/createExams"
            exact
            render={routerProps => (
              <CreateExam {...routerProps}
                domain={this.state.domain} user={this.state.user}
              />
            )}
          />
        </Router>
      </>
    )
  }
}