import React, { Component } from 'react'
import {
    NavBar,
    WingBlank,
    List,
    InputItem,
    WhiteSpace,
    Radio,
    Button
} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import Logo from '../../components/logo/logo'
import {register} from '../../redux/actions'

const ListItem = List.Item

class Register extends Component {

    state = {
        username: '',
        password: '',
        password2: '',
        type: '' 
    }

    // listen on change
    handleChange = (name, value) => {
        this.setState({[name]: value})
        }

    //register to server
    register = ()=>{
        this.props.register(this.state)
    }

    // move to login page
    backLogin = ()=>{
        this.props.history.replace('/login')
    }

    render() {

        const {msg, redirectTo} = this.props
        // if redirectTo exist that means success
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

                        <InputItem
                            type="password"
                            name="password2"
                            placeholder="confirm password"
                            labelNumber={10}
                            maxLength={10}
                            onChange={val => this.handleChange('password2', val)}
                        >confirm:</InputItem>
                        <WhiteSpace />

                        <ListItem>
                        <span>user-type: &nbsp;&nbsp;&nbsp;</span>
                        <Radio
                            checked = {this.state.type === "developer"}
                            name="type"
                            value="developer" 
                            onChange={() => this.handleChange('type', 'developer')}
                        >Developer</Radio>

                        <Radio
                            checked = {this.state.type === "hr"}
                            name="type"
                            value="hr"
                            onChange={() => this.handleChange('type', 'hr')}
                        >HR</Radio>
                        
                        </ListItem>
                        <WhiteSpace />

                        <Button
                            type="primary"
                            onClick={this.register}
                        >register</Button>
                        <WhiteSpace />
                        <Button
                            onClick={this.backLogin}
                        >existing account</Button>
                    </List>
                </WingBlank>
            </div>
        );
    }
}


// turn UI to a container
export default connect(
    state => state.user,
    {register}
)(Register);