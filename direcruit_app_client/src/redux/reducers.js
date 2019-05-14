/*
n reducers used to create new state
*/

import { combineReducers } from 'redux'
import {
    AUTH_SUCCESS,
    ERROR_MSG,
    RECEIVE_USER,
    RESET_USER,
    RECEIVE_USER_LIST,
    RECEIVE_MSG_LIST,
    RECEIVE_MSG
} from './actionTypes'
import { getRedirectPath } from '../utils/index'

const initUser = {
    username: '',
    type: '',
    msg: '',
    redirectTo: ''
}

function user(preState = initUser, action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            const { type, header } = action.data
            return {...action.data, redirectTo: getRedirectPath(type, header) };
        case ERROR_MSG:
            return {...preState, msg: action.data };
        case RECEIVE_USER:
            return {...action.data };
        case RESET_USER:
            return {...initUser, msg: action.data };
        default:
            return preState;
    }
}

//******************** */

const initUserList = []

function userList(preState = initUserList, action) {
    switch (action.type) {
        case RECEIVE_USER_LIST:
            return action.data;
        default:
            return preState;
    }
}

/*** */

const initMsgList = {
    users: {},
    chatMsgs: [],
    unReadCount: 0
}

function chat(preState = initMsgList, action) {
    switch (action.type) {
        case RECEIVE_MSG_LIST:
            var { users, chatMsgs } = action.data
            return { users, chatMsgs, unReadCount: 0 }
        case RECEIVE_MSG:
            return {
                users: preState.users,
                chatMsgs: [...preState.chatMsgs, action.data],
                unReadCount: 0
            }
        default:
            return preState
    }
}

export default combineReducers({
    user,
    userList,
    chat
})