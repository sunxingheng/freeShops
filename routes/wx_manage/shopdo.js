//数据逻辑处理
let mysql = require("mysql");
let result = require("../../utils/res"); //暂时无用
let config = require('../../config/config').config;
let resData = require("../../utils/resdata");
let message = require("../../utils/message");
let modelSql = require('../../utils/modelSql')

/*启动连接池*/

let pool = mysql.createPool(config);

let poolFun = function (fun) {
    return pool.getConnection(fun)
};

/*sql 查询语句*/
let sql = {
    add: 'INSERT INTO manage_user(shopName,shopPassword,shopMobile) VALUES(?,?,?)',
    login: 'select * from  manage_user where shopMobile=? and shopPassword=?',
    getCategory: 'select * from center_category where shopId=?',
    addCategory: 'INSERT INTO center_category(categoryName,remark ,shopId)  VALUES(?,?,?)',
    editCategory: 'UPDATE  center_category SET categoryName=?,remark=? WHERE shopId=? AND categoryId=?',
    deleteCategory: 'delete from center_category where categoryId=?',
    getGoodsList: 'select center_category.categoryName , manage_user.shopName ,center_goods.* from center_goods inner join center_category on center_goods.categoryId = center_category.categoryId  inner join manage_user on center_goods.shopId = manage_user.shopId',
    goodsAdd: 'INSERT INTO center_goods( goodsCode, goodsBarCode, goodsName,goodsPrice, categoryId, goodsDetails, shopId, unit, goodsImg,putawayStatus)  VALUES(?,?,?,?,?,?,?,?,?,?)',
    putawayForGoods:'INSERT INTO center_snapshoot SELECT * FROM center_goods WHERE goodsId=?',
    getGoodsDetail: 'select goodsId, goodsCode, goodsBarCode, goodsName,goodsPrice, categoryId, goodsDetails, shopId, unit, goodsImg,putawayStatus from center_goods where goodsId=?',
    editGoods: 'UPDATE  center_goods SET goodsCode=? , goodsBarCode=? , goodsName=? , goodsPrice=? , categoryId=? , goodsDetails=?, unit=? , goodsImg=?  WHERE  goodsId=? AND shopId=? ',
    deleteGoods: 'delete from center_goods where goodsId=?',
};

