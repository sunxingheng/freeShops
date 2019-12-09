<template>
  <div class="goodsList">
    <el-button type="primary" class="mb10" @click="routerTo">新增分类</el-button>
    <el-button  class="mb10">商品导入</el-button>
    <el-table :data="params.tableData" style="width: 100%">
      <el-table-column prop="goodsName" label="商品名称"></el-table-column>
      <el-table-column prop="goodsName" label="库存单位"></el-table-column>
      <el-table-column prop="goodsName" label="商品分类"></el-table-column>
      <el-table-column prop="goodsName" label="上架状态"></el-table-column>
      <el-table-column prop="goodsName" label="创建时间"></el-table-column>
      <el-table-column label="操作" fixed="right" width="180">
        <template slot-scope="scope">
          <el-button type="text" @click="addAndEdit(1,scope.row)">编辑</el-button>
          <el-button type="text" @click="deleteCategory(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
    import http from "@/utils/http.js";
    import urls from "@/utils/urls.js";
    export default {
        name: "goodsList",
        data() {
            return {
                params: {
                    tableData: [],
                    pageInfo:{
                        total:'',
                        pageSize:100,
                        pageNum:1,

                    }
                }
            }
        },
        methods: {
            routerTo(){
              let _self = this;
              _self.$router.push('/goodsAdd')
            },
            getGoodsList() {
                let _self = this;
                let url = urls.GOODS_LIST;
                let body = {
                    shopId:_self.$store.state.manage.userInfo.shopId,
                    pageSize:_self.params.pageInfo.pageSize,
                    pageNum:_self.params.pageInfo.pageNum
                }
                url = http.mixUrl(body,url);
                http.ajax('get', url, body, function (res) {
                    _self.params.tableData = res.body.data;
                }, function (res) {

                })
            },
            deleteCategory(row) {
                let _self = this;
                let url = urls.CATEGORY_DELETE;
                let body = {
                    categoryId:row.categoryId
                }
                url = http.mixUrl(body,url);
                http.ajax('delete', url, body, function (res) {
                    _self.$message({
                        type: 'success',
                        message: '操作成功'
                    });
                    _self.getCategory()
                }, function (res) {
                })
            },
            addAndEdit(status,row) {
                let _self = this;
                let msg = status ? "请输入需要编辑的分类" : "请输入新增的分类"
                _self.$prompt(msg, '提示', {
                    confirmButtonText: '确定',
                    inputValue:row? row.categoryName :'',
                    cancelButtonText: '取消',
                    inputPattern: /^[a-z\u4e00-\u9fa5]+$/i,
                    inputErrorMessage: '不能为空，且只能输入中文或者英文'
                }).then(({value}) => {
                    let url = status?urls.CATEGORY_EDIT: urls.CATEGORY_ADD;
                    let body = {
                        shopId:_self.$store.state.manage.userInfo.shopId,
                        categoryName:value,
                        remark:'',
                        categoryId:row? row.categoryId:'0'
                    }
                    let math = status?'put':'post';
                    http.ajax(math, url, body, function (res) {
                        _self.$message({
                            type: 'success',
                            message: '操作成功'
                        });
                        _self.getCategory()
                    }, function (res) {

                    })
                }).catch(() => {
                });
            }
        },
        created() {
            this.getGoodsList()
        }
    }
</script>

<style scoped lang="less">
  .goodsList {
    padding: 10px;
    .alignRight {
      padding: 0 20px;
    }
  }
</style>
