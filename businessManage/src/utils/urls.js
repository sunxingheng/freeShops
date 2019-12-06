let ENGIN = {
  LOGIN: "/shops",
  SCORCE: "/api/ec_opc",
}
export default {
  //登陆接口
  LOGIN_API: ENGIN.LOGIN + "/login",
  //注册
  REGISTER_API: ENGIN.LOGIN + "/register",
  //商品分类列表
  CATEGORY_LIST: ENGIN.LOGIN + "/category/list",
  //商品列表新增
  CATEGORY_ADD: ENGIN.LOGIN + "/category/add",
  //商品列表编辑
  CATEGORY_EDIT: ENGIN.LOGIN + "/category/edit",
  //商品列表删除
  CATEGORY_DELETE: ENGIN.LOGIN + "/category/delete",
  //商品库列表
  GOODS_LIST: ENGIN.LOGIN + "/goods/list",
  //增
  GOODS_ADD: ENGIN.LOGIN + "/goods/add",
  //改
  GOODS_EDIT: ENGIN.LOGIN + "/goods/edit",
  //删
  GOODS_DELETE: ENGIN.LOGIN + "/goods/delete",

}
