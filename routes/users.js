var express = require('express');
var router = express.Router();
const mg = require('./mg');

/* GET users listing. */
router.post('/login', function (req, res, next) {
    const username = req.body.username;
    const password = req.body.password;
    // console.log(req.body);
    mg.loginModel.find({username: username, password: password}, (err, data) => {
        console.log(data, 'data');
        // console.log(data[0].username);
        if (err) {
            res.send({'result': 1, 'message': '查询数据库失败!', 'data': err});
        } else {
            // console.log(data,'data')
            if (data.length > 0) {
                // res.cookie('username', data[0].username, {
                //     path:'/',    // cookie 放到根目录
                //     maxAge: 1000*60*60   // 时间 一小时
                // }),
                // console.log(res.cookie)
                req.session.userName = req.body.username;
                console.log(req.session,'req.session.userName')
                // res.redirect('/')
                res.send({'result': 0, 'message': '登录成功!', 'data': data});
            } else {
                res.send({'result': 1, 'message': '用户名或密码错误!', 'data': err});
            }
        }
    })
});

router.post('/register', function (req, res, next) {
    console.log('req', req.body.username,req.body.password);
    const username = req.body.username;
    const password = req.body.password;

    mg.loginModel.find({username: username}, (err, data) => {
        console.log(1, data);
        if (err) {
            res.send({'result': 1, 'message': '查询数据库失败!', 'data': err});
        } else {
            console.log(data,'data')
            if (data.length > 0) {
                res.send({'result': 0, 'message': '已注册!', 'data': data});
            } else {
                const register = new mg.loginModel({
                    username: username,
                    password: password
                });

                register.save(function(err,ret){
                    if(err){
                        console.log(err);
                        res.send(err);
                    }else{
                        console.log('save succeed');
                        console.log(ret);
                        res.send({'result': 0, 'message': '注册成功!','data': data});
                    }
                });
            }
        }
    });
});

router.post('/logout', function (req, res, next) {
    req.session.userName = null
    res.redirect('login');
})

module.exports = router;
