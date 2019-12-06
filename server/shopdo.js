//数据逻辑处理
let mysql=require("mysql");
let result=require("./res"); //暂时无用
let config = require('../config/config').config;
let resData=require("./resdata");
let message=require("./message");

/*启动连接池*/

let pool=mysql.createPool(config);

let poolFun=function(fun){
    return  pool.getConnection(fun)
};

/*sql 查询语句*/
let sql={
    add: 'INSERT INTO shop(shopName,shopPassword,shopMobile) VALUES(?,?,?)',
    login:'select * from  shop where shopMobile=? and shopPassword=?',
    getCategory:'select * from category where shopId=?',
    addCategory:'INSERT INTO category(categoryName,remark ,shopId)  VALUES(?,?,?)',
    editCategory:'UPDATE  category SET categoryName=?,remark=? WHERE shopId=? AND categoryId=?',
    deleteCategory:'delete from category where categoryId=?',
    getGoodsList:'select * from goods where shopId=? limit ?,?',
    edit:'UPDATE  shop set shopName=? , shopPassword=?  , code=? where id=?',
    sele:'select * from shop where shopName = ?'

};

/*数据库操作*/
let shopdo={
    //新增/编辑用户
    add:function(req,res,next){
        let param_q= req.query || req.params;
        let param_b = req.body || req.params;
        let valArr=[];
        let id=param_b.id;
        valArr.push(param_b.shopName);
        valArr.push(param_b.shopPassword);
        valArr.push(param_b.shopMobile);
        // valArr.push(param_b.id);
        console.log('============获取请求数据start==========')
        console.log(param_q);
        console.log(param_b);
        console.log(valArr);
        console.log('============获取请求数据end==========')

        poolFun(function(err,conn){
            if(err){
                return false
            }
            conn.query(sql.sele,param_b.shopName,function(e,r){
                console.log(e,r)
                if(r.length>0&&!id){
                    res.send(new message(2))//已经存在
                    return false
                }else if(r.length>0&&(r[0].id!==id)&&id){
                    res.send(new message(3));//编辑但不存在
                    return false
                }
                //执行下一步操作
                if(!id){
                    if(!valArr[0] || !valArr[1] || !valArr[2]){
                        res.send(new message(4));
                        return false
                    }
                }
                conn.query(id?sql.edit:sql.add,id?valArr.concat(id):valArr,function(e,r){ //val选填

                    if(r) {
                        // return res.redirect('back'); //返回请求页面
                        // res.redirect("http://127.0.0.1:3000/");
                        res.send(new message(0))
                    }else{
                        res.json(new message(1))
                    }
                });
                conn.release();

                // return res.redirect('back'); //返回请求页面

            });


        })
    },

    /*登录*/
    login:function(req,res,next){
        let param_b = req.body || req.params;
        if(!param_b.shopName||!param_b.shopPassword){
            res.send(new message(4));
            return false
        }
        poolFun(function(err,conn){
            if(err){
                return false
            }
            conn.query(sql.login,[param_b.shopMobile,param_b.shopPassword],function(e,r){
                if(r.length>0){
                    res.send(new message(0,'登陆成功',r[0]))
                    // res.send(new resData(1,req.cookies.COOKIES2));
                    // req.session.loginKey=req.cookies.COOKIES2; //登录成功设置一个session
                }else{
                    res.send(new message(5));
                    // req.session.loginKey=null;
                }

            });
            conn.release();
        })

    },

    /*查询 全部*/
    getCategory:function(req,res,next){
        poolFun(function(err,conn){
            if(err){
                return false
            }
            let param_q= req.query || req.params;
            conn.query(sql.getCategory,[param_q.shopId],function(e,r){
                console.log(e,r)
                if(r){
                    res.send(new message(0,'',r));
                }else{
                    res.send(new message(1));
                }

            });
            conn.release();
        })
    },

   /* 新增 分类*/
    addCategory:function(req,res,next){
        let param_b = req.body || req.params;
        if(!param_b.shopId || !param_b.categoryName){
            res.send(new message(4));
            return false;
        }
        poolFun(function (err,conn) {
            if(err){
                return false
            }
            let sqls = param_b.categoryId? sql.editCategory:sql.addCategory;
            conn.query(sqls,[param_b.categoryName,param_b.remark,param_b.shopId ,param_b.categoryId],function(e,r){
                if(r){
                    res.send(new message(0));
                }else{
                    res.send(new message(1));
                }
            });
        })
    },
    /* 编辑 分类*/
   editCategory:function(req,res,next){
        let param_b = req.body || req.params;
        if(!param_b.shopId || !param_b.categoryName){
            res.send(new message(4));
            return false;
        }
        poolFun(function (err,conn) {
            if(err){
                return false
            }
            conn.query(sql.editCategory,[param_b.categoryName,param_b.remark,param_b.shopId ,param_b.categoryId],function(e,r){
                console.log('xxxxx',e,r)
                if(r){
                    res.send(new message(0));
                }else{
                    res.send(new message(1));
                }
            });
        })
    },

    /*删除 分类*/
    deleteCategory:function(req,res,next){
        let categoryId=(req.query||req.params).categoryId;
        if(!categoryId){
            res.send( new message(6))
            return false
        }
        poolFun(function(err,conn){
            if(err){
                return false
            }
            conn.query(sql.deleteCategory,[categoryId],function(e,r){
                if(r){
                    res.send(new message(0));
                }else{
                    res.send(new message(6));
                }
            });
            conn.release();
        })
    },


    /*查询商品库列表*/
    getGoodsList:function(req,res,next){
        let param_b = req.query || req.params || req.body;
        console.log('aaaaaaaaaaaa',param_b)
        if(!param_b.shopId){
            return false;
        }
        poolFun(function(err,conn){
            if(err){
                return false
            }
            console.log('xxxxxxxxxxx',[param_b.shopId*1,(param_b.pageNum-1)*param_b.pageSize,param_b.pageSize])
            conn.query(sql.getGoodsList,[param_b.shopId*1,(param_b.pageNum-1)*param_b.pageSize,param_b.pageSize*1],function(e,r){
                console.log('xxxxxxxxxxxxxxxxxxxxxxx',e,r)
                if(r){
                    res.send(new message(0,'',r));
                }else{
                    res.send(new message(1));
                }
            });
            conn.release();
        })
    },


};

module.exports=shopdo;

