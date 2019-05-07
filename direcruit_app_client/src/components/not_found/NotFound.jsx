import React, { Component } from 'react';
import {Button} from 'antd-mobile'

class NotFound extends Component {
    render() {
        return (
            <div>
                <h2>Sorry, this page not found!</h2>
                <Button
                    type='primary'
                    onClick = {()=>this.props.histroy.push('/')}
                >Back to main page</Button>
            </div>
        );
    }
}

export default NotFound;