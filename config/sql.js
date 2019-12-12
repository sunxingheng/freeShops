
module.exports = {
    //用户登录接口
    _user_ogin: (params) => {
        return `select * from  shop where shopMobile= '${params.shopMobile}' and shopPassword='${params.shopPassword}'`;
    }
};