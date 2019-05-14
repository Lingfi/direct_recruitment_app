1. react scaffold: create-react-app
    1) npm start - auto update, 
    2) install serve

2. create work dirs
    1) api/ assets/ components/ containers/ redux/ utils and the entry index.js
    2) remove all the file in the /src

3. download repository
    1) npm install antd-mobile --save 
        import the <meta> and script to slove mobile 3s delay problem(from home page)
    
    2) npm install --save-dev babel-plugin-import react-app-rewired
        11.
            这里用react-app-rewire配置webpack或者用npm eject(只能用一次)
        22.
            react-app-rewired：的使用上文有过描述；主要用于在不暴露配置的情况下对webpack的配置进行扩展；
            babel-plugin-import 是一个用于按需加载组件代码和样式的 babel 插件
        总结：按照需求引入加载而不是全部需要babel 要修改扩展webpack但是又不暴露需要rewired
    
    3）rewired webpack
        1.a new file ---config-overrides.js 
            npm install customize-cra --save-dev 

        2.rewrite scripts
            "start": "react-app-rewired start",

    4) npm install react-app-rewire-less --save-dev 
        实现对 less 的支持同时添加 modifyVars 加载参数设置 self-defined theme

**************************** 
starts coding 
*****************************

4. start writing routes
    1) npm install react-router-dom --save
        3 first level routes: register | login | main 
    2) mapping routes in the index.js file 
    3) test

5. import redux
    1) npm install --save redux@3.7.2 react-redux redux-thunk
        npm install --save-dev redux-devtools-extension (import in firefox)
    2) write 4 modules in redux:  store | reducers | actionCreator | action-types

    3) simulate few reducers then use combineReducers
    4) create store | import reducers | devtools(middleware(thunk))
    5) index.js imports  store | provider (use react-redux)

6. write the static register page and login page
    1) logo icon has no interact with redux so the new file in component

    2) write the register page using some components from antd-mobile
        e.g. NavBar/WingBlank/List/InputItem/WhiteSpace/Radio/Button

    3) to achieve that click the register button would log all information
        11. onchange update all the information (use antd provide onchange fn)
            111. two-way binding using the same fn 
        *22. radio is special case, but still use name(same)
            222. set checked value according to state(advans of two way binding) 
                e.g. checked = {this.state.type === "hr"}

    4) login page copies from register

************************************
server side
************************************

7. build the express server file
    1) install express in vscode    
    2) npm install express-generator -g   
    3) express direcruit_app_server  ---create express file which is the server
        11. npm start  --- test server
        22. www file modify --- port number like 4000
        33. index.js   --- where register our routes
    sum: here express only sends data to front, it does not render html and show


test server route------
8. register a router for user registration for test
    1) write a router in the index.js file
        1_.path                       /regiser
        2_.request type               /post
        3_.parameters(destructing**)  {username, password} = req.body
        4_.check data valid           if(uername === 'admin')
        5_.return(sucess or fail)     res.send(xxx)

    2) npm install --save-dev nodemon  (auto refresh)
        "start": "nodemon ./bin/www"

    3) test router using postman
        1) install postman and register
        2) test the return data and when the username is 'admin' 


test mongodb connection------
9. connect to mongodb, one new file for database
    1) start mongodb
        11. sudo service mongod start
        22. service mongod status
    2) npm install --save mongoose blueimp-md5
        11. mongoose manipulates mongodb, blueimp-md5 encryption tool for password
        22. build the db/db_test.js 

    3)  coding in the file   ----- db/db_test
        1_. use mongoose connect to mongodb and listen on this connection
        2_. set the schema for the input/output(format for the database)
        3_. defined modal which is used for creating data(document)
                multiple documents are called (collections)
        
        4_. CRUD test  --- node db/db_test
            11. create 
                const userModel = new UserModel(user)
                userModel.save(function(err, user)
            22. read
                UserModel.find(function(err, users)  // return array
                UserModel.findOne({ _id: '4cd' }, function(err, user) // return obj
            33. update
                UserModel.findOneAndUpdate({ _id: 'ddd' }, { username: 'hahaXing' }, function(err, olduser)   // return old user
            44. remove
                UserModel.remove is deprecated. Use deleteOne, deleteMany

            mongodb commands:
            enter: mongo
            databse: show dbs
            enter databse: use xxxx
            view collections: show collections
            view data in the collection: db.collctionsname.find()
            delete db: db.dropDatabase()

实际使用代码在这里 上面都是测试 这里usermodel 1.连上了数据库 2.定好了规定
        5_. above 1_-3_ models have multiple in this project, e.g. user/chat msgs
            therefore all models in one file
            db/model.js

routers.post  register/login
10. design routes for registration and login connected to mongodb using usermodel
    1) register route 
        11. path   /resigiser
        22. post  
        33. get the data {username, password, type} = req.body

        44. check username existing
            1_. import usermodel
            2_. usermodel.findone({username},function(err, user))
                1)) if(user) return {code:1, msg:'error'}
                2)) else new usermodel({}).save
                notice: 1_.password to be encrypted
                        2_.return info not include password
                        3_.before res.send() + res.cookie('userid',user._id,{ maxAge:x})
            3_. test postman   ---this should modify database

    2) login route similar to register
        it use filter to ignore password and __v in the return user doc object
        res.cookie()

