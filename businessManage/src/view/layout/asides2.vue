<template>
  <el-row class="tac aside">
    <div class="title">商家管理中心</div>
    <el-col :span="24">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        :unique-opened="true"
        background-color="#545c64"
        text-color="#fff"
        :default-active="params.activeIndex"
        active-text-color="#ffd04b">
        <el-submenu :index="String(index+1)" v-for="(item,index) in params.router" :key="index" v-if="!item.hidden">
          <template slot="title">
            <i :class="item.iconCls"></i>
            <span>{{item.name}}</span>
          </template>
          <el-menu-item @click="handPush(itemChild.path)" :index="(index+1)+'-'+(indexChild+1)" v-for="(itemChild,indexChild) in item.children" :key="indexChild">
            {{itemChild.name}}{{(index+1)+'-'+(indexChild+1)}}
          </el-menu-item>
        </el-submenu>

      </el-menu>
    </el-col>

  </el-row>
</template>

<script>
    import router from "@/router.js";
    export default {
        name: "asides",
        data() {
            return {
                params: {
                    activeIndex:"1-1",
                    router: []
                }
            }
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            handPush(path){
                let that = this;
                that.$router.push(path)
            }
        },
        created() {
            let that = this;
            that.params.router = router.options.routes;
            console.log(that.params.router)
        }
    }
</script>

<style lang="less" scoped>
  .aside {
    text-align: left;
    .title {
      text-align: center;
      line-height: 60px;
      color: #fff;
      font-size: 26px;
    }
  }

</style>
