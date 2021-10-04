const path = require('path')
const fs = require('fs')
l = console.log
const dbpath = path.join(__dirname,'jsonData.json')

// 判断数据库是否存在，不存在新建一个
const exist = fs.existsSync(dbpath)
!exist && fs.writeFileSync(dbpath,JSON.stringify([]))

// 获取数据库数据
function getData(){
	const data = fs.readFileSync(dbpath).toString()
	return JSON.parse(data)
}

// 新增数据库数据,data对对象
function insertData(data){
	let datas = getData()
	let id = datas.length>0 ? datas[datas.length-1].id+1 : 1
	data.id = id
	datas.push(data)
	const result = fs.writeFileSync(dbpath,JSON.stringify(datas))
	return !result ? 'success' : 'fail'
}

// 删除数据库数据
function delData(id){
	let datas = getData()
	const sl = datas.length
	datas.forEach((v,i)=>{v.id == id && datas.splice(i,1)})
	const el = datas.length
	const result = fs.writeFileSync(dbpath,JSON.stringify(datas))
	return !result && sl != el  ? 'success' : 'fail'
}

// 修改数据库数据，data为携带id字段对对象
function editData(data){
	let datas = getData()
	datas.forEach((v,i)=>{v.id == data.id && datas.splice(i,1,data)})
	const result = fs.writeFileSync(dbpath,JSON.stringify(datas))
	return !result ? 'success' : 'fail'
}

// l(insertData({a:1}))
// l(delData(5))
// editData({ a: 1, id: 2 ,name: 'zs'})
// l(getData())

module.exports = {insertData,delData,editData,getData}