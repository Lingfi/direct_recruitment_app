/*
provide interfaces for different requests
all return promise  
*/

import ajax from './ajax'

// ready to use ajax request for registration
export const reqRegister = (user) => ajax('/register', user, 'POST')

// ready to use ajax request for login
export const reqLogin = (user) => ajax('/login', user, 'POST')

export const reqUpdateUser = (user) => ajax('/update', user, 'POST')

// export function reqLogin({ username, password }) {
//     ajax('/login', { username, password }, 'POST')
// }