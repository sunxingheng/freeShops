<template>
  <div class="addCategory">
    <el-form ref="form" :model="param.addInfo" :rules="rules" label-width="100px">
      <el-form-item label="分类名称：" prop="name">
        <el-input v-model="param.addInfo.name" placeholder="请输入分类名称"></el-input>
      </el-form-item>
      <el-form-item label="分类背景：" prop="cover_img">
        <el-upload :limit="1" accept="image/*" action="/fileServer/upload/files" list-type="picture-card" :on-success="handleSuccess"
          :on-preview="handlePictureCardPreview" :file-list="param.catchList" :multiple="true" :on-remove="handleRemove">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="param.dialogVisible">
          <img width="100%" :src="param.dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>
      <el-form-item label="描述：">
        <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="param.addInfo.remark"></el-input>
      </el-form-item>
      <el-form-item class="mt100">
        <el-button @click="closeDialog()">取 消</el-button>
        <el-button type="primary" @click="onSubmite('form')">确 定</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
  import http from "@/utils/http.js";
  import urls from "@/utils/urls.js";
  import {
    mapGetters
  } from "vuex";
  export default {
    data() {
      return {
        rules: {
          name: [{
            required: true,
            message: '请输入分类名称',
            trigger: 'blur'
          }],
          cover_img: [{
            validator: this.validateConfig,
            trigger: 'blur'
          }],
        },
        params: {
          isEdit: false,
          catchList: [], //缓存图列表
          dialogVisible: false, //大图弹窗
          dialogImageUrl: '', //弹窗图地址
        }
      }
    },
    props: {
      param: {}
    },
    computed: {
      //使用mapGetters导入catchData
      ...mapGetters(["userInfo"])
    },
    methods: {
      //提交商品【新增/修改】
      validateConfig(rule, value, callback) {
        let _self = this;
        if (_self.param.addInfo.cover_img  && _self.param.addInfo.cover_img != [] ) {
          callback();
        } else {
          callback(new Error('请上传背景图片'));
        }
      },
      onSubmite(formData) {
        let _self = this;
        _self.$refs[formData].validate((valid) => {
          if (valid) {
            let info = _self.param.addInfo;
            let url = info.id ? urls.NEWS_CATEGORY_ADD : urls.NEWS_CATEGORY_EDIT;
            info.cover_img = JSON.stringify(info.cover_img);
            if (!info.id) {
              info.auther_id = _self.userInfo.shopId;
            }
            let math = info.goodsId ? 'put' : 'post';
            console.log(info)
            // http.ajax(math, url, info, function (res) {
            //     http.messageFunc('操作成功', 'success')
            //     _self.$router.go(-1);
            // }, function (res) {
            // })

          }
        });
      },
      closeDialog() {
        let _self = this;
        _self.param.addBox = false
      },
      handleRemove(file, fileList) {
        let _self = this;
        _self.param.addInfo.cover_img = _self.imgList(fileList);
      },
      handleSuccess(response, file, fileList) {
        let _self = this;
        this.param.addInfo.cover_img = _self.imgList(fileList);
      },
      imgList(arr, callback) {
        let list = [];
        for (let i in arr) {
          if (arr[i].response.data) {
            list.push(arr[i].response.data)
          }
        }
        return list;
      },
      handlePictureCardPreview(file) {
        this.params.dialogImageUrl = file.url;
        this.params.dialogVisible = true;
        console.log(2, file)
      },
    },
    created() {
      console.log(this.param)
    }
  }
</script>

<style lang="less" scoped>
  .addCategory {

    .el-textarea,
    .el-input {
      width: 217px;
    }
  }
</style>
