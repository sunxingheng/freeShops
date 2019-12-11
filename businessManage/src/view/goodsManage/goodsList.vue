<template>
  <div class="goodsList">
    <el-button type="primary" class="mb10" @click="routerTo('/goodsAdd?type=0')">新增商品</el-button>
    <el-button  class="mb10">商品导入</el-button>
    <el-table :data="params.tableData" style="width: 100%">
      <el-table-column prop="goodsName" label="商品名称"></el-table-column>
      <el-table-column prop="goodsPrice" label="商品价格">
        <template slot-scope="scope">
          {{scope.row.goodsPrice+ '元'}}
        </template>
      </el-table-column>
      <el-table-column prop="unit" label="库存单位"></el-table-column>
      <el-table-column prop="categoryName" label="商品分类">
        <template slot-scope="scope">
          {{scope.row.categoryName || '分类不存在'}}
        </template>
      </el-table-column>
      <el-table-column prop="putawayStatus" label="上架状态">
        <template slot-scope="scope">
          {{scope.row.putawayStatus?'已上架': '未上架'}}
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间"></el-table-column>
      <el-table-column label="操作" fixed="right" width="180">
        <template slot-scope="scope">
          <el-button type="text"@click="routerTo('/goodsAdd?type=1&id='+scope.row.goodsId)">编辑</el-button>
          <el-button type="text" @click="deleteCategory(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
    import http from "@/utils/http.js";
    import urls from "@/utils/urls.js";
    import {mapGetters} from "vuex";
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
        computed: {
            //使用mapGetters导入catchData
            ...mapGetters(["userInfo"])
        },
        methods: {
            routerTo(path){
              let _self = this;
              _self.$router.push(path)
            },
            getGoodsList() {
                let _self = this;
                let url = urls.GOODS_LIST;
                let body = {
                    shopId:_self.userInfo.shopId,
                    pageSize:_self.params.pageInfo.pageSize,
                    pageNum:_self.params.pageInfo.pageNum
                }
                url = http.mixUrl(body,url);
                http.ajax('get', url, body, function (res) {
                    _self.params.tableData = res.body.data || [];
                }, function (res) {

                })
            },
            deleteCategory(row) {
                let _self = this;
                let url = urls.GOODS_DELETE;
                let body = {
                    goodsId:row.goodsId
                }
                url = http.mixUrl(body,url);
                http.ajax('delete', url, body, function (res) {
                    http.messageFunc('操作成功', 'success')
                    _self.getGoodsList()
                }, function (res) {
                })
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
