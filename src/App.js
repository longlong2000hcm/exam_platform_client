import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import history from './components/history';
import Login from "./components/Login";
import Register from "./components/Register";
import CreateQuestion from "./components/CreateQuestion";
import CreateExam from "./components/CreateExam";
import TeacherMenu from "./components/TeacherMenu";
import StudentMenu from "./components/StudentMenu";
import TakeExam from "./components/TakeExam";
import AvailableExams from "./components/AvailableExams";
import ResultExam from "./components/ResultExam";
import CompletedExams from "./components/CompletedExams"
import SchoolResults from "./components/SchoolResults";
import IndividualResults from "./components/IndividualResults"
import CreateExamWithCategory from "./components/CreateExamWithCategory"


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      domain: "http://localhost:4000",
      user: {
        userId: null,
        role: "",
        token: "",
        //token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ0ZWFjaGVyMSIsInBhc3N3b3JkIjoiJDJiJDA0JEI5RUJaSlRIWTJjVEIua083d0tySE80MkFrN2VGRi5JY3FRSjZtU1lHZ3c0TXQwM0RxU1ZPIiwiaWF0IjoxNTgyOTg3MzMzLCJleHAiOjE1ODM1OTIxMzN9.weRw48MYC9WXIb9zmTGA58Qi2lP3r4_gJ9CUxA90Rjw",
        // userId: 4,
        // role: "students",
        // token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwid…UzNX0.cHMQHhu1On4yE8g5IUqT8R_fPjlun_QaGe-_9RlCOuw",
        examTaking: null
      },
      landingPage: routerProps => (
        <Login {...routerProps}
          domain={this.state.domain} user={this.state.user}
          userIdChangeHandler={this.userIdChangeHandler}
          tokenChangeHandler={this.tokenChangeHandler}
          roleChangeHandler={this.roleChangeHandler}
        />
      ),
      currentRoute: ""
    }
  }
  componentDidUpdate() {
    console.log(this.state.user)
    if (this.state.user.token.length > 0 && this.state.user.role === "teachers" && this.state.currentRoute !== "teachers") {
      this.setState({
        currentRoute: "teachers",
        landingPage: routerProps => (
          <TeacherMenu {...routerProps}
            domain={this.state.domain} user={this.state.user}
          />
        )
      })
    }
    if (this.state.user.token.length > 0 && this.state.user.role === "students" && this.state.currentRoute !== "students") {
      this.setState({
        currentRoute: "students",
        landingPage: routerProps => (
          <StudentMenu {...routerProps}
            domain={this.state.domain} user={this.state.user}
          />
        )
      })
    }
  }
  userIdChangeHandler = (userId) => {
    this.setState({ user: { ...this.state.user, userId: userId } })
  }
  tokenChangeHandler = (token) => {
    this.setState({ user: { ...this.state.user, token: token } })
  }
  roleChangeHandler = (role) => {
    this.setState({ user: { ...this.state.user, role: role } })
  }
  examTakingHandler = (examId) => {
    this.setState({ ...this.state.user, examTaking: examId })
    return <Redirect to="/takeExam"></Redirect>
  }
  render() {
    return (
      <>
        <Router>
          <Route
            path="/"
            exact
            render={this.state.landingPage}
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

          <Route
            path="/createExamsWithCategory"
            exact
            render={routerProps => (
              <CreateExamWithCategory {...routerProps}
                domain={this.state.domain} user={this.state.user}
              />
            )}
          />

          <Route
            path="/takeExam"
            exact
            render={routerProps => (
              <TakeExam {...routerProps}
                domain={this.state.domain} user={this.state.user}
                examTaking={this.state.user.examTaking}
              />
            )}
          />

          <Route
            path="/availableExams"
            exact
            render={routerProps => (
              <AvailableExams {...routerProps}
                domain={this.state.domain} user={this.state.user}
                examTakingHandler={this.examTakingHandler}
              />
            )}
          />

          <Route
            path="/resultExam"
            exact
            render={routerProps => (
              <ResultExam {...routerProps}
                domain={this.state.domain} user={this.state.user}
              />
            )}
          />

          <Route
            path="/completedExams"
            exact
            render={routerProps => (
              <CompletedExams {...routerProps}
                domain={this.state.domain} user={this.state.user}
              />
            )}
          />

          <Route
            path="/schoolResults"
            exact
            render={routerProps => (
              <SchoolResults {...routerProps}
                domain={this.state.domain} user={this.state.user}
              />
            )}
          />

          <Route
            path="/individualResults"
            exact
            render={routerProps => (
              <IndividualResults {...routerProps}
                domain={this.state.domain} user={this.state.user}
              />
            )}
          />

        </Router>
      </>
    )
  }
}