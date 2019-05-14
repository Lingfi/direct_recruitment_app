/**
 * all the action modules
 */

import io from 'socket.io-client'

// action-types
import {
    AUTH_SUCCESS,
    ERROR_MSG,
    RECEIVE_USER,
    RESET_USER,
    RECEIVE_USER_LIST,
    RECEIVE_MSG_LIST,
    RECEIVE_MSG
} from './actionTypes'

// ajax request 
import {
    reqRegister,
    reqLogin,
    reqUpdateUser,
    reqUser,
    reqUserList,
    reqChatMsgList
} from '../api/index'


// the sync action return {type, payload}
const authSuccess = (user) => { return { type: AUTH_SUCCESS, data: user } }
const error_msg = (msg) => { return { type: ERROR_MSG, data: msg } }
const receiveUser = (user) => { return { type: RECEIVE_USER, data: user } }
export const resetUser = (msg) => { return { type: RESET_USER, data: msg } }
const receiveUserList = (userlist) => { return { type: RECEIVE_USER_LIST, data: userlist } }
const receiveMsgList = (users, chatMsgs) => { return { type: RECEIVE_MSG_LIST, data: { users, chatMsgs } } }
const receiveMsg = (chatMsg) => { return { type: RECEIVE_MSG, data: chatMsg } }

// this is live chat part
/// this is asyn fn which init msg related information when login/update/update
//3个地方自动调用
async function getMsgList(dispatch, userid) {
    initIO(dispatch, userid)
    const repsonse = await reqChatMsgList()
    const result = repsonse.data
    const { users, chatMsgs } = result.data
    if (result.code === 0) {
        dispatch(receiveMsgList(users, chatMsgs))
    }
}


// io will be the global const
function initIO(dispatch, userid) {
    // if io socket not exist, build it, only once
    if (!io.socket) {
        io.socket = io('ws://localhost:4000')
    }
    // listen on the connection if message received
    io.socket.on('receiveMsg', function(data) {
        console.log('receiveMsg from server is:', data)
            // if this message is for current user
        if (data.from === userid || data.to === userid) {
            dispatch(receiveMsg(data))
        }
    })
}


// in chat page send action, other actions in chat page automatically called
// send one message
export function sendMsg({ from, to, content }) {
    return dispatch => {
        // first time create io
        // initIO()
        io.socket.emit('sendMsg', { from, to, content })
        console.log('sendMsg is:', { from, to, content })
    }
}


//************************

export function register(user) {
    const { username, password, password2, type } = user
    // any issue not need to connect to db
    if (!username || !password || !type) {
        return error_msg('uername and password can not be empty')
    } else if (password !== password2) {
        return error_msg('passwords do not match')
    }

    return async dispatch => {
        // const promise = reqRegister(user);
        // promise.then(res=>{
        //     const result = res.data
        // })

        // await the fn has to add async
        // await on promise to get repsonse === above codes
        const response = await reqRegister({ username, password, type })

        // get the return data = {code, data} data=user or msg
        const result = response.data

        // check code to know success or fail
        if (result.code === 0) {
            dispatch(authSuccess(result.data)) // dispatch the sync action
        } else {
            dispatch(error_msg(result.msg)) // dispatch the sync action
        }
    }
}

export function login(user) {

    const { username, password } = user
    // any issue not need to connect to db
    if (!username || !password) {
        return error_msg('uername and password can not be empty')
    }

    return async dispatch => {
        // const promise = reqLogin(user);
        // promise.then(res=>{
        //     const result = res.data
        // })

        // await the fn has to add async
        // await on promise to get repsonse === above codes
        const response = await reqLogin(user)

        // get the return data = {code, data} data=user or msg
        const result = response.data

        // check code to know success or fail
        if (result.code === 0) {
            getMsgList(dispatch, result.data._id)
            dispatch(authSuccess(result.data)) // dispatch the sync action
        } else {
            dispatch(error_msg(result.msg)) // dispatch the sync action
        }
    }
}

export function update(user) {
    // return callback fn
    return async dispatch => {

        // axios request to get promise, await to get response
        const response = await reqUpdateUser(user)
            // two results 1. {code:0, user} 2. {code:1, msg}
        const result = response.data

        // sucess
        if (result.code === 0) {
            getMsgList(dispatch, result.data._id)
            dispatch(receiveUser(result.data))
        } else { //fail
            dispatch(resetUser(result.msg))
        }
    }
}


// get user information from db
// almost same above
export function getUser() {

    return async dispatch => {

        const response = await reqUser()
        const result = response.data

        if (result.code === 0) {
            getMsgList(dispatch, result.data._id)
            dispatch(receiveUser(result.data))
        } else {
            dispatch(resetUser(result.msg))
        }
    }
}


// get user list by specific type
export function getUserList(type) {
    return async dispatch => {
        const repsonse = await reqUserList(type);
        const result = repsonse.data
        if (result.code === 0) {
            dispatch(receiveUserList(result.data))
        }
    }
}