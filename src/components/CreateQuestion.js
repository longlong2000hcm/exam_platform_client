import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'

export default class CreateQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category: "",
            question: "",
            correctAnswerNo: 1,
            answerOptions: [{ "answerNo": 1, "answer": "" }]
        }
    }
    categoryChangeHandler = (event) => {
        event.preventDefault();
        this.setState({ category: event.target.value })
    }
    questionChangeHandler = (event) => {
        event.preventDefault();
        this.setState({ question: event.target.value })
    }
    answerChangeHandler = (event) => {
        event.preventDefault();
        let optionsArray = this.state.answerOptions;
        optionsArray[event.target.name.slice(8) - 1] = { "answerNo": event.target.name.slice(8), "answer": event.target.value }
        this.setState({ ...this.state, answerOptions: optionsArray })
    }
    addAnswer = (event) => {
        event.preventDefault();
        let optionsArray = this.state.answerOptions;
        optionsArray.push({ "answerNo": optionsArray.length + 1, "answer": "" })
        this.setState({ ...this.state, answerOptions: optionsArray })
    }
    correctAnswerChangeHandler = (event) => {
        event.preventDefault();
        this.setState({ correctAnswerNo: event.target.value })
    }
    handleSubmit = async (event) => {
        event.preventDefault();
        if (this.state.category.length > 0
            && this.state.question.length > 0
            && !this.state.answerOptions.find(element => element.answer.length === 0)) {
            await fetch(`${this.props.domain}/teachers/addQuestion`, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + this.props.user.token
                },
                body: JSON.stringify(this.state)
            })
                .then(res => res.json())
                .then(result => {
                    alert('Create question success!');
                    console.log(result);
                    this.setState({
                        category: "",
                        question: "",
                        correctAnswerNo: 1,
                        answerOptions: [{ "answerNo": 1, "answer": "" }]
                    });
                })
                .catch(err => console.log(err));
        }
        else {
            alert("Some fields are not filled correctly")
        }
    }
    render() {
        if (this.props.user.role !== "teachers") {
            alert("Forbidden")
            return <Redirect to="/" />
        } else {
            return (
                <div className="container mt-4">
                    <Link to="/"><button className="btn btn-outline-secondary">Back to menu</button></Link><br />
                    <h2>Create a question</h2>
                    <form onSubmit={this.handleSubmit} >
                        <div className="form-group">
                            <label>Category:</label>
                            <input type="text" className="form-control" placeholder="Category" value={this.state.category} onChange={this.categoryChangeHandler} />
                        </div>
                        <div className="form-group">
                            <label>Question:</label>
                            <input type="text" className="form-control" placeholder="Question" value={this.state.question} onChange={this.questionChangeHandler} />
                        </div>
                        <table className="table">
                            {this.state.answerOptions.map((option, index) =>
                                <tr key={index}>
                                    <td >Answer {this.state.answerOptions[index].answerNo}:</td>
                                    <td><input type="text"
                                        name={"answerNo" + this.state.answerOptions[index].answerNo}
                                        value={this.state.answerOptions[index].answer}
                                        onChange={this.answerChangeHandler} /></td>

                                </tr>
                            )}
                        </table>
                        <button className="btn btn-secondary" onClick={this.addAnswer}>+</button><br />
                        <div className="form-row">
                            <div className="col-3">Correct answer: Answer &nbsp;</div>
                            <div className="col-3">
                                <select class="form-control" defaultValue={this.state.answerOptions[0].answerNo} onChange={this.props.roleChangeHandler}>
                                    {this.state.answerOptions.map((option, index) => (
                                        <option value={option.answerNo} key={index}>{option.answerNo}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <br />
                        <input className="btn btn-primary" type="submit" value="Create question" />
                        <br />
                    </form >
                </div>
            )
        }
    }
}
