import React, { Component } from 'react'
import {Link} from 'react-router-dom'

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
        this.setState({correctAnswerNo: event.target.value})
    }
    handleSubmit = async (event) => {
        event.preventDefault();
        if (this.state.category.length>0
            &&this.state.question.length>0
            &&!this.state.answerOptions.find(element=>element.answer.length===0)) {
                await fetch(`${this.props.domain}/teachers/addQuestion`, {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': "Bearer "+this.props.user.token
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
        return (
            <>
                <Link to="/"><button>Back to menu</button></Link><br/>
                <h2>Create a question</h2>
                <form onSubmit={this.handleSubmit} >
                    <label>Category:</label>
                    <input type="text" value={this.state.category} onChange={this.categoryChangeHandler} />
                    <br />
                    <label>Question:</label>
                    <input type="text" value={this.state.question} onChange={this.questionChangeHandler} />
                    <br />
                    <br />
                    {this.state.answerOptions.map((option, index) =>
                        <div key={index}>
                            <span >Answer {this.state.answerOptions[index].answerNo}:</span>
                            <input type="text"
                                name={"answerNo" + this.state.answerOptions[index].answerNo}
                                value={this.state.answerOptions[index].answer}
                                onChange={this.answerChangeHandler} />
                        </div>
                    )}
                    <button onClick={this.addAnswer}>+</button><br />
                    <span>Correct answer: Answer &nbsp;</span>
                    <select defaultValue={this.state.answerOptions[0].answerNo} onChange={this.props.roleChangeHandler}>
                        {this.state.answerOptions.map((option,index)=>(
                            <option value={option.answerNo} key={index}>{option.answerNo}</option>
                        ))}
                    </select>
                    <br />
                    <br/>
                    <input type="submit" value="Create question" />
                    <br />
                </form >
            </>
        )
    }
}
