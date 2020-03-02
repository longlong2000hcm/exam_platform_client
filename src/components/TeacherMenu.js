import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'

export default class TeacherMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    render() {
        if (this.props.user.role !== "teachers") {
            alert("Forbidden")
            return <Redirect to="/" />
        } else {
            return (
                <div className="container mt-4">
                    <h2>Teacher's menu</h2>
                    <div className="mt-3">
                        <Link to="/createQuestions">
                            <button className="btn btn-outline-success">Create questions</button>
                        </Link>
                    </div>
                    <div className="mt-3">
                        <Link to="/createExams">
                            <button className="btn btn-outline-success">Create exams</button>
                        </Link>
                    </div>
                    <div className="mt-3">
                        <Link to="/createExamsWithCategory">
                            <button className="btn btn-outline-primary">Create exams with category</button>
                        </Link>
                    </div>
                    <div className="mt-3">
                        <Link to="/schoolResults">
                            <button className="btn btn-outline-warning">School results</button>
                        </Link>
                    </div>
                </div>
            )
        }

    }
}
