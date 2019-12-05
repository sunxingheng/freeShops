<template>
  <div class="asideLeft">
    <a href="" class="logo">
      <div class="logoImage"></div>
    </a>
    <div class="list" @mouseleave="mouseLeave">
      <p class="li" :class="{'isActive':param.activeIndex == index}"
         @click="handleChoose(index)"
         @mouseover="mouseOver(index)"
         v-for="(item,index) in param.router"
         :key="index" v-if="!item.hidden">
        <i :class="item.iconCls"></i>
        {{item.name}}
      </p>
    </div>
    <div class="listChild" v-if="param.activeIndex>0">
      <p>
        {{param.activeIndex}}
      </p>
    </div>
  </div>
</template>

<script>

    export default {
        name: "asideLeft",
        data() {
            return {
            }
        },
        props: {
            param: {
                type: Object,
                require: true
            }
        },
        methods: {
            mouseOver(index) {
                console.log('yiru')
                let _self = this;
                if(index != 0){
                    _self.param.showsTrans = true;

                }else{
                    _self.param.showsTrans = false;

                }



            },
            mouseLeave() {
                let _self = this;
                _self.param.showsTrans = false;
                console.log('yichu')
            },
            handleChoose(index) {
                let _self = this;
                if (index != _self.param.activeIndex) {
                    let path = _self.param.router[index].children[0].path;
                    _self.$router.push(path)
                    _self.param.activeIndex = index;
                }
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
        }
    }
</script>

<style lang="less" scoped>
  .asideLeft {
    text-align: left;
    position: relative;

    .logo {
      display: block;
      margin: 0 16px 0 0;
      height: 56px;
      overflow: hidden;
      width: 92px;

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
        width: 92px;

        &:hover {
          background-color: #434E6C;
        }

        &.isActive {
          background-color: #3388FF;
          color: #fff;
        }

        /*padding-left: 18px;*/
      }
    }

    .listChild {
      position: absolute;
      left: 92px;
      height: 100vh;
      width: 133px;
      border-right: 1px solid #ebedf0;
      top: 0px;
      background-color: #fff;
    }

    .title {
      text-align: center;
      line-height: 60px;
      color: #fff;
      font-size: 26px;
    }
  }

</style>
