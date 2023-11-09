<template>
  <view class="page">
    <view class="">
      <view class="m-category">
          <!-- 左侧导航 -->
          <scroll-view scroll-y class="left">
            <view class="item" v-for="(item, index) in leftList" :key="item.kindId"
              @click="selectProductCategory(index, item.kindId)" :class="{ active: index === currentIndex }">{{ item.goodsKind
                   }} </view>
          </scroll-view>
         <!-- 右侧展示数据列表 -->
          <scroll-view scroll-y class="right">
            <navigator class="cell" v-for="item in productShowList" :key="item.productId"  :url="`/subpkg/product-detail/product-detail?productId=${item.productId}`">
              <view class="cell-item">
                <view class="item-text">
                  {{item.goodsName}}
                  <text class="item-type">
                    {{item.packagingType}}
                  </text>
                </view>
                <view class="item-icon"> </view>
              </view>
            </navigator>
          </scroll-view>
        </view>
      <view class="bottom">
              <navigator url="/goodsAdd/goods_add/kind_manage">
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
      this.getDataList()
    },
     onShow () {
        this.getDataList()
      },
    computed: {
      // 计算属性是函数， 但是在模板html上面是当做属性去用，不能加小括号
      leftList() {
        this.kindList = this.kindList.filter(item => item.goodsKind !== '未分类')
        return [{
          goodsKind: '全部分类',
          kindId: '0000'
        }, ...this.kindList, {
          goodsKind: '未分类',
          kindId: '0001'
        }]
      },

    },
    methods: {
      async getDataList() {
        if(uni.getStorageSync('productList')){
          this.productList = uni.getStorageSync('productList')
          this.productShowList = uni.getStorageSync('productList')
        }else{
          const {data: res} = await uni.$http.get('api/goods')
          this.productList = res.data
          this.productShowList = res.data
          console.log('this.productList', this.productList)
           uni.setStorageSync('productList', this.productList)
        }
       if(uni.getStorageSync('kindList')){
         this.kindList = uni.getStorageSync('kindList')
       }else{
         const {data: res1} = await uni.$http.get('api/goodskind')
         this.kindList = res1.data
          uni.setStorageSync('kindList', this.kindList)
         // console.log(' this.kindList', this.kindList)
       }
        
      },
      selectProductCategory(index, kindId) {
        /* 
        Args:
          index: 当前选中的分类的导航的下标
          kindId: 当前选中的分类的Id
        */
       console.log(kindId)
        if (kindId === '0000') { //'0000'表示全部商品的kindId
          this.productShowList = this.productList
        } else {
          this.productShowList = this.productList.filter(item => item.kindId === kindId)
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
             // line-height: 40px;
             height: 40px;
             width: 100%;
              
             border-bottom: 1px solid #e5e6e8;
             display: flex;
             // align-items: center;
             justify-content: space-between;
       
             .item-text {
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