import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class TeacherMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }
    render() {
        return (
            <>
            <h2>Student's menu</h2>
            <Link to="/takeExam"><button>Create questions</button></Link>
            </>
        )
    }
}
