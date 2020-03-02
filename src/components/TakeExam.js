import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom';

export default class TakeExam extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            examId: this.props.location.state.examId,
            questionList: [],
            answers: [],
            examReturned: false,
            examResult: null
        }
    }
    componentDidMount() {
        fetch(`${this.props.domain}/students/getExam`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                //'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwidXNlcm5hbWUiOiJzdHVkZW50MSIsInBhc3N3b3JkIjoiJDJiJDA0JDBoMXI5dkRnL3pGa2doM2RudUFNZWVIeHF0TGUzc1hPSUlYLlhtbzNOV3pwWjNoNDVrZnoyIiwicGVuZGluZ0V4YW1zIjoiMjAsMjEsMjIsMjMsMjQsMjUsMzAiLCJpYXQiOjE1ODI5NDIwMTgsImV4cCI6MTU4MzU0NjgxOH0.Z-Zm6DS3FwUd2hrhJ-TyY8uxxUQBG0zI11-VJJvNdwo"
                'Authorization': "Bearer " + this.props.user.token
            },
            body: JSON.stringify({ "examId": this.props.location.state.examId })
        })
            .then(res => res.json())
            .then(
                (result) => {
                    let _answer = [];
                    result.questionList.forEach(e => {
                        _answer.push({ questionId: e.questionId, answerNo: 0 })
                    })
                    this.setState({
                        isLoaded: true,
                        examId: result.examId,
                        questionList: result.questionList,
                        answers: _answer
                    });
                    console.log(result)
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    handleRadioChange = (event, questionId, answerNo) => {
        //event.target.checked=true;
        let answers = [...this.state.answers];
        answers.forEach(e => {
            if (e.questionId === questionId) {
                e.answerNo = answerNo
            }
        })
        console.log({ questionId, answerNo })
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        //console.log(this.state.answers);
        await fetch(`${this.props.domain}/students/returnExam`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + this.props.user.token
            },
            body: JSON.stringify({
                examId: this.state.examId,
                studentId: this.props.user.userId,
                answers: this.state.answers
            })
        })
            .then(res => res.json())
            .then(result => {
                console.log(result);
                alert("Exam submit complete");
                this.setState({ examReturned: true, examResult: result.results[0] })
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
            } else if (this.state.examReturned) {
                return <Redirect to={{
                    pathname: '/resultExam',
                    result: this.state.examResult
                }} />
            }
            else {
                return (
                    <div className="container mt-4">
                        <Link to="/"><button className="btn btn-outline-secondary">Back to menu</button></Link><br />
                        <h2>Exam id: {this.state.examId}</h2>
                        <form onSubmit={this.handleSubmit} ref={this.state.form}>
                            {
                                this.state.questionList.map((item, index) =>
                                    <div className="ml-4" key={index}>
                                        <h3>{item.question}</h3>
                                        {item.answerOptions.map((answer, i) =>
                                            <div className="ml-4" key={i}>
                                                <input type="radio" name={item.questionId}
                                                    onChange={event => { this.handleRadioChange(event, item.questionId, answer.answerNo) }} />
                                                {answer.answer}
                                            </div>
                                        )}
                                    </div>
                                )
                            }
                            <input className="btn btn-primary" type="submit" value="Submit exam"></input>
                        </form>
                    </div>
                )
            }
    }
}
