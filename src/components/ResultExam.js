import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'

export default class ResultExam extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
        }
    }
    componentDidMount() {
        if (this.props.location.result === undefined) {
            this.setState({ error: true })
        }
        if (this.props.location.result) {
            this.setState({ isLoaded: true })
        }
    }
    render() {
        if (this.props.user.role !== "students") {
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
                        <h2>Exam result</h2>
                        <div>Score: <b>{this.props.location.result.score}</b></div>
                        <div>Submit time: {this.props.location.result.date}</div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Question No</th>
                                    <th scope="col">Your answer</th>
                                    <th scope="col">Correct answer</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.location.result.studentAnswers.map((e, index) =>
                                    <tr>
                                        <th scope="col">{index + 1}</th>
                                        <td>{e.studentAnswerContent}</td>
                                        <td>{e.correctAnswerContent}</td>
                                    </tr>)}
                            </tbody>
                        </table>
                        <br />
                    </div>
                )
            }
    }
}
