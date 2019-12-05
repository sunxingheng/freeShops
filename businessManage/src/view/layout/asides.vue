<template>
  <div class="aside">
    <a href="" class="logo">
      <div class="logoImage"></div>
    </a>
    <div class="list">
      <p class="li" :class="{'isActive':params.activeIndex == index}"
         @click="handleChoose(index)"
         v-for="(item,index) in params.router"
         :key="index" v-if="!item.hidden">
        <i :class="item.iconCls"></i>
        {{item.name}}
      </p>
    </div>
  </div>
</template>

<script>
    import router from "@/router.js";

    export default {
        name: "asides",
        data() {
            return {
                params: {
                    activeIndex: "0",
                    router: []
                }
            }
        },
        methods: {
            handleChoose(index){
              let _self = this;
              _self.params.activeIndex = index;
            },
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            handPush(path) {
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

    .logo {
      display: block;
      margin: 0 16px;
      height: 56px;
      overflow: hidden;

      .logoImage {
        background-image: url("https://img.yzcdn.cn/public_files/2016/05/13/8f9c442de8666f82abaf7dd71574e997.png!60x60.jpg");
        margin: 12px auto 0;
        width: 32px;
        height: 32px;
        -webkit-border-radius: 50%;
        border-radius: 50%;
        background-size: cover;
        background-position: 50% 50%;
        background-color: #fff;
        border: 1px solid #fff;
      }
    }

    .list {
      text-align: center;
      line-height: 40px;

      .li {
        color: #c8c9cc;
        display: block;
        font-size: 12px;
        cursor: pointer;

        &:hover {
          background-color: #434E6C;
        }
        &.isActive{
          background-color: #3388FF;
          color: #fff;
        }

        /*padding-left: 18px;*/
      }
    }

    .title {
      text-align: center;
      line-height: 60px;
      color: #fff;
      font-size: 26px;
    }
  }

</style>
