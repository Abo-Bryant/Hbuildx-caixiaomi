<template>
  <view class="page">
    <view class="">
      <view class="m-category">
          <!-- 左侧导航 -->
          <scroll-view scroll-y class="left">
            <view class="item" v-for="(item, index) in leftList" :key="item.id"
              @click="selectProductCategory(index, item.id)" :class="{ active: index === currentIndex }">{{ item.name
                   }} </view>
          </scroll-view>
         <!-- 右侧展示数据列表 -->
          <scroll-view scroll-y class="right">
            <navigator class="cell" v-for="item in productShowList" :key="item.id"  :url="`/subpkg/product-detail/product-detail?id=${item.id}`">
              <view class="cell-item">
                <view class="item-text" :class="{'is-active':item.state===false}" >
                  {{item.name}}
                  <text class="item-type" v-if="item.packageType==='sanzhuang'">
                    散装
                  </text>
                  <text class="item-type" v-if="item.packageType==='dingzhuang'">
                    定装
                  </text>
                  <text class="item-type" v-if="item.packageType==='feidingzhuang'">
                    非定装
                  </text>
                </view>
                <view class="item-icon"> </view>
              </view>
            </navigator>
          </scroll-view>
        </view>
        <!-- 下方按钮 -->
      <view class="bottom">
              <navigator :url="'/subpkg/kind-manage/kind-manage'">
                <view class="bottom-btn">分类管理</view>
              </navigator>
             <navigator :url="'/subpkg/product-add/product-add'">
               <view class="bottom-btn">新增货品</view>
             </navigator>
      </view>
    </view>
    
  </view>
  </template>

<script>
      import {getKindListRequest,getProductListRequest} from '../../api/api.js'
  export default {
    data() {
      return {
        // 所有货品的信息
        productList: [],
        // 所有的分类信息
        kindList: [],
        // 右侧货品展示列表
        productShowList: [],
        // 选中的下标
        currentIndex: 0,
      };
    },
    onLoad() {
      this.getKindList()
      this.getProductList()
    },
    onShow () {
        this.currentIndex=0
        this.getKindList()
        this.getProductList()
      },
    computed: {
      // 计算属性是函数， 但是在模板html上面是当做属性去用，不能加小括号
      leftList() {
        this.kindList = this.kindList.filter(item => item.name !== '未分类')
        return [{
          name: '全部分类',
          id: 0
        }, ...this.kindList, {
          name: '未分类',
          id: 13
        }]
      },
    },
    methods: {
     // async getKindList(){
     //    const {data: res} = await uni.$http.get('api/kinds')
     //    this.kindList=res.data.map(item=>{
     //      return {
     //        name:item.attributes.title,
     //        id:item.id
     //      }
     //    })
     // },
     async getKindList(){
       this.kindList = await getKindListRequest()
       console.log('this.kindList',this.kindList)
     },
     // async getProductList(){
     //    const {data: res} = await uni.$http.get('api/products')
     //    this.productList = res.data.map(item=>{
     //      return {
     //        id:item.id,
     //       ...item.attributes
     //      }
     //    })
     //    this.productShowList=this.productList
     // },
     async getProductList() {
       this.productList = await getProductListRequest()
       this.productShowList = this.productList
     },
     async selectProductCategory(index, kindId) {
        /* 
        Args:
          index: 当前选中的分类的导航的下标
          kindId: 当前选中的分类的Id
        */
        if (kindId === 0) { //0表示全部商品的id
          this.productShowList = this.productList
        } else {
         let params = {
           'populate[0]':'products'
         }
           const {data: res} = await uni.$http.get(`api/kinds/${kindId}`,params)
          this.productShowList = res.data.attributes.products.data.map(item => {
            return {
              id:item.id,
              ...item.attributes
            }
          })
        }
        this.currentIndex = index;
      },
    }
  }
</script>


<style lang="scss">
.page{
  height: 100%;
  position: relative;
  .m-category {
     display: flex;
     height: calc(100vh - 44px);
  
     .left {
       height: 100%;
       width: 120px;
       font-size: 15px;
       text-align: center;
       background-color: #ffffff;
  
       .item {
         padding: 40rpx 20rpx;
         font-weight: 700;
         color: #000;
  
         &.active {
           background: #1d9d60;
           color: #fff;
           border-radius: 8px;
         }
       }
     }
     .right{
       height: 100%;
           background-color: #f4f5f7;
           ;
           flex: 1;
       .cell {
           background-color: #fff;
           .cell-item {
             .is-active{
               color: #bfbfbf;
             }
             // line-height: 40px;
             height: 40px;
             width: 100%;
              
             border-bottom: 1px solid #e5e6e8;
             display: flex;
             // align-items: center;
             justify-content: space-between;
       
             .item-text {
               font-weight: 700;
               // color: #000;
               margin-left: 20px;
               padding-top: 10px;
               .item-type{
                 // margin-top: 20px;
                 text-align: center;
                 display:  inline-block;
                 width: 50px;
                 height: 20px;
                 // padding: 5px,10px;
                 background-color: #daf5fe;
                 color: #4a7caa;
               }
             }
       
             .cell-textTip {
               margin-left: 60px;
               font-size: 14px;
             }
       
             .item-icon {
               background-image: url('../../static/icons/right.png');
               background-size: contain;
               margin-top: 10px;
               margin-right: 20px;
               width: 20px;
               height: 20px;
             }
           }
         }
       
     }
  }
  .bottom {
    
       position: absolute;
       bottom: -44px;
       // left: 0px;
       display: flex;
       justify-content: space-around;
       .bottom-btn {
              margin-left: 22px;
              width: 150px;
              height: 44px;
              line-height: 44px;
              text-align: center;
              border: 1px solid #31906b;
              color: #31906b;
              border-radius: 22px;
       }
     }
  
}
</style>