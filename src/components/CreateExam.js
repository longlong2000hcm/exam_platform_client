import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'

export default class CreateExam extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            name: "",
            target: "",
            questionsArray: null,
            selectedQuestionArray: [],
            value: [],
            studentList: null
        };
    }

    componentDidMount() {
        fetch(`${this.props.domain}/teachers/getQuestions`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + this.props.user.token
            }
        })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        questionsArray: result.rows
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

    componentDidUpdate() {
        console.log(this.state.selectedQuestionArray);
    }

    toggleQuestionSelect = (event, index) => {
        let value = this.state.value;
        value[index] = event.target.checked;
        let selected = this.state.selectedQuestionArray;
        if (event.target.checked) {
            selected.push(parseInt(event.target.name));
        } else {
            selected.splice(selected.findIndex(k => k === event.target.name), 1);
        }
        this.setState({ value, selectedQuestionArray: selected });
    }

    nameChangeHandler = (event) => {
        event.preventDefault();
        this.setState({ name: event.target.value })
    }

    targetChangeHandler = (event) => {
        event.preventDefault();
        this.setState({ target: event.target.value })
    }

    submitHandler = async (event) => {
        event.preventDefault();
        let examObject = {
            "teacherId": this.props.user.userId,
            "name": this.state.name,
            "questionsList": this.state.selectedQuestionArray,
            "target": this.state.target
        }
        if (examObject.name.length > 0
            && examObject.target.length > 0
            && (examObject.target === "all" || typeof parseInt(examObject.target) === "number")
            && examObject.questionsList.length > 0) {
            await fetch(`${this.props.domain}/teachers/createExam`, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + this.props.user.token
                },
                body: JSON.stringify(examObject)
            })
                .then(res => res.json())
                .then(result => {
                    console.log(result);
                    alert("Exam created");
                    this.setState({
                        name: "",
                        target: "",
                        selectedQuestionArray: [],
                        value: []
                    })
                })
                .catch(err => console.log(err));
        }
        else {
            alert("Some fields are not filled correctly")
        }
    }

    getStudentsList = (event) => {
        event.preventDefault();
        fetch(`${this.props.domain}/students`, {
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
                this.setState({ studentList: result.rows })
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
                        <h2>Create Exam</h2>
                        <form onSubmit={this.submitHandler}>
                            <div className="form-row">
                                <div className="col-3">Exam name:</div>
                                <input className="form-control col" type="text" value={this.state.name} onChange={this.nameChangeHandler}></input>
                            </div>
                            <div className="form-row">
                                <div className="col-3">Target:</div>
                                <input className="form-control col" type="text" value={this.state.target} onChange={this.targetChangeHandler}></input>
                            </div>
                            <small>Target can only be "all" or a student's id</small>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col"></th>
                                        <th scope="col">Category</th>
                                        <th scope="col">Question</th>
                                    </tr>
                                </thead>
                                {this.state.questionsArray.map((e, index) =>
                                    <tr key={index}>
                                        <td>
                                            <input
                                                name={e.id}
                                                type="checkbox"
                                                checked={this.state.value[index]}
                                                onChange={event => { this.toggleQuestionSelect(event, index) }}
                                            />
                                        </td>
                                        <td>{e.category}</td>
                                        <td>{e.question}</td>
                                    </tr>

                                )}
                            </table>
                            <button className="btn btn-primary" type="submit">Create exam</button>
                        </form>
                        <br />
                        <hr></hr>
                        {this.state.studentList === null ? <button className="btn btn-outline-secondary" onClick={this.getStudentsList}>Get students list</button> : null}
                        <table className="table">
                            <thead>
                                {this.state.studentList === null ? null :
                                    <tr>
                                        <th scope="col">Student id</th>
                                        <th scope="col">Student username</th>
                                    </tr>
                                }
                            </thead>
                            <tbody>
                                {this.state.studentList === null ? null : this.state.studentList.map((e, index) =>
                                    <tr key={index}>
                                        <td>{e.id}</td>
                                        <td>{e.username}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )
            }

    }
}
