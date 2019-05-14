import React from 'react'
import ReactDOM from 'react-dom'
import {HashRouter, Route, Switch} from 'react-router-dom'
import {Provider} from 'react-redux'

import Login from './containers/login/Login'
import Register from './containers/register/Register'
import Main from './containers/main/Main'
import store from './redux/store'
import './asssets/css/index.less'

// import './test/socketio_test'

ReactDOM.render(
    (
        <Provider store={store}>
        <HashRouter> 
            <Switch>
                <Route path="/login" component={Login}></Route>
                <Route path="/register" component={Register}></Route>
                <Route component={Main}></Route>
            </Switch>
        </HashRouter>

        </Provider>
    ),    
    document.getElementById('root')
)