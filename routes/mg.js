/*
* 此文件为与数据库连接代码
* */

//mongoose通过三个模块去创建一个数据库集合,还有定义"集合"的基本组成结构并使其具有相应的操作数据库能力。
const mongoose = require('_mongoose@5.4.20@mongoose');
mongoose.connect('mongodb://localhost/task-time') //连接本地数据库

const db = mongoose.connection;
//mongoose.connection的两个方法，error与open 代表连接失败和连接成功
db.on('error', function callback() { //监听是否有异常
    console.log("Connection error");
});
db.once('open', function callback() { //监听一次打开
    //在这里创建你的模式和模型
    console.log('connected!！！！');
});

/*var blogSchema = new Schema({ // Schema头字母大写，因为Schema是构造函数
    title:  String,
    comments: [{ body: String, date: Date }], // 对象数组
    date: { type: Date, default: Date.now }, // 通过default设置默认值
    hidden: Boolean,
    meta: { // 嵌套对象
        votes: Number,
        favs:  Number
    }
});
var Blog = mongoose.model('Blog', blogSchema);//编译model*/

//1.Schema  数据库集合的模型骨架，或者是数据属性模型传统意义的表结构。
// const loginSchema = new mongoose.Schema({
//     username: String, //定义一个属性user_id，类型为String
//     password: String, //定义一个属性content，类型为String
//     // updated_at: Date //定义一个属性updated_at，类型为Date
// });

//2.Model 通过Schema构造而成，除了具有Schema定义的数据库骨架以外，还可以具体的操作数据库。
//这里表示在task-time数据库中创建了一个users的表，并且格式为loginSchema中所定义的
// const loginModel= {
//     Login : mongoose.model('users',loginSchema)
// };
// mongoose.model('users', loginSchema); //将该Schema发布为Model,user就是集合名称


const loginSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        require: true
    },
    password: {
        type: String,
        unique: true,
        require: true
    }
});

// const loginModel = {
//     user: mongoose.model('users', loginSchema)
// };
const loginModel = mongoose.model('users', loginSchema);

// module.exports = loginModel;
module.exports = {
    loginModel,
    // registerModel
};