***********************  
back to the front 

axios api
11. axios   npm install --save axios
    sends request to the server  /api 

    1. encapsulate all the axios requests to one module, receive 3 parameters
        11. url
        22. data={}   default
            format follows: ?name=xxx&password=xxx&type
        33. type='GET'  default
    2. exports different interfaces for diff requests    /api/index.js

redux -actions async->sync
12. redux
    1. action-type: 
        11. due the success of register and login both are success and return a user,   they are the some action-type: AUTH_SUCCESS
        22. fails are the same, but fails may not just register/login, the name is      different called: ERROR_MSG

    2. actions:  async->sync
        11. import the two ajax interfs (above) return is promise, await on promise the return is response === promise.then(res){res} ---fn has to add async

        22. two return response.data 1_.{code:1, msg}, 2_.{code:0, data:user}
            1) check the response.data.code 
                1_. if code=0,  dispatch(sync authsucess action)
                2_. if code=1, dispatch(sync errormsg action)

        33. two sync actions -- import action-types
                1_. xx = (user)=>{return{type, data: user}}
                2_. yy = (msg)=>{return{type, data: msg}}

    3. reducers
        11. switch if action.type === 'AUTH_SUCCESS', return {...action.data, redirect}
        22. action.type === 'ERROR_MSG', return {...action, action.data}

important!!!!!
    这里dispatch(action) 已经都封装到了action里面 调用dispatch
    axios也已经封装好了(api) 就只需要传入data参数 在主界面只需要调用 对应的action就可以


UI side------
13. register.jsx
    1. turn the register UI to container
        11. import connect and corresponding action
        22. export default connect()(Register)

**font-end test: if error immediately return sync errorMsg
    2. click button call the action (which dispatch in the action method) 
        input parameter is this.state(user) but there is two password
        11. destructing user, ignore the 2nd pass
        22. verify username|pass are empty or 2 pass are same
        33. test

    3. set "proxy": "http://localhost:4000"

according to the existence of msg(fail) or redirectTo(success) 
    4. display error msg if msg exist using ? :     ---import css style
        11. if fail the return state exist msg
    5. redirect when success
        22. reducer success return 'redirectTo', if exist <redirect to={redirectTo}>

    it is almost same in login.jsx

****************************

select a portrait(mandotry)  optional--complete full information
14. more informations in register e.g. protrait, personal info, company name...
    1. in the main page set two routes, hr | develop
        they are in different containers  hr-info | developer-info

    2. hr-info static
        11. use antd design UI which is similar with the register UI

        22. header is an indepedent component --header-selector
        33. complete the header component 
            1) use {list,grid} from antd
            2) import header image in a list in constructor
                grid accept {name, icon: image}
                    1_.const text = `header${i+1}`
                    2_.this.headerList.push({text, icon: require('')})
            3) grid data={this.headerList}    

    3. developer-info static is similar

    header select function -- get header text from child (name)
    4. click save to print all info and header name  --test
        1. onchange update state, print info
        2. pass sethead() to component which should return the hearder name back

        3. grid onlick method 自动传入参数 el对象 {text, icon}
            1_. update selected icon in the this.state.icon
                    display if icon exist   require引入的图片显示还是要靠<img>来显示
            2_. pass the current text to this.props.sethead(text)

    login or reigister to where?   decided by type and header
    5. register or login ---redirectTo 4possible ways
        1. login to hr main page /hr
        2. login to developer main page /developer
        3. register to hr    /hrinfo
        4. regisfter to developer  /developer

        redirectTo according to type and header from action return data  /utils/index

