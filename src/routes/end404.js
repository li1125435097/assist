const router = require('express').Router()
const fs = require('fs')
const path = require('path')
const {insertData,delData,editData,getData} = require('../common/fileDB.js')

router.get('/*', function (req, res, next) {	
  const page = 	req.url.split('/')[1]
  const mypath = path.join(__dirname,'../views',page+'.html')
  const exist = fs.existsSync(mypath)
  if(exist){
	  res.render(page,{})
  }else{
	  res.send('404,你请求的路径不存在')
  }
})

module.exports = router