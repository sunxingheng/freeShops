//数据逻辑处理
let mysql=require("mysql");
let result=require("./res"); //暂时无用
var config = require('../config/config').config;
var resData=require("./resdata");



/*启动连接池*/

var pool=mysql.createPool(config);

var poolFun=function(fun){
    return  pool.getConnection(fun)
};

/*sql 查询语句*/
var sql={
    add: 'INSERT INTO nodeuser(userName,passWord,mobile,id) VALUES(?,?,?,?)',
    sele:'select * from nodeuser where userName = ?',
    list:'select * from nodeuser  order by id desc',
    del:'delete from nodeuser where id = ?',
    info:'select * from nodeuser where id = ?',
    edit:'UPDATE  nodeuser set userName=? , passWord=? , userCalled=? , code=? where id=?',
    login:'select * from  nodeuser where userName=? and passWord=?'
};

/*数据库操作*/
var userdo={
    add:function(req,res,next){
        var param_q= req.query || req.params;
        var param_b = req.body || req.params;
        var valArr=[];
        var id=param_b.id;
        valArr.push(param_b.username);
        valArr.push(param_b.passWord);
        valArr.push(param_b.mobile);
        valArr.push(param_b.id);
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
                if(r.length>0&&!id){
                    res.send(new resData(0))//已经存在
                    return false
                }else if(r.length>0&&(r[0].id!==id)&&id){
                    var sr=new resData(0);
                    sr.msg="不存在账户，无法编辑！";
                    res.send(sr);//编辑但不存在
                    return false
                }

                //执行下一步操作
                conn.query(id?sql.edit:sql.add,id?valArr.concat(id):valArr,function(e,r){ //val选填
                    if(r) {
                        //return res.redirect('back'); //返回请求页面
                        //res.redirect("http://127.0.0.1:3000/");
                        res.send(new resData(1))
                    }else{
                        res.json(new resData(0))
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
        //req.assert('userName', "用户名不能为空").notEmpty();
        //req.assert('passWord', "密码不能为空").notEmpty();
        if(!param_b.userName||!param_b.passWord){
            res.send({stateCode:-1,msg:"必要的字段不能为空"});
            return false
        }

        poolFun(function(err,conn){
            if(err){
                return false
            }
            conn.query(sql.login,[param_b.userName,param_b.passWord],function(e,r){
                if(r.length>0){
                    res.send(new resData(1,req.cookies.COOKIES2));
                    req.session.loginKey=req.cookies.COOKIES2; //登录成功设置一个session
                }else{
                    res.send(new resData(0));
                    req.session.loginKey=null;
                }

            });
            conn.release();
        })

    }
};

module.exports=userdo;

