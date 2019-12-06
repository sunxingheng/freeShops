<template>
  <el-container class="modelPage">
    <el-container>
      <el-header >
        <p>{{params.router[catchData.activeIndex].children[catchData.secondIndex].name}}</p>
      </el-header>
      <el-main>

        <slot name="contain"></slot>

      </el-main>
      <el-footer>
        <a href="" class="foot"></a>
      </el-footer>
    </el-container>
<!--    <el-aside width="200px">Aside</el-aside>-->
  </el-container>

</template>

<script>
    import {mapGetters} from "vuex";
    import router from "@/router.js";
    export default {
        name: "modelPage",
        data() {
            return {
                params: {
                    router:[],
                }
            }
        },
        props:{

        },
        computed: {
            //使用mapGetters导入catchData
            ...mapGetters(["catchData"])
        },
        created() {
            let _self = this;
            _self.params.router = router.options.routes;
        }
    }
</script>

<style lang="less" scoped>
.modelPage{
  .el-header{
    padding: 0;
    background-color: #fff;
    height: 55px !important;
    p{

      line-height: 56px;
      padding-left: 20px;
    }
  }
  .el-main{
    background-color: #fff;
    padding: 0;
    margin: 20px;
  }
  .el-container{
    background-color: #F2F2F2;
    min-height: 100vh;
    /*height: 100vh;*/
  }
  .el-footer{
    a{
      width: 76px;
      height: 27px;
      display: block;
      margin: 0 auto;
      background: url(https://img.yzcdn.cn/v2/image/www/footer/logov2.png) no-repeat;

    }
  }
}
</style>
