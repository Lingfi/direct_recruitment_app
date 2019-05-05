import React, { Component } from 'react';
import {NavBar, InputItem, TextareaItem, Button} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import HeaderSelector from '../../components/header-selector/HeaderSelector'
import {update} from '../../redux/actions'

class HrInfo extends Component {

    // state will be updated
    state = {
        header: '',
        position: '',
        company: '',
        salary: '',
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
           return <Redirect to='/hr'></Redirect>
        }

        return (
            <div> 
                <NavBar>Recruitment details</NavBar>
                {/* pass setHeader fn, update header name when it is called */}
                <HeaderSelector setHeader={this.setHeader}/>

                <InputItem 
                    placeholder='Job title' 
                    onChange = {value=>this.handleChang('position', value)}
                >Position:</InputItem>

                <InputItem 
                    placeholder='Company name'
                    onChange = {value=>this.handleChang('company', value)}
                >Company:</InputItem>

                <InputItem 
                    placeholder='Anaual payment'
                    onChange = {value=>this.handleChang('salary', value)}
                >Salary:</InputItem>

                <TextareaItem 
                    placeholder='neccessary skills'
                    title='Job requirements:'
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
    state=>({user: state.user}),
    {update}
)(HrInfo);