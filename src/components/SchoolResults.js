import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'

export default class SchoolResults extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            data: null
        }
    }
    componentDidMount() {
        fetch(`${this.props.domain}/teachers/examResults/`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + this.props.user.token
            },
        })
            .then(res => res.json())
            .then(result => {
                console.log(result);
                this.setState({ isLoaded: true, data: result.resultsArray })
            })
            .catch(err => console.log(err));

    }
    render() {
        if (this.state.error) {
            return <div>Error happened</div>;
        } else if (!this.state.isLoaded) {
            return <h5>Loading...</h5>;
        } else {
            if (this.props.user.role !== "teachers") {
                alert("Forbidden")
                return <Redirect to="/" />
            } else
                return (
                    <div className="container mt-4">
                        <Link to="/"><button className="btn btn-outline-secondary">Back to menu</button></Link><br />
                        <h2>School results</h2>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Result id</th>
                                    <th scope="col">Exam id</th>
                                    <th scope="col">Student id</th>
                                    <th scope="col">Student username</th>
                                    <th scope="col">Score</th>
                                    <th scope="col">Date completed</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.data.map((e, index) =>
                                    <tr key={index}>
                                        <th scope="col">{e.id}</th>
                                        <td>{e.examId}</td>
                                        <td>{e.studentId}</td>
                                        <td>{e.studentUsername}</td>
                                        <td>{e.score}</td>
                                        <td>{e.date}</td>
                                        <td><Link className="btn btn-link" to={{
                                            pathname: '/individualResults',
                                            id: e.id
                                        }}
                                        >View details</Link>
                                        </td>
                                    </tr>)}
                            </tbody>
                        </table>
                        <br />
                    </div>
                )
        }
    }
}
