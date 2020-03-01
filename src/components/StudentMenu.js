import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'

export default class StudentMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    render() {
        if (this.props.user.role !== "students") {
            alert("Forbidden")
            return <Redirect to="/" />
        } else {
            return (
                <>
                    <h2>Student's menu</h2>
                    <Link to="/availableExams"><button>Available exams</button></Link>
                    <Link to="/completedExams"><button>Completed exams</button></Link>
                </>
            )
        }

    }
}
