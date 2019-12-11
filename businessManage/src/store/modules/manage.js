import router from '@/router.js'
export default {
  state: {
    userInfo:{},//用户信息
    isLogin:false,//登录状态
    catchData: {
      activeIndex: 0,//一级菜单
      secondIndex: 0,//二级菜单

    }
  },
  mutations: {
    activeIndex(state, indexArr) {
      state.catchData.activeIndex = indexArr[0];
      state.catchData.secondIndex = indexArr[1];
    },
    login(state,data){
      state.userInfo = data;
      state.isLogin = true;
      router.push('/dashboard');
    }
  },
  getters: {
    catchData:(state) => state.catchData,
    userInfo:(state) => state.userInfo
  },
  actions: {}
}
