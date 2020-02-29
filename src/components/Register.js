import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            role: "students"
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
    handleSubmit = (event) => {
        event.preventDefault();
        if (this.state.username.length > 0 && this.state.password.length > 0) {
            fetch(`${this.props.domain}/${this.state.role}`)
                .then(res => res.json())
                .then(
                    (result) => {
                        this.setState({
                            isLoaded: true,
                            items: result.items
                        });
                    },
                    // Note: it's important to handle errors here
                    // instead of a catch() block so that we don't swallow
                    // exceptions from actual bugs in components.
                    // (error) => {
                    //     this.setState({
                    //         isLoaded: true,
                    //         error
                    //     });
                    // }
                )
        }

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
                    <select defaultValue="student" onChange={this.roleChangeHandler}>
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

