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
            await fetch(`${this.props.domain}/${this.state.role}/login`, {
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
                    this.setState({ redirect: true });
                })
                .catch(err => {
                    console.log(err);
                    alert("Wrong username, password or role.")
                });
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
            <div className="container mt-4">
                <h2>Login</h2>
                <form onSubmit={this.handleSubmit} >
                    <div className="form-group">
                        <label>Username:</label>
                        <input type="text" className="form-control" value={this.state.username} placeholder="Username" onChange={this.usernameChangeHandler} />
                    </div>
                    <div className="form-group">
                        <label>Password:</label>
                        <input type="password" className="form-control" value={this.state.password} placeholder="Password" onChange={this.passwordChangeHandler} />
                    </div>
                    <div className="form-group">
                        <label>Your role: </label>
                        <select className="form-control" value={this.state.role} onChange={this.roleChangeHandler}>
                            <option value="students">student</option>
                            <option value="teachers">teacher</option>
                        </select>
                    </div>
                    <input className="btn" type="submit" value="Login" />
                    <div className="mt-4 mb-2">Not registerd? Go to register!</div>
                    <Link to="/register"><button className="btn"> Register</button></Link>
                </form >
            </div>
        )
    }
}

