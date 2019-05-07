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
    1) logo has no interact with redux so the new file in component

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

11. axios   npm install --save axios
    sends request to the server  /api 

    1. encapsulate all the axios requests to one module, receive 3 parameters
        11. url
        22. data={}   default
            format follows: ?name=xxx&password=xxx&type
        33. type='GET'  default
    2. exports different interfaces for diff requests    /api/index.js

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
                1_. yy = (msg)=>{return{type, data: msg}}

    3. reducers
        11. switch if action.type === 'AUTH_SUCCESS', return {...action.data, redirect}
        22. action.type === 'ERROR_MSG', return {...action, action.data}

important!!!!!
    这里dispatch(action) 已经都封装到了action里面 调用dispatch
    axios也已经封装好了 就只需要传入data参数 在主界面只需要调用 对应的action就可以


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
            3) grid data={this.headerList},

    3. developer-info static is similar

header select function
    4. click save to print all info and header name
        1. onchange update state, print info
        2. pass sethead() to component which should return the hearder name back

        3. grid onlick method 自动传入参数 el对象 {text, icon}
            1_. update selected icon in the this.state.icon
                    display if icon exist 
            2_. pass the current text to this.props.sethead(text)

login or reigister to where?   
    5. register or login ---redirectTo 4possible ways
        1. login to hr main page /hr
        2. login to developer main page /developer
        3. register to hr    /hrinfo
        4. regisfter to developer  /developer

        redirectTo according to type and header from action return data  /utils/index


update more infomation replies on cookie(userid)
15. write route side   /update
    1. get userid from cookie  /req.cookies.userid
        11. if not exist return {code:1, msg:'please login'}
    2. usermodel.findandupdate 
        1_. olduser if not exist, ask brower to clearCookie, return {code:1,msg}
        2_. return {code:0, newuser}   newuser=obj.assign(old, new)
    3. test

16. redux side
    1.AJAX add one more module call requpdateuser

    2. action-type 
        11. RECEIVE_USER  //confirm update
        22. RESET_USER    //jump to login 所以叫reset

    3. action async->sync
        11. return dispatch import the new AJAX 
                dispatch sync action according to response.data.msg 
        22. two sync actions

    4. reducer
        11. RECEIVE_USER return user
        22. RESET_USER return {...inituser, msg}  ****
            //return to login so user info reset to the inituser === clear all info

-------
    5. hrinfo/developerinfo pages
        11. import corresponding action
                check update sucess
        22. sucess page redirect to corresponding page /hr or /developer
                if header exist that means all information done
                if(user.header) path = user.type
        
        hrinfo/developerinfo/hr/developer are all child routes in main page

************
不是任何人可以登录到 hr/hrinfo/developer/developerinfo 
    由main来控制access 用cookie的userid  login和register成功都把_id加到cookie里面
16. main page 
    
    1. auto login or redirect from infor page
        npm install js-cookie --save

        11. router  get  /user

        22. ajax  /reqUser

        33. redux 
            1_. action-type 
                    use update (RECEIVE_USER, RESET_USER)
            2_. action
                    getUser async->sync
                    sync use the receiveUser, resetUser
            3. reducer is the same

to get user information if cookie exists but full info not
        44. in main page in componentDidMount call this action to check whether have    user information if userid exist but _id(which means user info not exist)

to auto jump to distination page if userid and _id both exist
    1)from cookie or 2)login or 3)register
        55. check cookie.get('userid')
                1_. if exist request more information from server
                    else redirect to login page
                2_. if _id exist 
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
            hr/developer/message/personal 
        3. if currentNav exist display hearder and footer

        4. footer component
            11. pass the navlist to footer
                before pass to footer
                    if path === 'hr' hide the 'developer' nav --hide
                    or converse 
            22. filter the hide nav before display --in footer component

            33. when click need to move to corresponding page
                component is not in the route
                use ---import {withRouter} from 'react-router-dom'---
                    then this.props.history.replace(nav.path) 

            44. get destination path if match with the current nav.path it is selected show the different icon
    
main page的流程
    1. 在加载完 检查cookie如果cookie在 id不再 就异步获得user的全部信息
    2. 在render里面 如果cookie不再 就跳转到login页面
    3. cookie在 user的信息会被加载的 然后计算出 下面的path hr/hrinfo 根据header
        这里实现自动登录 如果输入是‘/’根目录也会自动跳转
    4. 根据输入路径 选择是否显示头部和底部
        根部拿到传入的navlist过滤到其中一个nav显示到tabbar里面
            拿到上面传入的location里面的path确定哪个被选中就是显示被选中的图标
            点击跳转显示对应界面
            nav每个有自己的path和上面传的不相关 但是一致就说明被选择 显示不同的图标

****************************************

17. personal page
    1. convert UI to container that can get user and all information
        display header, username, company use Result from antd-m
        display position, info, salary
        dispaly button

    2. logout function use modal from antd-m
        import resetUser action
    
18. userlist 
    1. router side
        test postman

    2. redux
        11. api
        22. action-type
        33. build a new reducer userlist
        44. action async->sync

    3. a common userlist component for hr/developer
        which receive userlist from father component then display use Card from antd

    4. in hr/developer import this component and the userlist state 
        componentdidmout init uselist by the dif types

******************************
19. real-time chat   /message
        npm install --save socket.io     --both server and client 




















分解对象 键值
object.keys(objxx).foreach(key)=>{key键 = objxx[key]值}

component 文件 不和redux有交互 可以通过this.props.location 拿到父类的 path
不能发history.push 用withRouter可以