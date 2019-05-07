import React, { Component } from 'react';
import {connect} from 'react-redux'
import {getUserList} from '../../redux/actions'

import UserList from '../../components/userlist/UserList'

class Developer extends Component {

    componentDidMount(){
        this.props.getUserList('hr')
    }

    render() {
        const userList = this.props.userList
        return (
            <div>
                <UserList userList={userList} /> 
            </div>
        );
    }
}

export default connect(
    state =>({userList: state.userList}),
    {getUserList}
)(Developer);