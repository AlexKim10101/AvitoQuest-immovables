import React, { Component } from 'react';

import './style.css';
import {
    Route,
    Switch,
    Redirect,
    withRouter
} from "react-router-dom";

import Home from "./home/Home"
import Item from "./item/Item"


class App extends Component {
    render() {
    const { history } = this.props
    return (
        <div className="App">
            <Switch>
                <Route history={history} path='/home' component={Home} />
                <Route history={history} path='/item' component={Item} />
                <Redirect from='/' to='/home'/>
            </Switch>
        </div>
        );
    }
}

export default App;
