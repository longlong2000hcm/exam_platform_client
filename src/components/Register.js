import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            role: "students",
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
            await fetch(`${this.props.domain}/${this.state.role}`, {
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
                    alert("Registration success!")
                })
                .catch(err => {
                    console.log(err);
                    alert("An error occured: ", err)
                });
        }
        console.log(this.props.user);
    }

    render() {
        return (
            <div className="container mt-4">
                <h2>Register</h2>
                <form onSubmit={this.handleSubmit} >
                    <div className="form-group">
                        <label>Username:</label>
                        <input type="text" className="form-control" value={this.state.username} placeholder="Username" onChange={this.usernameChangeHandler} />
                    </div>
                    <div className="form-group">
                        <label>Password:</label>
                        <input type="text" className="form-control" value={this.state.password} placeholder="Password" onChange={this.passwordChangeHandler} />
                    </div>
                    <div className="form-group">
                        <label>Your role: </label>
                        <select className="form-control" value={this.state.role} onChange={this.roleChangeHandler}>
                            <option value="students">student</option>
                            <option value="teachers">teacher</option>
                        </select>
                    </div>
                    <div>
                        <input className="btn btn-primary" type="submit" value="Register" />
                    </div>
                    <div className="mt-4">
                        <Link to="/" ><button className="btn">Go to login page</button></Link>
                    </div>

                </form >
            </div>
        )
    }
}

