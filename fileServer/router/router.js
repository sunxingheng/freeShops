var express = require('express');
var router = express.Router();
var multiparty = require('multiparty');
var util = require('util');
var fs = require('fs');

/* 上传页面. */
router.get('/', function(req, res, next) {//res.render('./views/index');
    res.sendfile('./views/index.html');
});

/* 上传 */
router.post('/file/uploading', function(req, res, next) {/* 生成multiparty对象，并配置上传目标路径 */var form = new multiparty.Form();
    /* 设置编辑 */
    form.encoding = 'utf-8';
    //设置文件存储路劲
    form.uploadDir = './public/files';
    //设置文件大小限制
    form.maxFilesSize = 2 * 1024 * 1024;
    // form.maxFields = 1000;   //设置所有文件的大小总和//上传后处理
    form.parse(req, function(err, fields, files) {var filesTemp = JSON.stringify(files, null, 2);

        if(err) {
            console.log('parse error:' + err);
        }else {
            console.log('parse files:' + filesTemp);
            var inputFile = files.inputFile[0];
            var uploadedPath = inputFile.path;
            var dstPath = './public/files' + inputFile.originalFilename;
            //重命名为真实文件名
            fs.rename(uploadedPath, dstPath, function(err) {if(err) {
                console.log('rename error:' + err);
            }else {
                console.log('rename ok');
            }
            })
        }
        res.writeHead(200, {'content-type': 'text/plain;charset=utf-8'});
        res.write('received upload:\n\n');
        res.end(util.inspect({fields: fields, files: filesTemp}))
    })
})

module.exports = router;