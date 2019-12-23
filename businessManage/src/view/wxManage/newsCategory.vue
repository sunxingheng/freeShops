<template>
  <div class="category">
    <el-button type="primary" class="mb10" @click="addAndEdit(0,'默认分类')">新增分类</el-button>
    <el-table :data="params.tableData" style="width: 100%">
      <el-table-column prop="name" label="分类"></el-table-column>
      <el-table-column prop="name" label="背景图">
        <template slot-scope="scope">
          <img src="scope.row.cover_img" alt="">
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注"></el-table-column>
      <el-table-column label="操作" fixed="right" width="180">
        <template slot-scope="scope">
          <el-button type="text" @click="addAndEdit(1,scope.row)">编辑</el-button>
          <el-button type="text" @click="deleteCategory(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="" :visible.sync="params.addBox" width="40%" center>
      <addCategory :param="params"></addCategory>
      <!-- <span>需要注意的是内容是默认不居中的</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="params.addBox = false">取 消</el-button>
        <el-button type="primary" @click="params.addBox = false">确 定</el-button>
      </span> -->
    </el-dialog>
  </div>
</template>

<script>
  import http from "@/utils/http.js";
  import urls from "@/utils/urls.js";
  import addCategory from  './addCategory'

  export default {
    name: "category",
    data() {
      return {
        params: {
          addBox:true,
          addInfo:{
            cover_img:[]
          },
          tableData: []
        }
      }
    },
    components:{
      addCategory
    },
    methods: {
      getCategory() {
        let _self = this;
        let url = urls.NEWS_CATEGORY_LIST;
        let body = {
          shopId: _self.$store.state.manage.userInfo.shopId
        }
        url = http.mixUrl(body, url);
        http.ajax('get', url, body, function(res) {
          _self.params.tableData = res.body.data || [];
        }, function(res) {

        })
      },
      deleteCategory(row) {
        let _self = this;
        let url = urls.CATEGORY_DELETE;
        let body = {
          categoryId: row.categoryId
        }
        url = http.mixUrl(body, url);
        http.ajax('delete', url, body, function(res) {
          _self.$message({
            type: 'success',
            message: '操作成功'
          });
          _self.getCategory()
        }, function(res) {})
      },
      addAndEdit(status, row) {
        let _self = this;
        let msg = status ? "请输入需要编辑的分类" : "请输入新增的分类"
        _self.$prompt(msg, '提示', {
          confirmButtonText: '确定',
          inputValue: row ? row.categoryName : '',
          cancelButtonText: '取消',
          inputPattern: /^[a-z\u4e00-\u9fa5]+$/i,
          inputErrorMessage: '不能为空，且只能输入中文或者英文'
        }).then(({
          value
        }) => {
          let url = status ? urls.CATEGORY_EDIT : urls.CATEGORY_ADD;
          let body = {
            shopId: _self.$store.state.manage.userInfo.shopId,
            categoryName: value,
            remark: '',
            categoryId: row ? row.categoryId : '0'
          }
          let math = status ? 'put' : 'post';
          http.ajax(math, url, body, function(res) {
            _self.$message({
              type: 'success',
              message: '操作成功'
            });
            _self.getCategory()
          }, function(res) {

          })
        }).catch(() => {});
      }
    },
    created() {
      this.getCategory()
    }
  }
</script>

<style lang="less" scoped>
  .category {
    padding: 10px;

    .alignRight {
      padding: 0 20px;
    }
  }
</style>
