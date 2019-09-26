import React, {Component} from 'react';
import { Link } from 'react-router-dom'
import { Button } from '@material-ui/core';

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {};
    }
    render() {
        return (

                <div id='home_container'>
                    <h1 id='hero_logo'>Vocal <br /> Codes</h1>
                    <div className={'home_links'}>
                        <Button variant="contained" 
                                className={'home_nav_button'}
                                component={Link}
                                to={'/Guide'}>
                                Tutorial</Button>
                        <Button variant="contained" 
                                className={'home_nav_button'}
                                component={Link}
                                to={'/Dictionary'}>
                                Dictionary</Button>
                        <Button variant="contained" 
                                className={'home_nav_button'}
                                component={Link}
                                to={'/Translator'}>
                                Interpreter</Button>
                    </div>
                </div>  
        )
    }
}

export default Home;