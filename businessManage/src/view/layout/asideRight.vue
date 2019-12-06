<template>
<div class="asideRight">
  <div class="title">
        {{param.router[param.hoverIndex].fullName}}
  </div>
  <div class="list">
      <p class="li"
         @click="handleChoose(index)"
         :class="{'active':catchData.activeIndex == param.hoverIndex && catchData.secondIndex == index }"
         v-for="(item,index) in param.router[param.hoverIndex].children"
         :key="index">
        {{item.name}}
      </p>
  </div>
</div>
</template>

<script>
    import { mapGetters } from "vuex";
    export default {
        name: "asideRight",
        data() {
            return {
            }
        },

        computed: {
            //使用mapGetters导入isLogin
            ...mapGetters(["catchData"])
        },
        props: {
            param: {
                type: Object,
                require: true
            }
        },
        methods:{
            handleChoose(index) {
                let _self = this;
                let path = _self.param.router[_self.catchData.activeIndex].children[index].path;
                _self.$store.commit("activeIndex", [_self.catchData.activeIndex,index]);
                if(this.$route.path != path ){
                    _self.$router.push(path)
                }

            },
        },
        created() {

           console.log(this.$route.path)
        }

    }
</script>

<style lang="less" scoped>
.asideRight{
  .title{
    flex: 0 0 56px;
    padding-left: 28px;
    width: 100%;
    height: 56px;
    box-sizing: border-box;
    border-bottom: 1px solid #ebedf0;
    font-size: 14px;
    color: #323233;
    line-height: 56px;
    font-weight: 700;
  }
  .list{
    padding-right: 20px;
    padding-left: 12px;
    .li{
      text-align: left;
      padding-left: 24px;
      cursor: pointer;
      margin-top: 10px;
      line-height: 30px;
      border-radius: 2px;
      font-size: 14px;
      &:hover{
        color: #3388FF;
      }
      &.active{
        background-color: #EBEDF0;
      }
    }
  }
}
</style>
