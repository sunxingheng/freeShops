//引入mockjs
import Mock from 'mockjs'
import urls from './urls'
//使用mockjs模拟数据
Mock.mock('/api/msdk/proxy/query_common_credit/', 'GET', {
  "ret": 0,
  "data":
    {
      "mtime": "@datetime",//随机生成日期时间
      "score|1-800": 800,//随机生成1-800的数字
      "rank|1-100": 100,//随机生成1-100的数字
      "stars|1-5": 5,//随机生成1-5的数字
      "nickname": "@cname",//随机生成中文名字
    }
//data里的属性看不懂，需要详细看语法规范,博客链接:https://www.jianshu.com/p/4579f40e6108
});

let data1 = function () {
  let arr = [];
  for(let key in 10){
    arr.push(key)
  }
  return arr;
}

Mock.mock(urls.NEWS_GOODS_LIST, 'GET', {
  code: 0,
  data:data1,
  msg: '',
})


