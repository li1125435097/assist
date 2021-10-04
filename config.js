// 自动化部署本地资源路径以及服务器配置信息

module.exports = {
	zipDirs : ['src'],				// 本地要压缩的文件夹名称数组
	zipFiles : ['app.js'],			// 本地要压缩的文件名称数组
	host : "120.55.170.164",		// 服务器ip
	user : "root",					// 服务器用户名
	password : '***********',		// 服务器登陆密码
	path : '/opt',					// 本地压缩文件上传到服务器的路径
	scriptName : 'ls.sh',			// 服务器自动部署脚本名称
	scriptPath : '/root'			// 服务器自动部署脚本路径
}