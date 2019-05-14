import React, { Component } from 'react';
import {Route, Switch, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import Cookies from 'js-cookie'
import {NavBar} from 'antd-mobile'

import {getUser} from '../../redux/actions'
import {getRedirectPath} from '../../utils/index'
import NavFooter from '../../components/nav-footer/NavFooter'

import HrInfo from '../hr_info/HrInfo'
import DeveloperInfo from '../developer_info/DeveloperInfo'
import NotFound from '../../components/not_found/NotFound'

import Hr from '../hr/Hr'
import Developer from '../developer/Developer'
import Message from '../message/Message'
import Personal from '../personal/Personal'

import Chat from '../chat/Chat'


class Main extends Component {

    // this is for display hr/developer/message/personal
    navList = [
        {
            path: '/hr',   // determine display header or footer
            component: Hr,   // determine component
            title: 'developer list',  //display header
            icon: 'developer',      // determine icon used in the footer
            text: 'developer'       // text describe icon in the footer
        },
        {
            path: '/developer',
            component: Developer,
            title: 'hr list',
            icon: 'hr',
            text: 'hr'
        },
        {
            path: '/message',
            component: Message,
            title: 'message list',
            icon: 'message',
            text: 'message'
        },
        {
            path: '/personal',
            component: Personal,
            title: 'personal info',
            icon: 'personal',
            text: 'personal'
        }
    ]

    componentDidMount(){
        const userid = Cookies.get('userid');
        const {user} = this.props
        // console.log(user, '-----------')
        if(userid && !user._id){
            this.props.getUser()
        }
    }
    
    render() {
        // redirect if no userid cookie
        // let use get into the main page if userid cookie exists
        const userid = Cookies.get('userid')
        if (!userid) {
            // no userid cookie move to login page
            // this.props.history.replace('/login')
            // return null
            return <Redirect to={'/login'}></Redirect>
        }

        // having userid cookie stay in the main then find the destinate path
        // consider the special case when enter is '/' root
        const {user} = this.props
        const pathname = this.props.location.pathname
        if(!user._id){
            return null
        }else{
            // console.log(user, '-----------222----' + pathname)
            if(pathname === '/'){
                const path = getRedirectPath(user.type, user.header) // hr or hrinfo
                return <Redirect to={path}></Redirect> 
            }
        }

        // hide one for footer display
        if(user.type === 'hr'){
            // set the developer nav hide =true
            this.navList[1].hide = true
        }else{
            this.navList[0].hide = true
        }

        // path in one of the navs
        const currentNav = this.navList.find(nav=>nav.path === pathname)


        return (
            <div>
                {currentNav ? 
                <NavBar className='sticky-header'>{currentNav.title}</NavBar> 
                : null
                }
                <Switch>
                    <Route path='/hrinfo' component={HrInfo}></Route> 
                    <Route path='/developerinfo' component={DeveloperInfo}></Route>

                    <Route path='/hr' component={Hr}></Route>
                    <Route path='/developer' component={Developer}></Route>
                    <Route path='/message' component={Message}></Route>
                    <Route path='/personal' component={Personal}></Route>
                    <Route path='/chat/:userid' component={Chat}></Route>

                    <Route component={NotFound}></Route>
                </Switch> 

                {currentNav ? <NavFooter navList={this.navList}/> : null}
            </div>
        );
    }
}

export default connect(
    state =>({user: state.user}),
    {getUser}
)(Main);