const path = require('path');
const archiver =require('archiver');
const fs = require('fs');
const {NodeSSH} = require('node-ssh')
const ssh = new NodeSSH()
const configs = require('./config');

/**
 * 
 * fucn ： nodejs项目 服务器单节点自动化部署
 * theory ： 模拟手工ssh连接服务器把本地文件上传到服务器，再执行服务器自动运行脚本
 * extend  ： git，svn部署只需要本功能运行服务器自动部署脚本即可。多节点部署简单的可以轮询服务器配置信息多次执行本功能，有性能要求到对本功能进行集群，把服务器信息推入mq
 * 
 */


console.log('开始压缩dist目录...');
startZip();

//压缩dist目录为public.zip
function startZip() {
   var archive = archiver('zip', {
       zlib: { level: 5 } //递归扫描最多5层
   }).on('error', function(err) {
       throw err;//压缩过程中如果有错误则抛出
   });
   
   var output = fs.createWriteStream(__dirname + '/public.zip')
    .on('close', function(err) {
        /*压缩结束时会触发close事件，然后才能开始上传，
          否则会上传一个内容不全且无法使用的zip包*/
        if (err) {
           console.log('关闭archiver异常:',err);
           return;
        }
        console.log('已生成zip包');
        console.log('开始上传public.zip至远程机器...');
        uploadFile();
    });

   archive.pipe(output);//典型的node流用法
   //将srcPach路径对应的内容添加到zip包中/public路径
   configs.zipDirs.forEach(v=>{
	   archive.directory(path.resolve(__dirname,v),v);
   })
   configs.zipFiles.forEach(v=>{
   	   archive.file(path.resolve(__dirname,v),{name:v});
   })
   
   archive.finalize();
}

//将dist目录上传至正式环境
function uploadFile() {
   ssh.connect({ //configs存放的是连接远程机器的信息
       host: configs.host,
       username: configs.user,
       password: configs.password,
       port:22 //SSH连接默认在22端口
   }).then(function () { 
	   let lpath = __dirname + '/public.zip'
	   let rpath = configs.path + '/public.zip'
       //上传网站的发布包至configs中配置的远程服务器的指定地址
       ssh.putFile(lpath, rpath).then(function(status) {
               console.log('上传文件成功');
               console.log('开始执行远端脚本');
               startRemoteShell();//上传成功后触发远端脚本
         }).catch(err=>{
            console.log('文件传输异常:',err);
            process.exit(0);
         });
   }).catch(err=>{
       console.log('ssh连接失败:',err);
       process.exit(0);
   });
}

//执行远端部署脚本
function startRemoteShell() {
   //在服务器上cwd配置的路径下执行sh deploy.sh脚本来实现发布
   ssh.execCommand(`sh ${configs.scriptName}`, { cwd: configs.scriptPath }).then(function(result) {
       console.log('远程STDOUT输出: ' + result.stdout)
       console.log('远程STDERR输出: ' + result.stderr)
       if (!result.stderr){
           console.log('发布成功!');		   
           process.exit(0);
       }
   });
}