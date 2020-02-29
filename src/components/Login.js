import React, { Component } from "react";
import { Link, useHistory  } from "react-router-dom";

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        }
    }
    usernameChangeHandler = (e) => {
        this.setState({ username: e.target.value })
    }
    passwordChangeHandler = (e) => {
        this.setState({ password: e.target.value })
    }
    handleSubmit = (event) => {
        event.preventDefault();
        if (this.state.username.length>0&&this.state.password.length>0) {
            console.log("username: ", this.state.username);
            console.log("password", this.state.password);
        }
    }
    goToRegister = (event) => {
        event.preventDefault();
    }

    render() {
        return (
            <>
            <h2>Login</h2>
            <form onSubmit={this.handleSubmit} >
                <label>Username:</label>
                <input type="text" value={this.state.username} onChange={this.usernameChangeHandler} />
                <br/>
                <label>Password:</label>
                <input type="text" value={this.state.password} onChange={this.passwordChangeHandler} />
                <br/>
                <input type="submit" value="Submit" />
                <div>Not registerd? Go to register!</div>
                <Link to="/register"><button>Register</button></Link>
            </form >
            </>
        )
    }
}

