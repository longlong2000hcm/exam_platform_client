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
                    <>
                        <h1>Exam result</h1>
                        <div>Score: <b>{this.props.location.result.score}</b></div>
                        <div>Submit time: {this.props.location.result.date}</div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Question No</th>
                                    <th>Your answer</th>
                                    <th>Correct answer</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.location.result.studentAnswers.map((e, index) =>
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{e.studentAnswerContent}</td>
                                        <td>{e.correctAnswerContent}</td>
                                    </tr>)}
                            </tbody>
                        </table>
                        <br />
                        <Link to="/"><button>Back to menu</button></Link>
                    </>
                )
            }
    }
}
