<template>
  <div class="login">
    <div class="box">
      <p class="title mb40">登录</p>
      <el-input placeholder="请输入用户姓名" v-model="params.info.shopName" v-if="params.register">
        <template slot="prepend">用户名</template>
      </el-input>
      <p class="mb20" v-if="params.register"></p>
      <el-input placeholder="请输入手机号" v-model="params.info.shopMobile">
        <template slot="prepend">手机号</template>
      </el-input>
      <p class="mb20"></p>
      <el-input placeholder="请输入密码" v-model="params.info.shopPassword" type="shopPassword">
        <template slot="prepend">密&emsp;码</template>
      </el-input>
      <div class="alignCenter mt20">
        <el-button type="primary" @click="addAndLogin()" v-if="params.register">注册</el-button>
        <el-button type="primary" @click="addAndLogin()" v-else >登录</el-button>
      </div>
      <p class="none alignCenter mt40" v-if="!params.register">
        <span>没账号？</span>
        <span @click="params.register = true">进行注册</span>
      </p>
      <p class="none alignCenter mt40" v-else>
        <span>有账号？</span>
        <span @click="params.register = false">进行登录</span>
      </p>
    </div>

  </div>
</template>

<script>
    import http from "@/utils/http.js";
    import urls from "@/utils/urls.js";


    export default {
        name: "login",
        data() {
            return {
                params: {
                    register: false,
                    info: {
                        shopName: '骄傲的少年',
                        shopMobile: '18702515407',
                        shopPassword: "123456"
                    }
                }
            }
        },
        methods: {
            addAndLogin() {
                let _self = this;
                let url = _self.params.register?urls.REGISTER_API: urls.LOGIN_API;
                let body = {
                    shopName: _self.params.info.shopName,
                    shopMobile: _self.params.info.shopMobile,
                    shopPassword: _self.params.info.shopPassword,
                }
                http.ajax('post', url, body, function (res) {
                    _self.$store.commit("login", res.body.data);
                }, function (res) {

                })
                console.log(urls)

            }
        },
        created() {
        }
    }
</script>

<style lang="less" scoped>
  .login {
    background: url('../../../static/icon/loginbg.jpg') #464646;
    height: 100vh;
    background-position: center right;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
    position: relative;

    .title {
      text-align: center;
      line-height: 50px;
      color: #666666;
      font-size: 30px;

    }

    .box {
      position: absolute;
      left: 50%;
      top: 50%;
      margin: -200px 0 0 -150px;
      box-shadow: 0 0px 10px 10px rgba(0, 0, 0, .2);
      width: 300px;
      height: 400px;
      padding: 20px;
      background-color: rgba(255, 255, 255, .5);
      border-radius: 5px;

      .none {
        span:nth-child(2) {
          color: blue;
          cursor: pointer;
        }
      }
    }
  }
</style>
