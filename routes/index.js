var express = require('express');
var router = express.Router();
var app = express();
var db = require('../config/database')
/* GET home page. */
router.get('/', function(req, res, next) {
  // console.log()
  db.query("select * from user ",function(err,vals,fields){
    //其他信息
    console.log(vals.length,'xxxxx',fields)
    res.render('index', { title: 'Express' });
  });
  // db.query("SELECT * FROM db; ",[],function(result,fields){
  //   return 'xxx'
  // })
});
router.get('/city', function (req, res) {
  console.log(req.query)
  res.json({
    errno: 0,
    data: req.query
  })
})

router.get('/register', function (req, res) {
  var params = req.params;
  if(params.phone){
    db.query("select * from user where phone='xxx'",[],function(err,vals,fields){
      //其他信息
      console.log(vals.length,'xxxxx',fields)

      res.render('index', { title: 'Express' });
    });
    console.log(req.query)
  }
  res.json({
    errno: 0,
    data: req.query
  })
})

// app.post('/api/updatehero',function(req,res) {
//   res.json({err_code:0,message:'更新成功',affectedRows:'xxxx'})
// })

module.exports = router;
