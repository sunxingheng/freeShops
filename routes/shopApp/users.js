let express = require('express');
let router = express.Router();
let userdo = require('./userdo');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send({aaa:'respond with a resourcessssssssssssssss'});
});

router.post('/register', function(req, res, next) {
  // res.cookie('COOKIES',"555666",{ expires: new Date(Date.now() + 900000), httpOnly: true, path:'/'});
  // 登录设置cookies， 90s 默认根目录path："/"，可以设置域名;可用maxAge:90000，打开后90秒计算；expires 是当前时间+90S 的时间点
  userdo.add(req,res,next)
});


router.post('/login', function(req, res, next) {
  userdo.login(req,res,next)
});

module.exports = router;
