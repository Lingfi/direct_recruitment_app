import React, { Component } from 'react';
import {Route, Switch, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

import HrInfo from '../hr_info/HrInfo'
import DeveloperInfo from '../developer_info/DeveloperInfo'

class Main extends Component {
    
    render() {
        const {user} = this.props
        if(!user._id){
            return <Redirect to='/login'></Redirect>
        }


        return (
            <div>
                <Switch>
                    <Route path='/hrinfo' component={HrInfo}></Route> 
                    <Route path='/developerinfo' component={DeveloperInfo}></Route>
                </Switch> 
            </div>
        );
    }
}

export default connect(
    state =>({user: state.user})
)(Main);