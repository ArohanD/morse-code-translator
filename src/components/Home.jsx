import React, {Component} from 'react';
import { NavLink } from 'react-router-dom'

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {};
    }
    render() {
        return (
            <NavLink to='/Translator'>
                <div id='home_container'>You are on the home page</div>  
            </NavLink>
        )
    }
}

export default Home;