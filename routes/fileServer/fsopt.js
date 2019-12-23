var fs = require("fs");
var multiparty = require('multiparty');
var util = require('util');
let message = require("../../utils/message");
let config = require("../../config/config");
let common = require("../../utils/common");

module.exports = {
    //创建目录/递归创建目录
    mkdirFolder: function (folderName, recursive, res, callback) {
        fs.exists(folderName, function (exists) {
            if (!exists) {
                fs.mkdir(folderName, {recursive: recursive}, err => {
                    if (err) {
                        res.send(new message(8));
                    } else {
                        callback();
                    }

                });
            } else {
                callback();
            }
        });
    },
    uploadFile: function (req, res) {
        let _self = this;
        let form = new multiparty.Form();
        /* 设置编辑 */
        form.encoding = 'utf-8';
        //设置文件存储路劲
        form.uploadDir = './public/' + req.params.folder;
        console.log('xxxxxxxxxxxx', form.uploadDir)
        //设置文件大小限制
        form.maxFilesSize = 200 * 1024 * 1024;
        // form.maxFields = 1000;   //设置所有文件的大小总和//上传后处理

        _self.mkdirFolder(form.uploadDir, true, res, function () {
            form.parse(req, function (err, fields, files) {
                let filesTemp = JSON.stringify(files, null, 2);
                if (err) {
                    response.writeHead(404, 'not found')
                    res.send(new message(1));
                    res.end();
                    res.send(new message(1));
                    res.end();
                } else {
                    var inputFile = files.file[0];
                    let urlName = config.config.fileHost +JSON.parse(filesTemp).file[0].path.replace(/\\/g,'/');
                    let body = {
                            name: inputFile.originalFilename,
                            url :urlName
                    }
                    res.send(new message(0, '',body));
                    res.end()

                    // console.log('parse files:' + JSON.stringify(files));
                    //
                    // var uploadedPath = inputFile.path;
                    // var dstPath = './public/files/' + inputFile.originalFilename;
                    // //重命名为真实文件名
                    // console.log('xxxxxxxxxxxxxxxxx',uploadedPath, dstPath)
                    // // fs.rename(uploadedPath, dstPath, function (err) {
                    // //     if (err) {
                    // //         console.log('rename error:' + err);
                    // //     } else {
                    // //         console.log('rename ok');
                    // //     }
                    // // })
                }
                // res.writeHead(200, {'content-type': 'text/plain;charset=utf-8'});
                // res.write('received upload:\n\n');

                // res.end(util.inspect(new message(0,'',{fields: fields, files: JSON.parse(filesTemp).file[0]})))
            })
        })


    },
    downLoadFile: function (path, res) {
        fs.readFile(path, 'utf-8', function (err, data) {
            // 读取文件失败/错误
            if (err) {
                res.send(new message(7))
                res.end();
            } else {
                res.write(data);//将index.html显示在客户端
                res.end();
            }
        });
    },
    readImg: function (path, res) {
        let _self = this;
        console.log('xxxxxxxxxxxxxxxxxxxxxxxxx')
        fs.readFile(path, 'binary', function (err, file) {
            console.log(err)
            if (err) {
                _self.readImg('./public/files/default.png', res)
            } else {
                res.write(file, 'binary');
                res.end();
            }
        });
    }
}