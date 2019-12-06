//公共数据输出
/*初始化返回数据类*/
let status = {
    0:'成功',
    1:'错误',
    2:'账户已存在',
    3:'不存在账户，无法编辑！',
    4:'必要的字段不能为空',
    5:'登录错误，账号密码不存在',
    6:'分类不存在，请刷新页面再次尝试'
}


module.exports =function(code,msg,data){
    let body = {
        errorMsg:msg?msg:status[code],
        errorCode:code,
        data:data||''
    }
    return body;
};

