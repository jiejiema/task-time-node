require('./routes/mg');

var createError = require('http-errors');
var express = require('express');
var path = require('path');  //path对象，规范连接和解析路径
var cookieParser = require('cookie-parser'); //解析cookie
var expressSession = require('express-session');
var logger = require('morgan'); //http请求日志记录器


// var indexRouter = require('./routes/index'); //加载路由
var usersRouter = require('./routes/users');
var apiRouter = require('./routes/api');

var app = express();  //写一个服务

//------------引擎模块 S---------//
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

///======= 使用中间件 S===========//
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressSession({
  name: 'task-username',
  secret :  'secret', // 对session id 相关的cookie 进行签名
  resave : true,
  saveUninitialized: false, // 是否保存未初始化的会话
  cookie : {
    maxAge : 1000 * 60 * 3, // 设置 session 的有效时间，单位毫秒
  },
}));
app.use(express.static(path.join(__dirname, 'public')));

///=======路由信息 （接口地址）S ===========//
//存放在./routes目录下

// app.use(function(req, res, next) {
//   console.log(req.cookies, 'cookie');
 /* if (req.cookies) {

  }*/
// });

// app.get('/', function (req, res) {
//     console.log(req,'req')
//     if(req.session.userName){  //判断session 状态，如果有效，则返回主页，否则转到登录页面
//         res.render('home',{username : req.session.userName});
//     }else{
//         res.redirect('login');
//     }
// })


/*app.all('/!*', function (req, res, next) {
    console.log(1);
    var url = req.originalUrl// 获取浏览器中当前访问的nodejs路由地址 
    console.log(url);
    if (url === '/users/login') {
        next()
    } else {
        console.log('req.session.sid', req.session.sid)
        if (req.session.sid) {
            // 判断用户是否登录     
            next()
        } else {
            res.json({
                responseCode: 1000,
                responseMsg: '暂无权限'
            })
        }
    }
})*/

/*app.use(function(req, res, next){
    console.log('use');
    if(req.session.userName){
        console.log('has username');
        next();
    } else {
        console.log('no session');
        console.log(req);
        if(req.originalUrl == '/users/login') {
            next();
        } else {
            res.json({
                status: 0,
                msg: '未登录',
                result: ''
            })
        }
    }
});*/

app.all('*', function (req, res, next) {
    console.log('req.session11111',req.session);
    next()
});

// app.use('/', indexRouter);  //在app中注册routes接口
app.use('/users', usersRouter);  //app中注册users接口
app.use('/api', apiRouter);  //app中注册users接口


app.get('/', function (req, res) {
  console.log(111);
  /*if(req.session.userName){  //判断session 状态，如果有效，则返回主页，否则转到登录页面
    res.render('home',{username : req.session.userName});
  }else{
    res.redirect('/login');
  }*/
});

// catch 404 and forward to error handler
//捕获404错误，并转向错误处理程序
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler 错误处理程序
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
