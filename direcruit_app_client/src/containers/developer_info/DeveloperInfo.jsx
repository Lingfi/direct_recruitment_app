import React, { Component } from 'react';
import {NavBar, InputItem, TextareaItem, Button} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import HeaderSelector from '../../components/header-selector/HeaderSelector'
import {update} from '../../redux/actions'

class DeveloperInfo extends Component {

    // state will be updated
    state = {
        header: '',
        position: '',
        info: ''
    }

    // update state
    handleChang = (name, value)=>{
        this.setState({
            [name]: value
        })
    }

    // save information
    updateInfo = ()=>{
        this.props.update(this.state)
    }

    // get the header name
    setHeader = (header) =>{
        this.setState({
            header
        })
    }

    render() {

        const {user} = this.props
        if(user.header){
           return <Redirect to='/developer'></Redirect>
        }

        return (
            <div>
                <NavBar>Recruitment details</NavBar>

                <HeaderSelector setHeader={this.setHeader}/>

                <InputItem 
                    placeholder='Job preferred' 
                    onChange = {value=>this.handleChang('position', value)}
                >Position:</InputItem>

                <TextareaItem 
                    placeholder='experience, skills...'
                    title='Personal description:'
                    rows='3'
                    labelNumber={20}
                    onChange = {value=>this.handleChang('info', value)}
                ></TextareaItem>

                <Button 
                    type="primary"
                    onClick={this.updateInfo}
                >Save</Button>
                
            </div>
        );
    }
}

export default connect(
    state =>({user: state.user}),
    {update}
)(DeveloperInfo);