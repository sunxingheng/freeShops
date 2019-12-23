import Vue from 'vue'
import Router from 'vue-router'
import layout from '@/view/layout/home'

Vue.use(Router)

export default new Router({
    routes: [


      {path: '/',name: '概况',component: layout,iconCls: 'el-icon-data-board',children: [
        {path: '/dashboard',name: '主页',component: () =>import('@/view/homepage/dashboard')}
        ]
      },


      {path: '/',name: '店铺', fullName:"店铺管理", component: layout,iconCls: 'el-icon-s-shop',children: [
          {path: '/editApp',name: '移动App',component: () =>	import('@/view/shopManage/editApp')}

        ]
      },

      {path: '/',name: '商品', fullName:"商品中心", component: layout,iconCls: 'el-icon-goods',children: [
          {path: '/category',name: '商品分类',component: () =>	import('@/view/goodsManage/category')},
          {path: '/goodsList',name: '商品库',component: () =>	import('@/view/goodsManage/goodsList')},
          {path: '/goodsAdd',name: '商品新增',component: () =>	import('@/view/goodsManage/goodsAdd'),hidden:true}
        ]
      },

      {path: '/',name: '新闻', fullName:"新闻中心", component: layout,iconCls: 'el-icon-goods',children: [
          {path: '/newsCategory',name: '新闻分类',component: () =>	import('@/view/wxManage/newsCategory')},
          {path: '/newsList',name: '新闻库',component: () =>	import('@/view/wxManage/newsList')},
          {path: '/newsAdd',name: '新闻新增',component: () =>	import('@/view/wxManage/newsAdd'),hidden:true}
        ]
      },
      //
      // {path: '/',name: '库存',component: layout,iconCls: 'el-icon-school',children: [
      //     {path: '/goodsList',name: '商品列表',component: () =>	import('@/view/repertoryManage/repertoryList')	}
      //   ]
      // },
      // {path: '/',name: '采购',component: layout,iconCls: 'el-icon-shopping-cart-full',children: [
      //     {path: '/goodsList',name: '商品列表',component: () =>	import('@/view/repertoryManage/repertoryList')	}
      //   ]
      // },
      // {path: '/',name: '订单',component: layout,iconCls: 'el-icon-s-order',children: [
      //     {path: '/goodsList',name: '商品列表',component: () =>	import('@/view/repertoryManage/repertoryList')	}
      //   ]
      // },
      // {path: '/',name: '客户',component: layout,iconCls: 'el-icon-s-order',children: [
      //     {path: '/goodsList',name: '商品列表',component: () =>	import('@/view/repertoryManage/repertoryList')	}
      //   ]
      // },
      // {path: '/',name: '数据',component: layout,iconCls: 'el-icon-s-order',children: [
      //     {path: '/goodsList',name: '商品列表',component: () =>	import('@/view/repertoryManage/repertoryList')	}
      //   ]
      // },
      // {path: '/',name: '资产',component: layout,iconCls: 'el-icon-s-order',children: [
      //     {path: '/goodsList',name: '商品列表',component: () =>	import('@/view/repertoryManage/repertoryList')	}
      //   ]
      // },

      {path: '/404',component: () =>	import('@/view/layout/nopage.vue'),name: '404',hidden: true},
      {path: '/login',name: 'login',component: () =>import('@/view/layout/login'),hidden: true},
      {path: '*',hidden: true,redirect: {path: '/404'}}



      //
      // {path: '/',name: '版本管理',component: layout,iconCls: 'el-icon-edit-outline',children: [
      //     {path: '/versionRelease',name: '版本发布',component: () =>	import('@/view/versionManagement/versionRelease')	},
      //     {path: '/releaseRecords',name: '发布记录',component: () =>	import('@/view/versionManagement/releaseRecords')	},
      //     {path: '/versionList',name: '版本列表',		component: () =>import('@/view/versionManagement/versionList')}		]
      // },
      //
      // {path: '/',name: '系统管理',component: layout,iconCls: 'el-icon-setting',children: [
      //     {path: '/systemMonitor',name: '系统监听管理',component: () =>	import('@/view/systemManagement/systemMonitor')}]
      // },
      //
      // {path: '/',name: '微信管理',component: layout,iconCls: 'el-icon-phone-outline',children: [
      //     {path: '/wechatPlatform',name: '微信平台状态',component: () =>	import('@/view/wechatManagement/wechatPlatform')},
      //     {path: '/officialAccounts',name: '公众号列表',component: () =>	import('@/view/wechatManagement/officialAccounts')},
      //     {path: '/miniProgram',name: '小程序列表',component: () =>	import('@/view/wechatManagement/miniProgram')}]
      // },
      //
      // {path: '/',name: 'PM2管理',component: layout,iconCls: 'el-icon-location-outline',children: [
      //     {path: '/progress',name: '项目进程状态',component: () =>	import('@/view/progressManagement/progress')}]
      // },
      //
      // {path: '/',name: '商品审核',component: layout,iconCls: 'el-icon-document',children: [
      //     {path: '/auditForTobaccoe',name: '新烟审核',component: () =>	import('@/view/auditForGoods/auditForTobaccoe')},
      //     {path: '/reportReview',name: '新烟上报审核',component: () =>	import('@/view/auditForGoods/reportReview')},
      //     {path: '/libraryTobacco',name: '卷烟信息',component: () =>	import('@/view/auditForGoods/libraryTobacco')}]
      // },
      //
      // {path: '/',name: '客户反馈',component: layout,iconCls: 'el-icon-s-promotion',children: [
      //     {path: '/breakdownList',name: '故障上报 ',component: () =>	import('@/view/feedback/breakdownList')},
      //     {path: '/feedbackList',name: '建议反馈',component: () =>import('@/view/feedback/feedbackList')}]
      // },
      //
      // {path: '/',name: '异常管理',component: layout,iconCls: 'el-icon-s-release',children: [
      //     {path: '/abnormalForPay',name: '支付异常 ',component: () =>import('@/view/abnormalManagement/abnormalForPay')		}]
      // },
      //
      // {path: '/',name: 'OPC更新记录',component: layout,iconCls: 'el-icon-edit-outline',children: [
      //     {path: '/updata',	name: '更新明细',	component: () =>import('@/view/updata/updata')}]
      // },
      //
      // {path: '/',name: '区域管理',component: layout,iconCls: 'el-icon-location-outline',children: [
      //     {path: '/famoyan',	name: '罚没烟管理',	component: () =>import('@/view/areaManage/famoyan')},
      //     {path: '/negativeStore',	name: '负库存管理',	component: () =>import('@/view/areaManage/negativeStore')}]
      // }


    ]
  }
)
//参数说明：leaf: true,//只有一个节点
