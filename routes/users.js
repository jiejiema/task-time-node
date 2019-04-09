var express = require('express');
var router = express.Router();
const mg = require('./mg');

/* GET users listing. */
router.post('/login', function (req, res, next) {
    mg.Login.find({name: req.body.name, password: req.body.password}, (err, data) => {
        if (err) {
            res.send({'status': 1002, 'message': '查询数据库失败!', 'data': err});
        } else {
            // console.log(data,'data')
            if (data.length > 0) {
                res.send({'status': 1000, 'message': '登录成功!', 'data': data});
            } else {
                res.send({'status': 1001, 'message': '登录失败，该用户没有注册!', 'data': err});
            }
        }
    })
});

router.post('/register', function (req, res, next) {
    console.log('req', req.body.username,req.body.password);

    const register = new mg.registerModel.Register({
        username:req.body.username,
        password: req.body.password
    });

    console.log(2);

    register.save(function(err,ret){
        if(err){
            console.log(err);
            res.send(err);
        }else{
            console.log('save succeed');
            console.log(ret);
            res.send({'status': 0, 'message': '登录成功!'});
        }
    });
});

router.get('/logout', function (req, res, next) {
    res.send('respond with a resource');
});

router.get('/register', function (req, res, next) {
    res.send('respond with a resource');
});

module.exports = router;
