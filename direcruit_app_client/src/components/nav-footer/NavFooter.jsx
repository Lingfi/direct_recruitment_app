import React, { Component } from 'react';
import {TabBar} from 'antd-mobile'
import {withRouter} from 'react-router-dom'
const Item = TabBar.Item

class NavFooter extends Component {

    state = {
        navList : this.props.navList
    }

    
    render() {

        const {pathname} = this.props.location
        const newNavList = this.state.navList.filter(nav=>!nav.hide)

        return (
            <TabBar>
                {
                    newNavList.map((nav, index) => (
                        <Item 
                            key={index}    // unique key
                            title={nav.text}   // text on icon
                            icon={{uri: require(`./nav/${nav.icon}.png`)}} // normal
                            selectedIcon={{uri: require(`./nav/${nav.icon}-selected.png`)}} //selected
                            selected={pathname===nav.path}  // which selected icon should show
                            onPress={() => {
                                this.props.history.replace(nav.path) 
                            }}
                        />
                        ))
                }
            </TabBar>
        );
    }
}

export default withRouter(NavFooter);