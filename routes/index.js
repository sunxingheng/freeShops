var express = require('express');
var router = express.Router();
var app = express();
var db = require('../config/database')
/* GET home page. */
router.get('/', function(req, res, next) {
  // console.log()
  db.query("select * from db ",function(err,vals,fields){
    //其他信息
    res.render('index', { title: 'Express' });
  });
  // db.query("SELECT * FROM db; ",[],function(result,fields){
  //   return 'xxx'
  // })





});
module.exports = router;
