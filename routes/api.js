const mg = require('./mg');
const express = require('express');
const router = express.Router(); //这里用到了express的路由级中间件

//登录接口
router.post('/users/login',(req,res) => {
    console.log(req, res)
    models.Login.find({name: req.body.name, password: req.body.password},(err,data) => {
        if (err) {
            // res.send(err);
            res.send({'status': 1002, 'message': '查询数据库失败!', 'data': err});
        } else {
            console.log(data)
            if (data.length > 0) {
                res.send({'status': 1000, 'message': '登录成功!', 'data': data});
            } else {
                res.send({'status': 1001, 'message': '登录失败，该用户没有注册!', 'data': err});
            }
        }
    })
});
router.get('/users/login1',(req,res) => {
    // console.log(req, res);
    mg.Login.find({'username': 'ma','password':'666666'},(err,data) => {
        if (err) {
            res.send(err);
            res.send({'status': 1002, 'message': '查询数据库失败!', 'data': err});
        } else {
            console.log(data)
            if (data.length > 0) {
                res.send({'status': 1000, 'message': '登录成功!', 'data': data});
            } else {
                res.send({'status': 1001, 'message': '登录失败，该用户没有注册!', 'data': err});
            }
        }
    })
});


module.exports = router;