# 本项目为一个基础全栈网站项目，程序入口为app.js，拉取本项目后，在目录下运行cnpm i 下载依赖文件，npm run start即可启动项目
# 源码存在src中，static为开放对静态文件，可通过 http://localhost:8080/a.css 访问，router为控制层文件，views为显示层文件，common为通用模块目录，目前存放数据库驱动和数据库文件
# 开发新模块过程为在routes下新建控制层文件，把这个文件在app.js导入注册。再在views中写一个页面,调用对应接口
# 我在控制层封装了一个数据库增删改查，最简单的开发只需要写一个html文件就行，我在views放了样板index.html，里边有数据库增删改查调用。你只需要写把样板复制一份改个名字，就可以在 http://localhost:8080/name （name为你改的名字）进行访问 # assist
