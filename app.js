const express = require('express')
const ejs = require('ejs');
const path = require('path');
const bodyParser = require('body-parser')
const app = express()

// 配置post请求解析
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// 开放静态路径
app.use(express.static('src/static'));

// 模版引擎配置
app.set('views', path.join(__dirname, 'src/views'));
app.engine("html",ejs.__express)
app.set("view engine","html")




// 路由配置
app.use('/',require('./src/routes/index.js'))
app.use('/db',require('./src/routes/db.js'))






app.use('/',require('./src/routes/end404.js'))
// 服务启动
app.listen(8080,function(){
	console.log('本地辅助服务启动成功…………')
	console.log('本地访问：  http://localhost:8080')
})