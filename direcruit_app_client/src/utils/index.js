/**
 * 4 possible redirect paths
 * 
1. login to hr main page /hr
2. login to developer main page /developer
3. register to hr    /hrinfo
4. regisfter to developer  /developer
 */


export function getRedirectPath(type, header) {
    let path = ''
    if (type === 'hr') {
        path = 'hr'
    } else {
        path = 'developer'
    }

    if (!header) {
        path += 'info'
    }
    return path;
}