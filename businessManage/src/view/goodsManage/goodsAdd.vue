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
      <el-form-item label="商品名称：" prop="goodsName">
        <el-input v-model="params.info.goodsName" placeholder="请输入商品名称"></el-input>
      </el-form-item>
      <el-form-item label="商品价格：" prop="goodsPrice">
        <el-input v-model="params.info.goodsPrice" placeholder="请输入商品条码"></el-input>
      </el-form-item>
      <el-form-item label="商品分类：" prop="categoryId">
        <el-cascader v-model="params.info.categoryId" :options="params.categoryList"
                     @change="handleChange"></el-cascader>
        <!--        <el-input v-model="params.info.categoryName" placeholder="商品名称"></el-input>-->
      </el-form-item>
      <el-form-item label="商品图片：">
        <el-upload
          :limit="10"
          accept="image/*"
          action="/fileServer/upload/files"
          list-type="picture-card"
          :on-success="handleSuccess"
          :on-preview="handlePictureCardPreview"
          :file-list="params.catchList"
          :multiple="true"
          :on-remove="handleRemove">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="params.dialogVisible">
          <img width="100%" :src="params.dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>
      <el-form-item label="库存单位：" prop="unit">
        <el-input v-model="params.info.unit" placeholder="请输入库存单位"></el-input>
      </el-form-item>
      <el-form-item label="商品详情：">
        <div ref="editorElem" style="text-align:left;"></div>
      </el-form-item>
      <p class="bottom"></p>
      <el-form-item class="confirm">
        <el-button type="primary" @click.native="onSubmite('form')">确定</el-button>
        <el-button type="primary" @click.native="goBack('form')">返回</el-button>
        <el-button type="primary" @click.native="resetForm('form')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
    import E from "wangeditor";
    import http from "@/utils/http.js";
    import urls from "@/utils/urls.js";
    import {mapGetters} from "vuex";

    export default {
        name: "goodsAdd",
        data() {
            return {
                editor: null,
                rules: {
                    goodsCode: [{
                        required: true,
                        message: '请输入商品编码',
                        trigger: 'blur'
                    }],
                    goodsBarCode: [{
                        required: true,
                        message: '请输入商品条码',
                        trigger: 'blur'
                    }],
                    goodsName: [{
                        required: true,
                        message: '请输入商品名称',
                        trigger: 'blur'
                    }],
                    goodsPrice: [{
                        required: true,
                        message: '请输入商品名称',
                        trigger: 'blur'
                    }],
                    categoryId: [{
                        required: true,
                        message: '请选择商品分类',
                        trigger: 'blur'
                    }],
                    unit: [{
                        required: true,
                        message: '请输入库存单位',
                        trigger: 'blur'
                    }]

                },
                params: {
                    isEdit: false,
                    catchList: [],//缓存图列表
                    dialogVisible: false,//大图弹窗
                    dialogImageUrl: '',//弹窗图地址
                    info: {
                        goodsCode: "",
                        goodsBarCode: "",
                        goodsName: "",
                        goodsPrice: "",
                        categoryId: "",
                        categoryName: "",
                        goodsDetails: "",
                        shopId: "",
                        shopName: "",
                        unit: "",
                        goodsImg: [],
                        createTime: '',
                    },
                    categoryList: []

                }
            }
        },
        computed: {
            //使用mapGetters导入catchData
            ...mapGetters(["userInfo"])
        },
        methods: {
            //提交商品【新增/修改】
            onSubmite(formData) {
                let _self = this;
                _self.$refs[formData].validate((valid) => {
                    if (valid) {
                        let info = _self.params.info;

                        let url = info.goodsId ? urls.GOODS_EDIT : urls.GOODS_ADD;
                        info.goodsImg = JSON.stringify(info.goodsImg);
                        if(!info.goodsId){
                            info.shopId = _self.userInfo.shopId;
                            info.shopName = _self.userInfo.shopName;
                        }
                        let math = info.goodsId ? 'put' : 'post'
                        http.ajax(math, url, info, function (res) {
                            http.messageFunc('操作成功', 'success')
                            _self.$router.go(-1);
                        }, function (res) {
                        })

                    }
                });
            },
            //表单重置
            resetForm(formData) {
                let _self = this;
                this.params.info =  http.resetValue(this.params.info);
                this.$refs[formData].resetFields(); //表单重置
                _self.editor.txt.html(`${_self.params.info.goodsDetails}`);
            },
            handleRemove(file, fileList) {

                let _self = this;
                this.params.info.goodsImg = this.imgList(fileList);
            },
            handleSuccess(response, file, fileList) {
                let _self = this;
                this.params.info.goodsImg = this.imgList(fileList);
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
            //获取商品信息
            getGoodsDetail() {
                let _self = this;
                let url = urls.GOODS_GET;
                let body = {
                    goodsId: _self.$route.query.id
                }
                url = http.mixUrl(body, url);
                http.ajax('get', url, '', function (res) {
                    let result = res.body.data[0];
                    _self.params.info = result;
                    _self.params.info.goodsImg = JSON.parse(_self.params.info.goodsImg);
                    _self.params.catchList = _self.params.info.goodsImg;
                    _self.editor.txt.html(`${_self.params.info.goodsDetails}`);
                }, function (res) {

                })
            },
            //获取分类
            getCategory() {
                let _self = this;
                let url = urls.CATEGORY_LIST;
                let body = {
                    shopId: _self.$store.state.manage.userInfo.shopId
                }
                url = http.mixUrl(body, url);
                http.ajax('get', url, body, function (res) {
                    let result = res.body.data;
                    result = JSON.stringify(result).replace(/categoryId/g, 'value').replace(/categoryName/g, 'label')
                    _self.params.categoryList = JSON.parse(result);
                }, function (res) {

                })
            },
            //选择商品分类
            handleChange(value) {
                let _self = this;
                if(value){
                    _self.params.info.categoryId = value[0];
                    _self.params.info.categoryName = getLabel()
                }
                function getLabel() {
                    for (let i in _self.params.categoryList) {
                        if (_self.params.categoryList[i].value == value[0]) {
                            return _self.params.categoryList[i].label;
                        }
                    }
                }

                console.log(_self.params.info.categoryName);
            }
        },
        created() {
            let _self = this;
            _self.getCategory();
            _self.params.isEdit = _self.$route.query.type;
            if (_self.params.isEdit == 1) {
                _self.getGoodsDetail()
            }
        },

        // props: ['catchData'], // 接收父组件的方法
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
