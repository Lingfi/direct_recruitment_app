import React, { Component } from 'react';
import {List, Grid} from 'antd-mobile'

class HeaderSelector extends Component {
    // init required info for grid
    // header name and header image
    constructor(props){
        super(props)
        this.headerList = []
        for(var i=0; i<20; i++){
            const text = `header${i+1}`
            this.headerList.push({text, icon: require(`./headers/${text}.png`)})
        }
    }

    // selected icon
    state = {
        icon: ''
    }

    // update selected icon and pass the header name to father 
    handlerClick= ({text, icon})=>{
        this.setState({icon})
        this.props.setHeader(text)
    }

    render() {

        const {icon} = this.state
        const gridHead = icon ? <p>selected header: <img src={icon} alt='header'/></p> : <p>pick a header</p>

        return (
            <List renderHeader={()=>gridHead}>
                <Grid 
                    data={this.headerList}
                    columnNum = {5}
                    // onclick will pass {text, icon} to the bind fn
                    onClick = {this.handlerClick}
                ></Grid>
            </List>
        );
    }
}

export default HeaderSelector;