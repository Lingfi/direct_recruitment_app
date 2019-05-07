import React, { Component } from 'react';
import {connect} from 'react-redux'
import {Result, List, WhiteSpace, Button, Modal} from 'antd-mobile'
import Cookies from 'js-cookie'

import {resetUser} from '../../redux/actions'

const Item = List.Item
const Brief = Item.Brief

class Personal extends Component {

    handlerLogout = ()=>{
        Modal.alert('logout', 'confirm logout?', [
            {
                text: 'cancel',
                onPress:()=>{console.log('cancel')}
            },

            {
                text: 'confirm',
                onPress: ()=>{
                    Cookies.remove('userid')
                    this.props.resetUser()
                }
            }
        ])
    }

    render() {
        const {header, username, company, position, info, salary} = this.props.user
        return (
            <div style={{marginTop: 50, marginBottom: 50}}>
                <Result
                    img={<img src={require(`../../asssets/headers/${header}.png`)} style={{width:50}} alt='header'/>}
                    title = {username}
                    message = {company}
                />

                <List renderHeader={()=>'related details'}>
                    <Item multipleLine>
                        <Brief>position: {position}</Brief>
                        <Brief>information: {info}</Brief>
                        {salary ? 
                        <Brief>position: {position}</Brief>
                        : null
                        }
                    </Item>
                </List>
                <WhiteSpace />

                <List>
                    <Button 
                        type='warning'
                        onClick={this.handlerLogout}
                    >logout</Button>
                </List>
            </div>
        );
    }
}

export default connect(
    state =>({user: state.user}),
    {resetUser}
)(Personal);