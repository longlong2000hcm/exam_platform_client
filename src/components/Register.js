import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
        }
    }
    usernameChangeHandler = (e) => {
        this.setState({ username: e.target.value })
    }
    passwordChangeHandler = (e) => {
        this.setState({ password: e.target.value })
    }
    handleSubmit = async (event) => {
        event.preventDefault();
        if (this.state.username.length > 0 && this.state.password.length > 0) {
            await fetch(`${this.props.domain}/${this.props.user.role}`, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: this.state.username, password: this.state.password })
            })
                .then(res => res.json())
                .then(result => {
                    console.log(result);
                })
                .catch(err => console.log(err));
        }
        console.log(this.props.user);
    }

    render() {
        return (
            <>
                <h2>Register</h2>
                <form onSubmit={this.handleSubmit} >
                    <label>Username:</label>
                    <input type="text" value={this.state.username} onChange={this.usernameChangeHandler} />
                    <br />
                    <label>Password:</label>
                    <input type="text" value={this.state.password} onChange={this.passwordChangeHandler} />
                    <br />
                    <label>Your role: </label>
                    <select defaultValue="students" onChange={this.props.roleChangeHandler}>
                        <option value="students">student</option>
                        <option value="teachers">teacher</option>
                    </select>
                    <br />
                    <input type="submit" value="Submit" />
                </form >
            </>
        )
    }
}

