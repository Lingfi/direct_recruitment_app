/*
n reducers used to create new state
*/

import { combineReducers } from 'redux'
import { AUTH_SUCCESS, ERROR_MSG, RECEIVE_USER, RESET_USER } from './actionTypes'
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


export default combineReducers({
    user
})