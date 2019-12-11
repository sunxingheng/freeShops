import Vue from 'vue'
import {error} from "vue-resource/src/util";

let httpService = new Vue({
  data: {},
  methods: {
    //通用请求方法
    ajax(method, url, body, success, errorFunc, loading) {
      let _self = this;
      _self.$http({
        method: method,
        url: url,
        body: body,
        headers: {}
      })
        .then((res) => {
          if(res.body.errorCode>0){
            _self.$message.error(res.body.errorMsg);
            errorFunc(res)
          }else{
            success(res)
          }
        }, (res) => {
          errorFunc(res)
        });
    },
    filterUrl(data, url) {
      for (let key in data) {
        let keys = "{" + key + "}";
        url = url.replace(keys, data[key])
      }
      return url;
    },
    mixUrl(data,url){
      let str = "";
      let index = 0;
      for (let key in data) {
        index ++;
        let keys = key+'='+data[key];
        if(index!= 1) keys = '&'+ keys;
        str = str+keys;
      }
      console.log(str);
      return url+'?'+str;
    },
    //数据重置
    resetValue(val){
      console.log(val)
      for(let key in val){
        if(key instanceof Array){
          val[key] = [];
        }else if(typeof key == 'string'){
          val[key] = '';

        }
      }
      console.log(val)
      return val
    },
    //信息发送
    messageFunc(errorMessage, funcName) {
      let _self = this;
      if(funcName == "error") {
        _self.$message.error(errorMessage);
      } else if(funcName == "success") {
        this.$message({
          message: errorMessage,
          type: 'success'
        });
      }else if(funcName == "warning"){
        this.$message({
          message: errorMessage,
          type: 'warning'
        });
      }else{
        this.$message(errorMessage);
      }
    }
  },
})

export default httpService;

/**
 *             ,%%%%%%%%,
 *           ,%%/\%%%%/\%%
 *          ,%%%\c "" J/%%%
 * %.       %%%%/ o  o \%%%
 * `%%.     %%%%    _  |%%%
 *  `%%     `%%%%(__Y__)%%'
 *  //       ;%%%%`\-/%%%'
 * ((       /  `%%%%%%%'
 *  \\    .'          |
 *   \\  /       \  | |
 *    \\/         ) | |
 *     \         /_ | |__
 *     (___________))))))) 攻城湿
 *
 */
