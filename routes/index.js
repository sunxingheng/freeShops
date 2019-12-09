let express = require('express');
let router = express.Router();
let app = express();
let db = require('../config/database');
let sqlPool = require('../utils/sqlPool');
let fs = require('fs');

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
router.post('/login_by_pass', function (req, res) {
  console.log(1,req.body,2,req.query)
  console.log(sqlPool.arrToobj({a:1,b:2}))
  res.json({
    errno: 0,
    data: req.body
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
