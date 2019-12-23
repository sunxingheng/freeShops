let express = require('express');
let router = express.Router();
var fs = require('fs');
var fsopt = require('./fsopt')

let publicPath = '/image/'

/* 上传页面. */
router.get('/',function (req,res,next) {
    res.render('../views/updateFile.ejs');
})

//读文件
router.get('/public/:folder/:fileName' , function (req,res,next) {
    let modelPath = './public/';
    console.log('xxxxxxxxxxxxxxxxxxxxxxxxx')
    let pathName = `${modelPath}${req.params.folder}/${req.params.fileName}`;
    fsopt.readImg(pathName,res)
})

//下载文件
router.get("/update/:folder/:fileName", function(req, res, next) {
    let modelPath = './public/';
    let pathName = `${modelPath}${req.params.folder}/${req.params.fileName}`;
    fsopt.downLoadFile(pathName,res);
});


/* 上传 */
router.post('/upload/:folder', function(req, res, next) {
    /* 生成multiparty对象，并配置上传目标路径 */
   fsopt.uploadFile(req, res)

})




module.exports = router;