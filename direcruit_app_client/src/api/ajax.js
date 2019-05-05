import axios from 'axios'


// for any type of ajxa requests
// receive 3 parameters
export default function ajax(url, data = {}, type = 'GET') {
    // check the type
    if (type === 'GET') {
        // prepare concat the url address
        let dataStr = '';
        // username=xx&password=xx
        Object.keys(data).forEach(key => {
            dataStr += key + '=' + data[key] + '&'
        })

        if (dataStr) {
            // remove the last &
            dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'));
            // add ?
            url += '?' + dataStr
        }

        return axios.get(url);

    } else {
        // send post request
        return axios.post(url, data) // data is the obj
    }
}