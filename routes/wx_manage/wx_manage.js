let express = require('express');
let router = express.Router();
let shopdo = require('./shopdo');
let newsdo = require('./newsdo');
let message = require("../../utils/message");
/* GET users listing. */

/**
 * @api {post} / 用户登录
 * @apiDescription 首页
 * @apiName home-page
 * @apiGroup manage
 * @apiParam {string} loginName 用户名
 * @apiParam {string} loginPass 密码
 * @apiSuccess {html} result 顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "success" : "true",
 *      "result" : {
 *          "name" : "loginName",
 *          "password" : "loginPass"
 *      }
 *  }
 * @apiSampleRequest http://localhost:3000/api/user/submit-login
 * @apiVersion 1.0.1
 */



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
})


//商品删除
router.delete('/goods/delete',function (req,res,next) {
    shopdo.deleteGoods(req,res,next)
})




// ----------------------------------------------------------------

//新闻分类列表
router.get('/manage/news/category/list',function (req,res,next) {
	// console.log('xxxxxxx',new message(0))
	// res.send(new message(0))
    newsdo.news_category_list(req,res,next)
})
//新闻分类新增
router.post('/manage/news/category/add',function (req,res,next) {
	res.send(new message(0))
    // newsdo.newsAdd(req,res,next)
})
//新闻分类删除
router.delete('/manage/news/category/del/:id',function (req,res,next) {
	res.send(new message(0))
    // newsdo.newsList(req,res,next)
})
//新闻分类修改
router.post('/manage/news/categorys/eit/:id',function (req,res,next) {
	res.send(new message(0))
    // newsdo.newsAdd(req,res,next)
})

//新闻列表
router.get('/manage/news/list',function (req,res,next) {
	res.send(new message(0))
    // newsdo.newsList(req,res,next)
})
//新闻新增
router.post('/manage/news/add',function (req,res,next) {
	res.send(new message(0))
    // newsdo.newsAdd(req,res,next)
})
//新闻删除
router.delete('/manage/news/del/:id',function (req,res,next) {
	res.send(new message(0))
    // newsdo.newsList(req,res,next)
})
//新闻修改
router.post('/manage/news/eit/:id',function (req,res,next) {
	res.send(new message(0))
    // newsdo.newsAdd(req,res,next)
})

router.get('/manage/news/detail',function (req,res,next) {
	res.send(new message(0))
    // newsdo.newsAdd(req,res,next)
})


module.exports = router;
