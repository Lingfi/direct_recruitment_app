import React, { Component } from 'react';
import {connect} from 'react-redux'
import {NavBar, List, InputItem} from 'antd-mobile'
import {sendMsg} from '../../redux/actions'

const Item = List.Item

class Chat extends Component {

    state = {
        content:''
    }

    handleSend = ()=>{
        const from = this.props.user._id
        const to = this.props.match.params.userid
        const content = this.state.content.trim()
        if(content){
            this.props.sendMsg({from, to, content})
            this.setState({content: ''})
        }

    }

    render() {

        // retieve user, users(all), msgs(all) from state
        const {user} = this.props
        const {users, chatMsgs} = this.props.chat
        if(!users){
            return null
        }
        
        const targetId = this.props.match.params.userid
        const myId = user._id

        // combine chatid
        const chatId = [targetId, myId].sort().join('_')
        console.log(chatId)
        // retrieve msg only when chat_id is matched
        const msgs = chatMsgs.filter(msg=> msg.chat_id===chatId)
        
        // // get oppsite header
        const targetHeader = users[targetId] ? require(`../../asssets/headers/${users[targetId].header}.png`) : null
        

        return (
            <div id='chat-page'>
                <NavBar>aa</NavBar>
                <List>
                    {
                        msgs.map(eachMsg=>{
                            if(eachMsg.from === targetId){
                                return (
                                    <Item 
                                        key = {eachMsg._id}
                                        thumb = {targetHeader}
                                    >
                                        {eachMsg.content}
                                    </Item>
                                )
                            }else{
                                return(
                                    <Item 
                                        key = {eachMsg._id}
                                        className='chat-me'
                                        extra='me'
                                    >
                                        {eachMsg.content}
                                    </Item>
                                )
                            }
                        } )
                    } 

                    <div className='am-tab-bar'>
                        <InputItem
                            placeholder='input'
                            value = {this.state.content}
                            onChange = {val =>{this.setState({'content':val})} }
                            extra={
                                <span onClick={this.handleSend}>send</span>
                            }
                        />
                    </div>
                </List>
            </div>
        );
    }
}

export default connect(
    state =>({user: state.user, chat: state.chat}),
    {sendMsg}
)(Chat);