15. write route side   /update
    1. get userid from cookie  /req.cookies.userid
        11. if not exist return {code:1, msg:'please login'}
    2. usermodel.findbyidandupdate 
        1_. olduser if not exist, ask brower to clearCookie, return {code:1,msg}
        2_. return {code:0, newuser}   newuser=obj.assign(old, new)
    3. test

16. redux side
    1.AJAX add one more module call requpdateuser -api

    2. action-type 
        11. RECEIVE_USER  //confirm update
        22. RESET_USER    //jump to login 所以叫reset

    3. action async->sync
        11. return dispatch import the new AJAX 
                dispatch sync action according to response.data.code 
        22. two sync actions

    4. reducer
        11. RECEIVE_USER return user
        22. RESET_USER return {...inituser, msg}  ****
            //return to login so user info reset to the inituser === clear all info

    UI side
    5. hrinfo/developerinfo pages
        11. import corresponding action
                check update sucess
        22. sucess page redirect to corresponding page /hr or /developer
                if header exist that means all information done
                if(user.header) path = user.type
        
        hrinfo/developerinfo/hr/developer are all child routes in main page

***************

不是任何人可以登录到 hr/hrinfo/developer/developerinfo 
    由main来控制access 用cookie的userid  login和register成功都把_id加到cookie里面
direct login or back to login/register replies on cookie(userid)
if userid exists but onther information not --- updare other info and direct login

3种可能 login main page
1.登录或者注册进入 没有问题 
2.直接登录 有cookie， 需要链接链接服务器更新信息 
3.没有cookie跳转到登录
16. main page 
    
    1. a.if auto login or redirect from infor page, full info exist --direct path
        b.if direct type hr/developer/main but cookie exist --help move to path
            c.if cookie not exist  --switch to login
        npm install js-cookie --save

    if it is b. case
        11. router  get  /user

        22. ajax  /reqUser

        33. redux 
            1_. action-type 
                    use update (RECEIVE_USER, RESET_USER) -existing
            2_. action
                    getUser async->sync     
                    sync use the receiveUser, resetUser  -existing
            3. reducer is the same

        UI side 
        44. in main page in componentDidMount call this action if userid exist but _id not --- update information

        55. check cookie.get('userid')
                1_. if exist request more information from server 
                    else redirect to login page
                2_. if _id exist 
        3种可能解决了 还有就是如果是直接登录要计算目标地址 是hr/developer还是需要补全信息hrinfo/developerinfo
                    11. calculate path (/utils/getredirectpath) if path==='/'
                        move to hr/developer page 
                        if header not exist jump to info page


    2. complete the child routes in the main page
        11. hr  containers/hr/hr.jsx
        22. developer containers/developer/
        33. message  containers/message/
        44. personal  containers/personal
        55. 404 error  componenet/not_found


    3. hr/developer/message/personal --- they have header and footer
        hrinfo/developerinfo/notfound -- theny dont have

        1. navlist used to display header and footer
        2. use path(/utils/getredirectpath) to decide if direct path in navlist
            hr/developer/message/personal      yes
            hrinfo/developer      no 
        如果上面计算的地址和list的地址一样 需要显示
        3. if currentNav exist display hearder and footer

        4. footer component
            11. pass the navlist to footer
                before pass to footer hide one not needed
                    if path === 'hr' hide the 'developer' nav --hide
                    or converse 
            22. filter the hide nav before display --in footer component

            33. when click need to move to corresponding page
                component is not in the route
                **use ---import {withRouter} from 'react-router-dom'---
                    then this.props.history.replace(nav.path) 

            44. selected icon need to get the target path from father
                1. it can be pass in the <component/>
                2. const {pathname} = this.props.location
    
main page的流程
    1. 在加载完 检查cookie如果cookie在 id不再 就异步获得user的全部信息
    2. 在render里面 如果cookie不再 就跳转到login页面
    3. cookie在 user的信息会被加载的 然后计算出 下面的path hr/hrinfo 根据header
        这里实现自动登录 如果输入是‘/’根目录也会自动跳转
    4. 根据输入路径 选择是否显示头部和底部
        根部拿到传入的navlist过滤到其中一个nav不需要的 其余的显示到tabbar里面
            拿到上面传入的location里面的path确定哪个被选中就是显示被选中的图标
            点击跳转显示对应界面

