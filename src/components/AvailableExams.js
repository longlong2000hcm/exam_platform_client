import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
        if (this.state.error) {
            return <div>Error happened</div>;
        } else if (!this.state.isLoaded) {
            return <h5>Loading...</h5>;
        } else {
            return (
                <>
                    <h2>Pending Exams</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Exam id</th>
                                <th>Exam name</th>
                                <th>Number of questions</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.pendingExams.map((item, index) =>
                                <tr key={index}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.numberOfQuestions}</td>
                                    <td>
                                        <Link to={{
                                            pathname: '/takeExam',
                                            state: {
                                                examId: item.id
                                            }
                                        }}><button>Take</button>
                                        </Link>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <br/>
                    <Link to="/"><button>Back to menu</button></Link>
                </>
            )
        }
    }
}
