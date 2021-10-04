const router = require('express').Router()
const {insertData,delData,editData,getData} = require('../common/fileDB.js')

router.post('/adddata', function (req, res) {
  const result = insertData(req.body)
  res.send(result)
})

router.get('/getdata', function (req, res) {
  res.send(getData())
})

router.get('/update', function (req, res) {
  const data = req.query	
  const result = editData(data)
  res.send(result)
})

router.get('/deldata', function (req, res) {
  const id = req.query.id	
  const result = delData(id)
  res.send(result)
})

module.exports = router