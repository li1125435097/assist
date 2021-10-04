const router = require('express').Router()
const fs = require('fs')
const path = require('path')
const {insertData,delData,editData,getData} = require('../common/fileDB.js')

router.get('/', function (req, res) {
  res.render('index',{})
})

module.exports = router