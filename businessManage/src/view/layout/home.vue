<template>
  <div class="home">
    <aside class="asideContain">
      <asideLeft class="asideLeftTop" :param="params"></asideLeft>
      <asideRight class="asideRightTop"
                  :param="params"
                  v-if="params.showsTrans || catchData.activeIndex != 0">
      </asideRight>
    </aside>
    <main class="app_container"
          :class="{'unnarrow':catchData.activeIndex == 0}">
      <modelPage>
        <router-view slot="contain"></router-view>
      </modelPage>
    </main>
  </div>
</template>

<script>
    import {mapGetters} from "vuex";
    import asideLeft from "./asideLeft";
    import asideRight from "./asideRight"
    import modelPage from "./modelPage";


    import router from "@/router.js";

    export default {
        name: "home",
        data() {
            return {
                params: {
                    activeIndex: 0,//当前菜单所在位置
                    showsTrans: false,
                    hoverIndex: '',
                }
            }
        },
        computed: {
            //使用mapGetters导入catchData
            ...mapGetters(["catchData"])
        },
        components: {
            asideLeft,
            asideRight,
            modelPage
        },
        created() {
            let _self = this;
            _self.params.hoverIndex = _self.catchData.activeIndex,
            _self.params.router = router.options.routes;
        }

    }
</script>

<style scoped lang="less">
  .home {
    box-sizing: border-box;
    .asideContain {
      background: #273543;
      transition: all .2s;
      position: fixed;
      left: 0;
      top: 0;
      height: 100%;
      width: 92px;
      font-family: -apple-system, BlinkMacSystemFont, Helvetica Neue, Helvetica, Arial, PingFang SC, Hiragino Sans GB, Microsoft Yahei, STHeiti, SimSun, sans-serif;
      z-index: 11;

      .asideLeftTop {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        height: 100%;
        width: 92px;
        background-color: #444;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        z-index: 2;
      }

      .asideRightTop {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 92px;
        height: 100%;
        width: 130px;
        background-color: #fff;
        border-right: 1px solid rgba(230, 230, 230, .5);
      }

    }

    .app_container {
      background: #f2f2f2;
      width: auto;
      margin-left: 222px;
      /*padding-bottom: 50px;*/
      min-width: 810px;

      &.unnarrow {
        margin-left: 92px;
      }
    }
  }
</style>
