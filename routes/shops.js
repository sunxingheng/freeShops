let express = require('express');
let router = express.Router();
let shopdo = require('../server/shopdo');
let message=require("../server/message");

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send({aaa:'shops'});
});


//商家注册
router.post('/register', function(req, res, next) {
    // res.cookie('COOKIES',"555666",{ expires: new Date(Date.now() + 900000), httpOnly: true, path:'/'});
    // 登录设置cookies， 90s 默认根目录path："/"，可以设置域名;可用maxAge:90000，打开后90秒计算；expires 是当前时间+90S 的时间点
    shopdo.add(req,res,next)
});

//商家登录
router.post('/login', function(req, res, next) {
    shopdo.login(req,res,next)
});

//商品分类列表
router.get('/category/list',function (req,res,next) {
    shopdo.getCategory(req,res,next)
})
//商品分类新增
router.post('/category/add',function (req,res,next) {
    shopdo.addCategory(req,res,next);
})
//商品分类编辑
router.put('/category/edit',function (req,res,next) {
    shopdo.editCategory(req,res,next);
})

//商品分类删除
router.delete('/category/delete',function (req,res,next) {
    shopdo.deleteCategory(req,res,next);
})

//商品列表
router.get('/goods/list',function (req,res,next) {
    shopdo.getGoodsList(req,res,next)
})

//商品详情
router.get('/goods/detail',function (req,res,next) {
    shopdo.getGoodsDetail(req,res,next)
})

//商品新增
router.post('/goods/add',function (req,res,next) {
    shopdo.goodsAdd(req,res,next)
    // res.send(new message(0))
})

//商品编辑
router.put('/goods/edit',function (req,res,next) {
    shopdo.goodsEdit(req,res,next)
    // res.send(new message(0))
})

//商品删除
router.delete('/goods/delete',function (req,res,next) {
    shopdo.deleteGoods(req,res,next)
})


module.exports = router;
