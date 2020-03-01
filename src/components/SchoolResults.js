import React, { Component } from 'react'
import { Link } from 'react-router-dom'

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
            return (
                <>
                    <Link to="/"><button>Back to menu</button></Link><br />
                    <h1>School results</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>Result id</th>
                                <th>Exam id</th>
                                <th>Student id</th>
                                <th>Student username</th>
                                <th>Score</th>
                                <th>Date completed</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.data.map((e, index) =>
                                <tr key={index}>
                                    <td>{e.id}</td>
                                    <td>{e.examId}</td>
                                    <td>{e.studentId}</td>
                                    <td>{e.studentUsername}</td>
                                    <td>{e.score}</td>
                                    <td>{e.date}</td>
                                    <td><Link to={{
                                        pathname: '/individualResults',
                                        id: e.id
                                    }}
                                    >View details</Link>
                                    </td>
                                </tr>)}
                        </tbody>
                    </table>
                    <br />
                </>
            )
        }
    }
}
