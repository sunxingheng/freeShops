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
    news_category_list:'select * from wx_category where auther_id=?',
    news_category_add: 'INSERT INTO wx_category( title, cover_img,remark)  VALUES(?,?,?)',
	news_category_del:'delete from wx_category where id=?',
	news_category_edit:'UPDATE  wx_category SET name=? , cover_img=?, remark=? where id=? ',
	newsList:'select * from wx_news'
};

/*数据库操作*/
let newsdo = {
	// 新闻分类列表
	news_category_list: function (req, res, next) {
	    poolFun(function (err, conn) {
	        if (err) {
	            return false
	        }
	        let param_q = req.query || req.params || req.body;
	        let params = [param_q.shopId];
	        let sqls = sql.news_category_list;
	        modelSql.sqlState(sqls, params, res,function (data) {
				console.log('xxxxx',data)
	            res.send(new message(0,'',data));
	        })
	    })
	},
	//新闻分类增加
	news_category_add: function (req, res, next) {
	    poolFun(function (err, conn) {
	        if (err) {
	            return false
	        }
	        let param_q = req.query || req.params || req.body;
	        let params = [];
	        let sqls = sql.news_category_list;
	        modelSql.sqlState(sqls, params, res,function (data) {
	            res.send(new message(0,'',data));
	        })
	    })
	},
	//新闻分类修改
	news_category_edit: function (req, res, next) {
	    poolFun(function (err, conn) {
	        if (err) {
	            return false
	        }
	        let param_q = req.query || req.params || req.body;
	        let params = [];
	        let sqls = sql.news_category_list;
	        modelSql.sqlState(sqls, params, res,function (data) {
	            res.send(new message(0,'',data));
	        })
	    })
	},
	//新闻分类删除
	news_category_del: function (req, res, next) {
	    poolFun(function (err, conn) {
	        if (err) {
	            return false
	        }
	        let param_q = req.query || req.params || req.body;
	        let params = [param_q.id];
	        let sqls = sql.news_category_del;
	        modelSql.sqlState(sqls, params, res,function (data) {
	            res.send(new message(0,'',data));
	        })
	    })
	},
	//新闻列表
    newsList: function (req, res, next) {
        poolFun(function (err, conn) {
            if (err) {
                return false
            }
            let param_q = req.query || req.params || req.body;
            let params = [];
            let sqls = sql.newsList;
            modelSql.sqlState(sqls, params, res,function (data) {
                res.send(new message(0,'',data));
            })
        })
    },
	//新闻增加
    newsAdd: function (req, res, next) {
        poolFun(function (err, conn) {
            if (err) {
                return false
            }
            let param_q = req.query || req.params || req.body;
            let params = [];
            let sqls = sql.newsList;
            modelSql.sqlState(sqls, params, res,function (data) {
                res.send(new message(0,'',data));
            })
        })
    },

};

module.exports = newsdo;

