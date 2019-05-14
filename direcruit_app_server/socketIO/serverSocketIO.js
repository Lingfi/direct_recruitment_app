const { ChatModel } = require('../db/models')


// it needs to get server obj, export itself to www to obtain server
module.exports = function(server) {

    // to get the io obj after server got
    const io = require('socket.io')(server)

    // listen on any connection
    io.on('connection', function(socket) {

        // any connection built, the callback fn execute, print below
        console.log('socketio connected')

        // receive data from client
        socket.on('sendMsg', function({ from, to, content }) {
            console.log('receive data from client:', { from, to, content })

            // prepare chat_id
            const chat_id = [from, to].sort().join('_')
                // received time
            const create_time = Date.now()

            console.log('all info:', { from, to, content, chat_id, create_time })

            new ChatModel({ from, to, content, chat_id, create_time }).save(function(err, chatmsg) {
                // send message to all connected users, not efficient**
                io.emit('receiveMsg', chatmsg)
            })


        })
    })
}