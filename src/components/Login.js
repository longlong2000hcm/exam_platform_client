import React, { Component } from "react";
import { Link, useHistory, Redirect } from "react-router-dom";

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            role: "students",
            redirect: false
        }
    }
    usernameChangeHandler = (e) => {
        this.setState({ username: e.target.value })
    }
    passwordChangeHandler = (e) => {
        this.setState({ password: e.target.value })
    }
    roleChangeHandler = (e) => {
        this.setState({ role: e.target.value })
    }
    handleSubmit = async (event) => {
        event.preventDefault();
        if (this.state.username.length > 0 && this.state.password.length > 0) {
            await fetch(`${this.props.domain}/${this.props.user.role}/login`, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: this.state.username, password: this.state.password })
            })
                .then(res => res.json())
                .then(result => {
                    this.props.userIdChangeHandler(result.user.id);
                    this.props.tokenChangeHandler(result.token);
                    this.props.roleChangeHandler(this.state.role);
                    this.setState({redirect: true});
                })
                .catch(err => console.log(err));
        }
        console.log(this.props.user);
        
    }
    goToRegister = (event) => {
        event.preventDefault();
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to="/"></Redirect>
        }
        return (
            <>
                <h2>Login</h2>
                <form onSubmit={this.handleSubmit} >
                    <label>Username:</label>
                    <input type="text" value={this.state.username} onChange={this.usernameChangeHandler} />
                    <br />
                    <label>Password:</label>
                    <input type="text" value={this.state.password} onChange={this.passwordChangeHandler} />
                    <br />
                    <label>Your role: </label>
                    <select value={this.state.role} onChange={this.roleChangeHandler}>
                        <option value="students">student</option>
                        <option value="teachers">teacher</option>
                    </select>
                    <br/>
                    <input type="submit" value="Login" />
                    <br/>
                    <div>Not registerd? Go to register!</div>
                    <Link to="/register"><button>Register</button></Link>
                </form >
            </>
        )
    }
}

