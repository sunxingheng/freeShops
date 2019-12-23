let ENGIN = {
  LOGIN: "/wx_manage",
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
  //查
  GOODS_GET: ENGIN.LOGIN + "/goods/detail",
  
  //新闻分类列表
  NEWS_CATEGORY_LIST: ENGIN.LOGIN + "/manage/news/category/list",
  //新闻分类新增
  NEWS_CATEGORY_ADD: ENGIN.LOGIN + "/manage/news/category/add",
  //新闻分类编辑
  NEWS_CATEGORY_EDIT: ENGIN.LOGIN + "/manage/news/categorys/eit/{id}",
  //新闻分类删除
  NEWS_CATEGORY_DELETE: ENGIN.LOGIN + "/manage/news/category/del/{id}",
  //新闻库列表
  NEWS_GOODS_LIST: ENGIN.LOGIN + "/manage/news/list",
  //增
  NEWS_GOODS_ADD: ENGIN.LOGIN + "/manage/news/add",
  //改
  NEWS_GOODS_EDIT: ENGIN.LOGIN + "/manage/news/eit/:id",
  //删
  NEWS_GOODS_DELETE: ENGIN.LOGIN + "/manage/news/del/:id",
  //查
  NEWS_GOODS_GET: ENGIN.LOGIN + "/manage/news/detail",

}