****************************************

17. personal page
    1. convert UI to container that can get user‘ information
        display header, username, company use Result from antd-m
        display position, info, salary
        dispaly button

    2. logout function use modal from antd-m
        import resetUser action， execute if login onpress
    
18. userlist 
    1. router side   --type decided hr or developer info extracted
        test postman

    2. redux
        11. api
        22. action-type
        33. build a new reducer userlist 
        44. action async->sync

    3. use a common userlist component to show list   hr/developer
        which receive userlist from father component then display use Card from antd

    4. in hr/developer import this component and the userlist state 
        userlist required to be initialized in componentdidmount where pass type

******************************
******************************
socketio封装http和webservicer2种方式 为了版本原因
http是不停的发送请求 询问server是否有数据
webserver是双向的 响应的

19. socket io
        npm install --save socket.io     --both server and client 
    1. server, client both need it
        server side:
            11. import fn file to get the server obj
            12. in the fn file use server to get IO obj, then listen on any              'connection', any connection build start receiving or sending msg
                1) on bind listening
                2) io emit msg, all connections will receive msg
                    socket emit msg, only the connected user can receive msg

        client side:
            1. fn file import client IO then connect to 4000 port, start sending or receiving msg
            2. import fn file in the app.js entry file
        
        above for testing, remove all if no prob


20. server side for message function
    1. new schema   --mongoose
        11. from who, 
        22. to who, 
        33. read or not, 
        44. content, 
        55. time,  
        66. chat_id?  

    2. new model
        11. /msglist  --get two things 1)all users name and header 2)all messages
            first. get all user corresponding name and header by each's _id
            second. retrieve all msg to/from the current id
            code:    ChatModel.find({ '$or': [{ from: userid }, { to: userid }] },              filter, function

        22. /readmsg    ---set all unread message to read, false to true
            from others, to the current user
            code:  ChatModel.update({ from, to, read: false }, { read: true }, {             multi: true }

21. register static page and guide into this page
    1. register this page to router in main
        placehold used in the path because path display is /chat/:userid
        so the path will accept a userid at the tail
    3. click move to chat page 
        in the userlist set onclick, which the withRouter needed for history.push

****io part**** click send msg call the async action
22. chat page 
    1. click sub button print all info, and submit to server
        11. 3 info submitted 
            1) from: user._id 2)to: this.props.match.params.userid 3)content.trim()
        22. clear content after click --two way binding
                if content not empty

在action里面用io发送消息    
    2. action --send message to server and serve message, then send message back
        11. write io into fn, io is global varible produced if not exist
        22. because io is globel, action use io listen and send message

在server专门的一个地方用io接受消息 保存到数据库 转发给全部链接用户
        33. server
            1) build io and listen on message received
            2) got mess and create 1_.chat_id 2_. time, save it to db
            3) send message back

        44. test  --problem is the io build after sending message
                but if both send message should receive message

        55. now there are msg in db, using postman test routers

23. front end -- axios, redux
    1. axios -- 1)reqChatMsgList 2)reqReadMsg
    redux
    2. action-types -- receive_msg_list, receive_msg
    3. actions
        11 when the login/update/getuser should update all the data in the state
            1)write a fn which be asyn --get return users, msglist then call syn  
                action(get dispatch) --this fn called in when login/update/get success ***
            2)init io should be in this fn   --solve problm above 44 **
        22. sync action pass users, chatmsgs
    4. reducers
        new state: chat --two types in 2.
        init state: {user, chatMsgs, unReadCount}
    5. check redux in browser

24. ui page --display message list, and header
    1. get user, get msglist(users, msglist) from state
    2. combine the chat_id, extract all the message from or to me with one user
        --filter 
        codes: chatMsgs.filter(msg=>msg.chat_id===chatId)
    3. if msg not empty, display
        if msg.from(me) -display right
        else display left

    4. get header just once, display if header exist

    5. begin not users or msg, check users return if not exist

25. receive msg and display
    1. io receive data, everyone receives this data 
        11. check this data from/to === the current user
            if true, accept it 
            dispatch the readmsg sync action
    2. reducers 
        11. add this msg to msgs list





        




















分解对象 键值
object.keys(objxx).foreach(key)=>{key键 = objxx[key]值}

component 文件 不和redux有交互 可以通过this.props.location 拿到父类的 path
不能发history.push 用withRouter可以

