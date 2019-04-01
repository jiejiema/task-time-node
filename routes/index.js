// // var express = require('express');
// // var router = express.Router();
// // var mongoose = require('mongoose'); //引入对象
// // var TodoModel = mongoose.model('users');//引入模型
// // var URL = require('url'); //引入URL中间件，获取req中的参数需要
//
//
// /* GET home page. */
// // router.get('/', function(req, res, next) {
// //   res.render('index', { title: 'Express' });
// // });
//
//
// /*router.post('/create', function(req, res) {
//   console.log('req.body', req.body);
//   new TodoModel({ //实例化对象，新建数据
//     content: req.body.content,
//     updated_at: Date.now()
//   }).save(function(err, todo, count) { //保存数据
//     console.log('内容', todo, '数量', count); //打印保存的数据
//     res.redirect('/'); //返回首页
//   });
// });*/
//
//
// const api = require('./api');
// //操作文件，读写文件
// const fs = require('fs');
// const path = require('path');
// //解析前端发送来的数据
// const bodyParser = require('body-parser')
// const express = require('express');
// const app = express();
//
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}));
// app.use(api);
// // express.static 用来处理静态资源
// app.use(express.static(path.resolve(__dirname, '../dist')));
//
// // app.get('*', function (req, res) {
// //   const html = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), 'utf-8')
// //   res.send(html)
// // })
// app.listen(3000);
// console.log('success listen......');
//
//
//
// module.exports = router;