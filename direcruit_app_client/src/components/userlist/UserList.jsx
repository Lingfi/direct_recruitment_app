import React, { Component } from 'react';
import {WingBlank, WhiteSpace, Card} from 'antd-mobile'
const Header = Card.Header
const Body = Card.Body

class UserList extends Component {

    render() {
        // get userlist from father component
        const userList = this.props.userList

        return (
            <WingBlank style={{marginTop: 50, marginBottom: 50}}>
                {userList.map(user=>(
                    <div key={user._id}>
                        <WhiteSpace />
                        <Card>
                            <Header
                                thumb={user.header ?
                                    require(`../../asssets/headers/${user.header}.png`)
                                    :null}
                                extra={user.username}
                            />
                            <Body>
                                <div>postion: {user.position}</div>
                                {/* developer has no company and salary */}
                                {user.company ? <div>company: {user.company}</div> :null}
                                {user.salary ? <div>salary: {user.salary}</div> :null}
                                <div>information: {user.info}</div>
                            </Body>
                        </Card>
                    </div>
                ))}
            </WingBlank>
        );
    }
}

export default UserList;