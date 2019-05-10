// obtain io
const io = require('socket.io-client')

const socket = io('ws://localhost:4000')

socket.emit('sendMsg', { name: 'woaini123' })
console.log('sendMsg to server is:' + { name: 'woaini123' });


socket.on('receiveMsg', function(data) {
    console.log('receiveMsg from server is:' + data.name)
})