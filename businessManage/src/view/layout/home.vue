<template>
  <div class="home">
    <el-container>
      <el-aside width="92px">
        <!--      <div class="title" >商家管理中心</div>-->
        <asides></asides>
      </el-aside>
      <el-container class="mainContain">
<!--        <el-header>Header</el-header>-->
        <el-main>
          <router-view></router-view>
        </el-main>
        <!--      <el-footer>Footer</el-footer>-->
      </el-container>
    </el-container>
  </div>
</template>

<script>
    import asides from "./asides";

    export default {
        name: "home",
        data() {
            return {
                params: {}
            }
        },
        components: {
            asides,
        },

    }
</script>

<style scoped lang="less">
  .el-container {
    height: 100vh;
    box-sizing: border-box;
    background-color: #E9EEF3;
    &.mainContain{
      min-width: 500px;
    }
    .el-header {
      background-color: #B3C0D1;
      color: #333;
      text-align: center;
      line-height: 60px;
    }
    .el-main {
      background-color: #fff;
      color: #333;
      text-align: center;
      /*line-height: 160px;*/
      padding: 0;
      margin: 20px;

    }

    .el-aside {
      background: #273543;
      color: #333;
      text-align: center;
      color: #fff;
      /*line-height: 200px;*/
    }
  }
</style>
