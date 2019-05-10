// 1.1 import mongoose
const mongoose = require('mongoose')

// 1.2 connect to db
// mongoose.connect('mongodb://localhost:27017/direcruit_db')
mongoose.connect("mongodb://localhost:27017/direcruit_db", { useNewUrlParser: true });

// 1.3 create connect obj
const conn = mongoose.connection

// 1.4 listen on this connection
conn.on('connected', function() {
    console.log('connect build-------------')
})


// next is to create schema and model
const userScheme = mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    type: { type: String, required: true }, //developer or hr
    header: { type: String }, // protrait
    position: { type: String }, //position
    info: { type: String }, //position intro
    company: { type: String }, //company name
    salary: { type: String }
})

const UserModel = mongoose.model('user', userScheme)

exports.UserModel = UserModel;



// formate for chatMeassage
const chatSchema = mongoose.Schema({
    from: { type: String, required: true }, // from who
    to: { type: String, required: true }, // to who      
    chat_id: { type: String, required: true }, //
    content: { type: String, required: true }, // message content
    read: { type: Boolean, required: true }, // read or not 
    create_time: { type: Number } // created time
})

const ChatModel = mongoose.model('chat', chatSchema)
exports.ChatModel = ChatModel;