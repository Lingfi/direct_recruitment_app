/**
 * all the action modules
 */

// action-types
import { AUTH_SUCCESS, ERROR_MSG, RECEIVE_USER, RESET_USER } from './actionTypes'
// ajax request 
import { reqRegister, reqLogin, reqUpdateUser } from '../api/index'


// the sync action return {type, payload}
const authSuccess = (user) => { return { type: AUTH_SUCCESS, data: user } }
const error_msg = (msg) => { return { type: ERROR_MSG, data: msg } }
const receiveUser = (user) => { return { type: RECEIVE_USER, data: user } }
const resetUser = (msg) => { return { type: RESET_USER, data: msg } }

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
            dispatch(receiveUser(result.data))
        } else { //fail
            dispatch(resetUser(result.msg))
        }
    }
}