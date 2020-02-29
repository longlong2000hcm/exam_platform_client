import React, { Component } from 'react'

export default class TakeExam extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
        }
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

    render() {
        if (this.state.error) {
            return <div>Error happened</div>;
        } else if (!this.state.isLoaded) {
            return <h5>Loading...</h5>;
        } else {
            return (
                <div>

                </div>
            )
        }
    }
}
