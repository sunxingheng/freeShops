let mysql=require("mysql");
let config = require('../config/config').config;
let message=require("../utils/message");


let pool=mysql.createPool(config);

let poolFun=function(fun){
    return  pool.getConnection(fun)
};


module.exports = {
    sqlState: function (sqls, params, res,callback) {
        console.log(sqls, params)
        poolFun(function (err,conn) {
            if(err){
                res.send(new message(9));
            }
            conn.query(sqls,params ,function(e,r){
                if(r){
                    callback(r);
                }else{
                    res.send(new message(1,'',e));
                }
            });
            conn.release();
        })
    },
    placeholder(pla,arr){
        let newArr =  [];
        for(let i in pla){
            for(let j in arr){
                // console.log(pla[i] , j,arr[j])
                if(pla[i] == j){
                    newArr.push(arr[j]);
                }
            }
        }
        return newArr
    }
}
