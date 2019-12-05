import router from '../router'
// import store from '../store'
// import Vue from 'vue'
// import validation from '@/utils/validation'
// import http from '@/utils/http'
// import URL from '@/utils/url'

// const whiteList = ['/login0', '/login1', '/xinshangmeng', '/error', '/test', '/goodsDetail'] // 不重定向白名单

router.beforeEach((to, from, next) => {
  if(to.path == '/') {
      next({
        path: '/dashboard'
      })
    }else{
    next();
  }
})
//
//   document.title = router.options.engin[localStorage.getItem("limitLevel")].name;
//   let loginStatus = Boolean(localStorage.getItem('loginStatus')) ? true : false; //store.state.user.status
//   let limitLevel = localStorage.getItem('limitLevel');
//   window.clearInterval(window.time); // 清除浏览器定时任务
//   let hasRoute = false;
//   if(loginStatus) {
//     if(to.path == '/login') {
//       next({
//         path: '/'
//       })
//     } else if(to.path == '/') {
//       next({
//         path: '/dashboard' + limitLevel
//       })
//     } else {
//       if(CheckRouteLimit(to, limitLevel)) {
//         next()
//       } else {
//         next({
//           path: '/dashboard' + limitLevel
//         })
//       }
//     }
//   } else {
//
//     if(whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入)
//       if(CheckRouteLimit(to, limitLevel) || whiteList.indexOf(to.path) !== -1) {
//         next()
//       } else {
//         next({
//           path: '/error'
//         })
//       }
//     } else {
//       if(CheckRouteLimit(to, limitLevel) || to.path == '/') {
//         next({
//           path: '/login' + limitLevel
//         })
//       } else {
//         next({
//           path: '/error'
//         })
//       }
//     }
//   }
//   //校验是否存在，且是否有权限
//   function CheckRouteLimit(to, limitLevel) {
//     let routers = router.options.routes;
//     routers.forEach(function(obj, index, arr) {
//       if(obj.path == to.path) {
//         hasRoute = obj;
//       }
//     })
//     if(hasRoute.path) {
//       let limit = false;
//       hasRoute.limits.forEach(function(obj, index, arr) {
//         if(obj == limitLevel) {
//           limit = true;
//         }
//       })
//       if(limit) {
//         return true;
//       } else {
//         return false;
//       }
//     } else {
//       return false
//     }
//
//   }
// });
