import React, { Component } from 'react';
import { Link, Redirect  } from 'react-router-dom';

export default class AvailableExams extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: true,
            pendingExams: []
        }
    }
    componentDidMount() {
        fetch(`${this.props.domain}/students/pendingExams`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + this.props.user.token
            },
            body: JSON.stringify({ id: this.props.user.userId })
        })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        pendingExams: result
                    });
                    console.log(result.rows)
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        if (this.props.user.role!=="students") {
            alert("Forbidden")
            return <Redirect to="/"/>
        } else if (this.state.error) {
            return <div>Error happened</div>;
        } else if (!this.state.isLoaded) {
            return <h5>Loading...</h5>;
        } else {
            return (
                <div className="container mt-4">
                    <Link to="/"><button className="btn btn-outline-secondary">Back to menu</button></Link><br/>
                    <h2 className="my-4">Pending Exams</h2>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Exam id</th>
                                <th scope="col">Exam name</th>
                                <th scope="col">Number of questions</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.pendingExams.map((item, index) =>
                                <tr key={index}>
                                    <th scope="col">{item.id}</th>
                                    <td>{item.name}</td>
                                    <td>{item.numberOfQuestions}</td>
                                    <td>
                                        <Link to={{
                                            pathname: '/takeExam',
                                            state: {
                                                examId: item.id
                                            }
                                        }}><button className="btn btn-outline-primary">Take</button>
                                        </Link>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <br/>
                </div>
            )
        }
    }
}
