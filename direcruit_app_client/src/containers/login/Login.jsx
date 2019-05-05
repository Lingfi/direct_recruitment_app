import React, { Component } from 'react'
import {
    NavBar,
    WingBlank,
    List,
    InputItem,
    WhiteSpace,
    Button
} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import Logo from '../../components/logo/logo'
import {login} from '../../redux/actions'


class Login extends Component {

    state = {
        username: '',
        password: '',
    }

    // listen on change
    handleChange = (name, value) => {
        this.setState({[name]: value})
        }

    // register to server
    login = ()=>{
        this.props.login(this.state)
    }

    // move to register page
    toRegister = ()=>{
        this.props.history.replace('/register')
    }

    render() {

        const {msg, redirectTo} = this.props
        // success move to main page
        if(redirectTo){
            return <Redirect to={redirectTo}></Redirect>
        }

        return (
            <div>
                <NavBar>Direct Recruitment</NavBar>
                <Logo></Logo>
                <WingBlank>

                {/* display error message */}
                {msg ? <div className="error-msg">{msg}</div>:null}

                    <List>
                        <InputItem
                            name="username"
                            placeholder="enter username"
                            labelNumber={10}
                            maxLength={10}
                            onChange={val => this.handleChange('username', val)}
                        >username:</InputItem>
                        <WhiteSpace />

                        <InputItem
                            type="password"
                            name="password"
                            placeholder="enter password"
                            labelNumber={10}
                            maxLength={10}
                            onChange={val => this.handleChange('password', val)}
                        >password:</InputItem>
                        <WhiteSpace />

                        <Button
                            type="primary"
                            onClick={this.login}
                        >login</Button>
                        <WhiteSpace />
                        <Button
                            onClick={this.toRegister}
                        >new account</Button>
                    </List>
                </WingBlank>
            </div>
        );
    }
}

export default connect(
    state => state.user,
    {login}
)(Login)