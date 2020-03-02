import React, { Component } from 'react'
import { Link, Redirect, withRouter } from 'react-router-dom'

class StudentMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    render() {
        return (
            <div className="container mt-4">
                <h2>Student's menu</h2>
                <div className="my-3">
                <Link to="/availableExams"><button className="btn btn-primary">Available exams</button></Link>
                </div>
                <div>
                <Link to="/completedExams"><button className="btn btn-info">Completed exams</button></Link>
                </div>
                
            </div>
        )
    }
}

export default withRouter(StudentMenu);