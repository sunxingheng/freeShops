//数据逻辑处理
let mysql=require("mysql");
let result=require("./res"); //暂时无用
var config = require('../config/config').config;
var resData=require("./resdata");
var message=require("./message");



/*启动连接池*/

var pool=mysql.createPool(config);

var poolFun=function(fun){
    return  pool.getConnection(fun)
};

/*sql 查询语句*/
var sql={
    add: 'INSERT INTO user(username,password,mobile) VALUES(?,?,?)',
    sele:'select * from user where username = ?',
    list:'select * from user  order by id desc',
    del:'delete from user where id = ?',
    info:'select * from user where id = ?',
    edit:'UPDATE  user set username=? , password=? , userCalled=? , code=? where id=?',
    login:'select * from  user where username=? and password=?'
};

/*数据库操作*/
var userdo={
    //新增/编辑用户
    add:function(req,res,next){
        var param_q= req.query || req.params;
        var param_b = req.body || req.params;
        var valArr=[];
        var id=param_b.id;
        valArr.push(param_b.username);
        valArr.push(param_b.password);
        valArr.push(param_b.mobile);
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
            conn.query(sql.sele,param_b.username,function(e,r){
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

    /*查询 全部*/
    list:function(req,res,next){
        poolFun(function(err,conn){
            if(err){
                return false
            }
            conn.query(sql.list,function(e,r){
                if(r.length>0){
                    res.send(new resData(1,r));
                }else{
                    res.send(new resData(0));
                }

            });
            conn.release();
        })
    },

    /*删除某ID用户*/
    del:function(req,res,next){
        var id=(req.query||req.params).id;
        if(!id){
            return false
        }
        poolFun(function(err,conn){
            if(err){
                return false
            }
            conn.query(sql.del,[id],function(e,r){
                if(r){
                    res.send(new resData(1));
                }else{
                    res.send(new resData(0));
                }
            });
            conn.release();
        })
    },

    /*查询某ID用户*/
    info:function(req,res,next){
        var id=(req.query||req.params).id;
        if(!id){
            return false
        }
        poolFun(function(err,conn){
            if(err){
                return false
            }
            conn.query(sql.info,[id],function(e,r){
                if(r){
                    res.send(new resData(1,r[0]));
                }else{
                    res.send(new resData(0));
                }

            });
            conn.release();
        })
    },

    /*登录*/
    login:function(req,res,next){
        var param_b = req.body || req.params;
        //req.assert('username', "用户名不能为空").notEmpty();
        //req.assert('passWord', "密码不能为空").notEmpty();
        if(!param_b.username||!param_b.password){
            res.send(new message(4));
            return false
        }
        poolFun(function(err,conn){
            if(err){
                return false
            }
            conn.query(sql.login,[param_b.username,param_b.password],function(e,r){
                if(r.length>0){
                    res.send(new message(0,'登陆成功',r[0]))
                    // res.send(new resData(1,req.cookies.COOKIES2));
                    // req.session.loginKey=req.cookies.COOKIES2; //登录成功设置一个session
                }else{
                    res.send(new message(1));
                    req.session.loginKey=null;
                }

            });
            conn.release();
        })

    }
};

module.exports=userdo;

