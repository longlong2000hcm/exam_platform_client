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
            <h2>Teacher's menu</h2>
            <Link to="/createQuestions"><button>Create questions</button></Link>
            <Link to="/createExams"><button>Create exams</button></Link>
            <Link to="/schoolResults"><button>School results</button></Link>
            </>
        )
    }
}
