import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'

export default class ResultExam extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            data: null
        }
    }
    componentDidMount() {
        fetch(`${this.props.domain}/teachers/examResults/${this.props.location.id}`, {
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
                this.setState({ isLoaded: true, data: result.results[0] })
            })
            .catch(err => console.log(err));
    }
    render() {
        if (this.props.user.role !== "teachers") {
            alert("Forbidden")
            return <Redirect to="/" />
        } else
            if (this.state.error) {
                return <div>Error happened</div>;
            } else if (!this.state.isLoaded) {
                return <h5>Loading...</h5>;
            } else {
                return (
                    <div className="container mt-4">
                        <Link to="/"><button className="btn btn-outline-secondary">Back to menu</button></Link><br />
                        <h2>Individual result</h2>
                        <div>Result id: {this.state.data.id}</div>
                        <div>Exam id: {this.state.data.examId}</div>
                        <div>Student id: {this.state.data.studentId}</div>
                        <div>Student username: {this.state.data.studentUsername}</div>
                        <div>Score: <b>{this.state.data.score}</b></div>
                        <div>Submit time: {this.state.data.date}</div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Question No</th>
                                    <th scope="col">Student's answer</th>
                                    <th scope="col">Correct answer</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.data.studentAnswers.map((e, index) =>
                                    <tr>
                                        <th scope="col">{index + 1}</th>
                                        <td>{e.studentAnswerContent}</td>
                                        <td>{e.correctAnswerContent}</td>
                                    </tr>)}
                            </tbody>
                        </table>
                        <br />
                        <Link to="/schoolResults"><button className="btn btn-outline-secondary">Back to School Results</button></Link>
                    </div>
                )
            }
    }
}
