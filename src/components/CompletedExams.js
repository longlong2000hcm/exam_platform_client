import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'

export default class CompletedExams extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            data: null
        }
    }
    componentDidMount() {
        fetch(`${this.props.domain}/students/getCompletedResults`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + this.props.user.token
            },
            body: JSON.stringify({
                id: this.props.user.userId
            })
        })
            .then(res => res.json())
            .then(result => {
                console.log(result);
                this.setState({ isLoaded: true, data: result.rows })
            })
            .catch(err => console.log(err));

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
                        <Link to="/"><button>Back to menu</button></Link><br />
                        <h1>Completed Exams</h1>
                        <table>
                            <thead>
                                <tr>
                                    <th>Result id</th>
                                    <th>Exam id</th>
                                    <th>Score</th>
                                    <th>Date completed</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.data.map((e, index) =>
                                    <tr key={index}>
                                        <td>{e.id}</td>
                                        <td>{e.examId}</td>
                                        <td>{e.score}</td>
                                        <td>{e.date}</td>
                                    </tr>)}
                            </tbody>
                        </table>
                        <br />
                    </>
                )
            }
    }
}
