import React, { Component } from 'react';
import {connect} from 'react-redux'
import {NavBar, List, InputItem} from 'antd-mobile'
const Item = List.Item


class Chat extends Component {
    render() {
        return (
            <div id='chat-page'>
                <NavBar>aa</NavBar>
                <List>
                    <Item 
                        thumb = {require('../../asssets/headers/header1.png')}
                    >
                        hello 11
                    </Item>

                    <Item 
                        thumb = {require('../../asssets/headers/header2.png')}
                    >
                        hello 22
                    </Item>

                    <Item 
                        className='chat-me'
                        extra='me'
                    >
                        hello 33
                    </Item>

                    <Item 
                        className='chat-me'
                        extra='me'
                    >
                        hello 344
                    </Item>

                    <div className='am-tab-bar'>
                        <InputItem
                            placeholder='input'
                            extra={
                                <span>send</span>
                            }
                        />
                    </div>
                </List>
            </div>
        );
    }
}

export default connect(
    state =>({}),
    {}
)(Chat);