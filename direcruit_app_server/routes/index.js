var express = require('express');
var router = express.Router();
const { UserModel } = require('../db/models');
const md5 = require('blueimp-md5');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});


/*
1. path /register
2. request type: post 
3. accept parameters: username and password
4. admin is registered user, check username
5. success retrun {code: x, data:{id:xx, username:xx, password}}
    fail return {code:x, mes:{xxxxxx}}
*/

// router.post('/register', function(req, res) {
//     const { username, password } = req.body;
//     if (username === 'admin') {
//         res.send({ code: 1, msg: 'username is alreay taken' })
//     } else {
//         res.send({ code: 0, data: { _id: 'cxx', username, password } })
//     }
// })

// user regiser router
router.post('/register', function(req, res) {
    // retrieve request data 
    const { username, password, type } = req.body;

    // check if username is existing 
    UserModel.findOne({ username }, function(err, user) {
        // if user found
        if (user) {
            // return error message
            res.send({ code: 1, msg: 'username is already taken' })
        } else {
            // save this user document
            // password to be encrypted, including in md5 fn which can not use es6 shorthand
            new UserModel({ username, password: md5(password), type }).save(function(err, user) {
                // save user login infor for a perid of time
                res.cookie('userid', user._id, { maxAge: 1000 * 60 * 60 * 24 });
                // send success info back, no password
                res.send({ code: 0, data: { _id: user._id, username, type } })
            })
        }
    })

})


// ignore these parameters
const filter = { password: 0, __v: 0 };
// user login router
router.post('/login', function(req, res) {
    const { username, password } = req.body
        // search the username if match the username and password
    UserModel.findOne({ username, password: md5(password) }, filter, function(err, user) {
        if (!user) {
            // not find
            res.send({ code: 1, msg: 'username or password does not correct' })
        } else {
            // find and save the id to cookie
            res.cookie('userid', user._id, { maxAge: 1000 * 60 * 60 * 24 });
            res.send({ code: 0, data: user })
        }
    })
})


// update information 
router.post('/update', function(req, res) {
    // obtain user id first
    const userid = req.cookies.userid
        // not exist
    if (!userid) {
        res.send({ code: 1, msg: 'please login' })
        return
    }

    // userid exists
    const updateInfo = req.body;
    // search id
    UserModel.findByIdAndUpdate({ _id: userid }, updateInfo, function(err, olduser) {
        // is olduser null, id needs to be remove
        if (!olduser) {
            res.send({ code: 1, msg: 'please login' })
            res.clearCookie('userid')
        } else {
            const { username, type, _id } = olduser
            const newUser = Object.assign(updateInfo, { username, type, _id })
                // console.log(newUser)
            res.send({ code: 0, data: newUser })
        }
    })
})


// get user information for the main page
router.get('/user', function(req, res) {
    // same to above 
    const userid = req.cookies.userid
    if (!userid) {
        res.send({ code: 1, msg: 'please login userid not exist' })
        return
    }

    // search the user by id
    UserModel.findOne({ _id: userid }, filter, function(err, user) {
        res.send({ code: 0, data: user })
    })
})

// retrieve users by user type 
router.get('/userlist', function(req, res) {
    // get type 
    const { type } = req.query
        // search by type
    UserModel.find({ type }, filter, function(err, users) {
        res.send({ code: 0, data: users })
    })
})

module.exports = router;