// it needs to get server obj, export itself to www to obtain server
module.exports = function(server) {

    // to get the io obj after server got
    const io = require('socket.io')(server)

    // listen on any connection
    io.on('connection', function(socket) {

        // any connection built, the callback fn execute, print below
        console.log('socketio connected')

        socket.on('sendMsg', function(data) {
            console.log('receive data from client:' + data.name)

            socket.emit('receiveMsg', { name: data.name.toUpperCase() })
        })
    })
}