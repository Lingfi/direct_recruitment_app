/*
provide interfaces for different requests
all return promise  
*/

import ajax from './ajax'

// ready to use ajax request for registration
export const reqRegister = (user) => ajax('/register', user, 'POST')

// ready to use ajax request for login
export const reqLogin = (user) => ajax('/login', user, 'POST')

// complete all information
export const reqUpdateUser = (user) => ajax('/update', user, 'POST')

// update user information when using cookie login
export const reqUser = () => ajax('/user')

// get the list of hr or developers
export const reqUserList = (type) => ajax('/userlist', { type })

// back using cookie to get current user, thus no parameters
export const reqChatMsgList = () => ajax('/msglist')

// get the messages have read from someone, to whom gets by cookie
export const reqReadMsg = (from) => ajax('/readmsg', { from }, 'POST')

// export function reqLogin({ username, password }) {
//     ajax('/login', { username, password }, 'POST')
// }