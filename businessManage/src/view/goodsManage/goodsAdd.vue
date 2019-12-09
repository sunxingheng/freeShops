<template>
  <div class="goodsAdd">
    <p class="title">基本信息</p>
    <el-form ref="form" :model="params.info" :rules="rules" label-width="150px">
      <el-form-item label="商品编码：" prop="goodsCode">
        <el-input v-model="params.info.goodsCode" placeholder="请输入商品编码"></el-input>
      </el-form-item>
      <el-form-item label="商品条码：" prop="goodsBarCode">
        <el-input v-model="params.info.goodsBarCode" placeholder="请输入商品条码"></el-input>
      </el-form-item>
      <el-form-item label="商品名称：" prop="contactMobile">
        <el-input v-model="params.info.goodsName" placeholder="请输入商品名称"></el-input>
      </el-form-item>
      <el-form-item label="商品分类：">
        <el-cascader v-model="params.info.categoryName" :options="params.categoryList"  @change="handleChange"></el-cascader>
        <!--        <el-input v-model="params.info.categoryName" placeholder="商品名称"></el-input>-->
      </el-form-item>
      <el-form-item label="商品图片：" prop="contactMobile">
<!--        <img src="http://localhost:8888/1.jpg" alt="">-->
        <el-upload
          :limit="10"
          action="/fileServer/upload/files"
          list-type="picture-card"
          :on-success="handleSuccess"
          :on-preview="handlePictureCardPreview"
          :file-list="params.catchList"
          :multiple="true"
          :on-remove="handleRemove" >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="params.dialogVisible">
          <img width="100%" :src="params.dialogImageUrl" alt="">
        </el-dialog>
        <textarea name="" id="" cols="30" rows="10" :value="JSON.stringify(params.info.goodsImg)"></textarea>
      </el-form-item>
      <el-form-item label="库存单位：" prop="unit">
        <el-input v-model="params.info.unit" placeholder="请输入库存单位"></el-input>
      </el-form-item>
      <el-form-item label="商品详情：" prop="goodsDetails">
        {{params.info.goodsDetails}}
        <div ref="editorElem" style="text-align:left;"></div>
      </el-form-item>
      <p class="bottom"></p>
      <el-form-item class="confirm">
        <el-button type="primary" @click.native="onSubmite('form')" v-if="!params.readOnly">确定</el-button>
        <el-button type="primary" @click.native="goBack('form')">返回</el-button>
        <el-button type="primary" @click.native="resetForm('form')" v-if="!params.readOnly">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
    import E from "wangeditor";
    import http from "@/utils/http.js";
    import urls from "@/utils/urls.js";

    export default {
        name: "goodsAdd",
        data() {
            return {
                editor: null,
                rules: {},
                params: {
                    catchList:[],
                    dialogVisible: false,
                    dialogImageUrl: '',//弹窗图地址
                    info: {

                        goodsImg:[{name: 'food.jpg', url: 'https://xxx.cdn.com/xxx.jpg'}]
                    },
                    categoryList:[]

                }
            }
        },
        props: ['catchData'], // 接收父组件的方法
        mounted() {
            let _self = this;
            _self.editor = new E(_self.$refs.editorElem);
            // 编辑器的事件，每次改变会获取其html内容
            _self.editor.customConfig.uploadImgShowBase64 = true;
            _self.editor.customConfig.onchange = html => {
                _self.params.info.goodsDetails = html;
            };
            _self.editor.customConfig.menus = [
                // 菜单配置
                'head', // 标题
                'bold', // 粗体
                'fontSize', // 字号
                'fontName', // 字体
                'italic', // 斜体
                'underline', // 下划线
                'strikeThrough', // 删除线
                'foreColor', // 文字颜色
                'backColor', // 背景颜色
                'link', // 插入链接
                'list', // 列表
                'justify', // 对齐方式
                'quote', // 引用
                'emoticon', // 表情
                'image', // 插入图片
                'table', // 表格
                'code', // 插入代码
                'undo', // 撤销
                'redo' // 重复
            ];
            _self.editor.create(); // 创建富文本实例
        },
        methods: {
            handleRemove(file, fileList) {
                this.params.info.goodsImg = this.imgList(fileList);
            },
            handleSuccess(response, file, fileList){
                console.log(response, file, fileList)
                if(response.errorCode){
                    this.handleRemove;
                }
                this.params.info.goodsImg = this.imgList(fileList);
            },
            imgList(arr,callback){
                let list = [];
                for (let i in arr) {
                    if(arr[i].response.data){
                        list.push(arr[i].response.data)
                    }
                }
                return list;
            },
            handlePictureCardPreview(file) {
                this.params.dialogImageUrl = file.url;
                this.params.dialogVisible = true;
                console.log(2,file)
            },
            getCategory() {
                let _self = this;
                let url = urls.CATEGORY_LIST;
                let body = {
                    shopId:_self.$store.state.manage.userInfo.shopId
                }
                url = http.mixUrl(body,url);
                http.ajax('get', url, body, function (res) {
                    let result = res.body.data;
                    result= JSON.stringify(result).replace(/categoryId/g,'value').replace(/categoryName/g,'label')
                    _self.params.categoryList = JSON.parse(result);
                }, function (res) {

                })
            },
            handleChange(value) {
                console.log(value);
            }
        },
        created() {
            this.getCategory();
        }
    }
</script>

<style lang="less" scoped>
  .goodsAdd {
    padding: 10px;

    .title {
      font-size: 14px;
      border-bottom: 1px solid #e5e5e5;
      margin-bottom: 20px;
      margin-top: 20px;
      padding-bottom: 4px;
    }

    .el-input {
      width: 217px;
    }


  }
</style>
