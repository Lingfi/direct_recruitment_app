const md5 = require('blueimp-md5')

// 1. connect to database using mongoose
// 1.1 import mongoose
const mongoose = require('mongoose')

// 1.2 connect to the indicated database (url the database is fixible)
mongoose.connect('mongodb://localhost:27017/direcruit_test')

// 1.3 obtained the connected object 
const conn = mongoose.connection

// 1.4 finish connection and start listening
conn.on('connected', function() {
    console.log('database connection success, yahoo!!!')
})


// 2. model based document and collections 
// 2.1  define schema(format)
const userSchema = mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    type: { type: String, required: true },
    header: { type: String }
})

// 2.2 define model which all data has to follow it
const UserModel = mongoose.model('user', userSchema); // users collections name


// now test CRUD to the database
// 3.1 user create
function testSave() {
    // user obj
    const user = {
            username: 'xingwa',
            password: md5('mima'),
            type: 'developer'
        }
        // model to create document
    const userModel = new UserModel(user)
        // save document to data
    userModel.save(function(err, user) {
        console.log('save', err, user)
    })
}
// testSave()


// 3.2 find user, 
// 1)find, it will return array even if the id is provided
// 2)findone, doc obj, no match return null
function findUser() {
    UserModel.find(function(err, users) {
        console.log('find', err, users)
    })

    UserModel.findOne({ _id: '5ccc58951909cd45478a74cd' }, function(err, user) {
        console.log('findone', err, user)
    })
}
// findUser()


// 3.3 updateuser return old user info
function updateUser() {
    UserModel.findOneAndUpdate({ _id: '5ccc58951909cd45478a74cd' }, { username: 'hahaXing' }, function(err, olduser) {
        console.log('findOneAndUpdate', err, olduser)
    })
}
// updateUser()


// 3.4 remove user
function removeUser() {
    UserModel.remove({ _id: '5ccc467de09f3f3b9de92446' }, function(err, user) {
        console.log('remove', err, user)
    })
}
removeUser()