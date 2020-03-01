import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'

export default class createExamWithCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            name: "",
            target: "",
            category: "",
            numberOfQuestions: 0,
            questionCategories: [],
            studentList: null
        };
    }

    componentDidMount() {
        fetch(`${this.props.domain}/teachers/questionCategories`, {
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
                        questionCategories: result.rows
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

    inputChangeHandler = (event) => {
        event.preventDefault();
        this.setState({ [event.target.name]: event.target.value });
    }

    submitHandler = async (event) => {
        event.preventDefault();
        let examObject = {
            "teacherId": this.props.user.userId,
            "name": this.state.name,
            "category": this.state.category,
            "numberOfQuestions": this.state.numberOfQuestions,
            "target": this.state.target
        }
        if (examObject.name.length > 0
            && examObject.target.length > 0
            && (examObject.target === "all" || typeof parseInt(examObject.target) === "number")
            && examObject.category.length > 0
            && examObject.numberOfQuestions > 0) {
            await fetch(`${this.props.domain}/teachers/createExamWithCategory`, {
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
                    if (result.code === 1) {
                        alert("Exam created");
                        this.setState({
                            name: "",
                            target: "",
                            category: "",
                            numberOfQuestions: 0,
                        })
                    } else if (result.code===0 && result.err==="Number of questions selected is greater than number of questions in the database") {
                        alert(result.err);
                    }
                    else {
                        alert("Something went wrong")
                    }
                })
                .catch(err => {
                    console.log(err);
                    alert("Something went wrong");
                });
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
        if (this.props.user.role!=="teachers") {
            alert("Forbidden")
            return <Redirect to="/"/>
        } else
        if (this.state.error) {
            return <div>Error happened</div>;
        } else if (!this.state.isLoaded) {
            return <h5>Loading...</h5>;
        } else {
            return (
                <>
                    <Link to="/"><button>Back to menu</button></Link><br />
                    <h2>Create Exam with category</h2>
                    <form onSubmit={this.submitHandler}>
                        <div>Exam name: <input type="text" name="name" value={this.state.name} onChange={this.inputChangeHandler}></input></div>
                        <hr />
                        <div>Category:
                        <select name="category" defaultValue={this.state.questionCategories[0]} value={this.state.category} onChange={this.inputChangeHandler}>
                                {this.state.questionCategories.map((e, index) => <option value={e} key={index}>{e}</option>)}
                            </select>
                        </div>
                        <hr />
                        <div>Number of questions: <input type="number" name="numberOfQuestions" value={this.state.numberOfQuestions} onChange={this.inputChangeHandler}></input></div>
                        <hr />
                        <div>Target: <input type="text" name="target" value={this.state.target} onChange={this.inputChangeHandler}></input></div>
                        <small>Target can only be "all" or a student's id</small>
                        <hr />
                        <button type="submit">Create exam</button>
                    </form>
                    <br />
                    <hr></hr>
                    {this.state.studentList === null ? <button onClick={this.getStudentsList}>Get students list</button> : null}
                    <table>
                        <thead>
                            {this.state.studentList === null ? null : <tr><th>Student id</th><th>Student username</th></tr>}
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
                </>
            )
        }

    }
}
