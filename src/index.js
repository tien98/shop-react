import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './index.css';
import App from './App';
import Login from './components/login';
import SignUp from './components/signup';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <Router>
        <div>
            <Route path="/" exact component={App} ></Route>
            <Route path="/login" component={Login} ></Route>
            <Route path="/signup" component={SignUp} ></Route>
        </div>
    </Router>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
