// server/res.js
//公共数据输出

function res(res,r){
    if(r===undefined){
        res.send({message:"操作失败"});
        return false
    }
    res.send({msg:"操作成功！"});
}
module.exports.result = res;