/*数据库操作*/
let shopdo = {
    //新增/编辑用户
    add: function (req, res, next) {
        let param_q = req.query || req.params;
        let param_b = req.body || req.params;
        let valArr = [];
        let id = param_b.id;
        valArr.push(param_b.shopName);
        valArr.push(param_b.shopPassword);
        valArr.push(param_b.shopMobile);
        // valArr.push(param_b.id);
        console.log('============获取请求数据start==========')
        console.log(param_q);
        console.log(param_b);
        console.log(valArr);
        console.log('============获取请求数据end==========')

        poolFun(function (err, conn) {
            if (err) {
                return false
            }
            conn.query(sql.sele, param_b.shopName, function (e, r) {
                console.log(e, r)
                if (r.length > 0 && !id) {
                    res.send(new message(2))//已经存在
                    return false
                } else if (r.length > 0 && (r[0].id !== id) && id) {
                    res.send(new message(3));//编辑但不存在
                    return false
                }
                //执行下一步操作
                if (!id) {
                    if (!valArr[0] || !valArr[1] || !valArr[2]) {
                        res.send(new message(4));
                        return false
                    }
                }
                conn.query(id ? sql.edit : sql.add, id ? valArr.concat(id) : valArr, function (e, r) { //val选填

                    if (r) {
                        // return res.redirect('back'); //返回请求页面
                        // res.redirect("http://127.0.0.1:3000/");
                        res.send(new message(0))
                    } else {
                        res.json(new message(1))
                    }
                });
                conn.release();

                // return res.redirect('back'); //返回请求页面

            });


        })
    },

    /*登录*/
    login: function (req, res, next) {
        let param_b = req.body || req.params;
        if (!param_b.shopName || !param_b.shopPassword) {
            res.send(new message(4));
            return false
        }
        poolFun(function (err, conn) {
            if (err) {
                return false
            }
            conn.query(sql.login, [param_b.shopMobile, param_b.shopPassword], function (e, r) {
                if (r.length > 0) {
                    res.send(new message(0, '登陆成功', r[0]))
                    // res.send(new resData(1,req.cookies.COOKIES2));
                    // req.session.loginKey=req.cookies.COOKIES2; //登录成功设置一个session
                } else {
                    res.send(new message(5));
                    // req.session.loginKey=null;
                }

            });
            conn.release();
        })

    },

    /*查询 全部*/
    getCategory: function (req, res, next) {
        poolFun(function (err, conn) {
            if (err) {
                return false
            }
            let param_q = req.query || req.params;
            let params = [param_q.shopId];
            let sqls = sql.getCategory;
            modelSql.sqlState(sqls, params, res,function (data) {
                res.send(new message(0,'',data));
            })
        })
    },

    /* 新增 分类*/
    addCategory: function (req, res, next) {
        let param_b = req.body || req.params;
        if (!param_b.shopId || !param_b.categoryName) {
            res.send(new message(4));
            return false;
        }
        let sqls = sql.addCategory;
        let params = [param_b.categoryName, param_b.remark, param_b.shopId, param_b.categoryId];
        modelSql.sqlState(sqls, params, res,function (data) {
            res.send(new message(0,'',data));
            res.send(new message(0));
        })
    },

    /* 编辑 分类*/
    editCategory: function (req, res, next) {
        let param_b = req.body || req.params;
        if (!param_b.shopId || !param_b.categoryName) {
            res.send(new message(4));
            return false;
        }
        let sqls = sql.editCategory
        let params = [param_b.categoryName, param_b.remark, param_b.shopId, param_b.categoryId];
        modelSql.sqlState(sqls, params, res,function (data) {
            res.send(new message(0));
        })
    },

    /*删除 分类*/
    deleteCategory: function (req, res, next) {
        let categoryId = (req.query || req.params).categoryId;
        if (!categoryId) {
            res.send(new message(6))
            return false
        }
        let sqls = sql.deleteCategory
        let params = [categoryId];
        modelSql.sqlState(sqls, params, res,function (data) {
            res.send(new message(0));
        })
    },


    /*查询商品库列表*/
    getGoodsList: function (req, res, next) {
        let param_b = req.query || req.params || req.body;
        console.log('aaaaaaaaaaaa', param_b)
        if (!param_b.shopId) {
            return false;
        }
        let sqls = sql.getGoodsList
        let params = [param_b.shopId * 1, (param_b.pageNum - 1) * param_b.pageSize, param_b.pageSize * 1];
        modelSql.sqlState(sqls, params, res,function (data) {
            res.send(new message(0,'',data));
        })
    },

    //查询商品详情
    getGoodsDetail: function (req, res, next) {
        let param_b = req.query || req.params || req.body;
        if (!param_b.goodsId) {
            return false;
        }
        let sqls = sql.getGoodsDetail
        let params = [param_b.goodsId];
        modelSql.sqlState(sqls, params, res,function (data) {
            res.send(new message(0,'',data));
        })
    },

    //新增
    goodsAdd: function (req, res, next) {
        let param_b = req.body || req.params || req.params;
        let must = [param_b.goodsCode, param_b.goodsBarCode, param_b.goodsName, param_b.goodsPrice, param_b.categoryId, param_b.shopId, param_b.unit];
        for (let i in must) {
            if (!must[i]) {
                res.send(new message(4));
                return false;
            }
        }
        let sqls = sql.goodsAdd;
        //初始化商品状态
        param_b.putawayStatus = 0;
        //占位符固定化
        let pla =['goodsCode', 'goodsBarCode', 'goodsName','goodsPrice', 'categoryId', 'goodsDetails','shopId', 'unit', 'goodsImg','putawayStatus'];
        let params = modelSql.placeholder(pla, param_b);
        modelSql.sqlState(sqls, params, res,function (data) {
            res.send(new message(0));
        })
    },


    //编辑
    goodsEdit: function (req, res, next) {
        let param_b = req.body || req.params || req.params;
        let must = [param_b.goodsCode, param_b.goodsBarCode, param_b.goodsName, param_b.goodsPrice, param_b.categoryId, param_b.shopId, param_b.unit];
        for (let i in must) {
            if (!must[i]) {
                res.send(new message(4));
                return false;
            }
        }
        let pla = ['goodsCode', 'goodsBarCode', 'goodsName', 'goodsPrice', 'categoryId', 'goodsDetails', 'unit', 'goodsImg', 'goodsId', 'shopId']
        let params = modelSql.placeholder(pla, param_b);
        let sqls = sql.editGoods;
        console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',JSON.stringify(params))
        modelSql.sqlState(sqls, params, res,function (data) {
            res.send(new message(0));
        })

    },

    putawayForGoods:function(req,res,next){
        let goodsId = (req.query || req.params).goodsId;
        if (!goodsId) {
            res.send(new message(6))
            return false
        }
        let sqls = sql.putawayForGoods;
        let params = [goodsId];
        modelSql.sqlState(sqls, params, res,function (data) {

            res.send(new message(0));
        })
    },

    //删除
    deleteGoods:function (req,res,next) {
        let goodsId = (req.query || req.params).goodsId;
        if (!goodsId) {
            res.send(new message(6))
            return false
        }
        let sqls = sql.deleteGoods
        let params = [goodsId];
        modelSql.sqlState(sqls, params, res,function (data) {
            res.send(new message(0));
        })
    }
};

module.exports = shopdo;

