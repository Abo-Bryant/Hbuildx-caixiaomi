<template>
  <view class="page">
    <!-- 商品的名字和包装类型 -->
    <view class="top">
      <!-- 商品的名字 -->
      <view class="name">
        {{productDetail.name}}
      </view>
     <!-- 商品的包装类型 -->
      <view class="type" v-if="productDetail.packageType==='sanzhuang'">
        散装
      </view>
      <view class="type" v-if="productDetail.packageType==='dingzhuang'">
        定装
      </view>
      <view class="type" v-if="productDetail.packageType==='feidingzhuang'">
        非定装
      </view>
    </view>
    <!-- 输入重量和单价 -->
    <view class="bottom">
      <!-- 重量 -->
      <view class="weight" @click="currentHighlight=true" :class="{active:currentHighlight===true}">
        <view class="text">
          重量（斤）
        </view>
        <view class="num">
          {{weightValue}}
        </view>
      </view>
      <!-- 单价 -->
      <view class="price" :class="{active:currentHighlight===false}" @click="currentHighlight=false">
        <view class="text">
          单价（元/百斤）
        </view>
        <view class="num">
          {{productDetail.price}}
        </view>
      </view>
    </view>
    <view class="lastprice">
       上次售价
     </view>
    <!-- 模拟键盘 -->
    <view class="key-words">
      <!-- 键盘左侧数字组件 -->
      <key-words @change="handleChange" ref="keyboard"></key-words>
      <!-- 键盘右侧功能按钮 -->
      <view class="text-item">
        <!-- 下一项按钮 -->
        <view class="outsideone" @click="next">
          <view class="top-next">
            下一项
          </view>
        </view>
        <!-- 确认按钮 -->
        <view class="outsidetwo" @click="sure">
          <view class="bottom-sure">
            确认
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'
  import {updateKeyboardValue} from '../../utils/index.js'
  export default {
    onLoad(option) {
      console.log(typeof option.orderId)
      this.productId = option.productId
      this.orderId = option.orderId
      this.getProductDetail()
    },
    computed:{
      ...mapState('m_cart',['cart']), 
    },
    data() {
      return {
        // 当前高亮
        currentHighlight: true,
        //订单id
        orderId:'',
        // 订单详情
        orderDetail:{},
        // 商品id
        productId:'',
        // 商品详情
        productDetail:{},
        // 初始重量的值
        weightValue: '0'
      };
    },
    methods: {
      ...mapMutations('m_cart',['addToCart','updateCart']),
      // 获取商品的详情
     async getProductDetail() {
       // 条件判断 如果当前页面productId不为undefined,说明是从开具订单页面点入的当前页面
       if(this.productId!==undefined){
         let params = {
           'populate[0]': 'kind'
         }
         const {
           data: res
         } = await uni.$http.get(`api/products/${ this.productId}`, params)
         // 请求出错的提示
         if(res.data===null) return uni.$showMsg(res.error.message)
         this.productDetail = {...res.data.attributes,id:res.data.id}
       }
        // 条件判断 如果当前页面orderId不为undefined,说明是从购物车页面点入的当前页面
       else if(this.orderId!==undefined){
         this.productDetail=this.cart.filter(item=>item.id==this.orderId)[0]
         this.weightValue=this.productDetail.weightValue
         console.log('123',this.productDetail)
       }
     },
      // 点击下一项按钮
      next() {
        this.currentHighlight=!this.currentHighlight
      },
      // 点击确认按钮
      async sure(){
        // 1.条件判断 如果当前页面productId不为undefined,说明是从开具订单页面点入的当前页面
        if(this.productId!==undefined){
          // 2.将数据存入vuex
          const goods = {
            ...this.productDetail,
                 weightValue:+this.weightValue,
          }
          this.addToCart(goods)
           // 3.轻提示
           uni.$showMsg('加入购物车')
           // 4.返回上一级页面
          uni.navigateBack({
            delta: 1
          })
        }
         // 1.条件判断 如果当前页面orderId不为undefined,说明是从购物车页面点入的当前页面
        else if(this.orderId!==undefined){
          const goods = {
            ...this.productDetail,
                 weightValue:+this.weightValue,
          }
          this.updateCart(goods)
           // 3.轻提示
           uni.$showMsg('修改成功')
           // 4.返回上一级页面
           uni.navigateBack({
             delta: 1
           })
        }
       },
      // 由key-words组件抛出的自定义事件
      handleChange(e) {
        // 条件判断 修改的是重量的值还是单价的值
        if (this.currentHighlight === true) {
          this.weightValue = updateKeyboardValue(this.weightValue.toString(), e)
        } else {
          this.productDetail.price = updateKeyboardValue(this.productDetail.price.toString(), e)
        }
      },
    }
  }
</script>

<style lang="scss">
  .page {
    .top {
      width: 100%;
      height: 60px;
      display: flex;
      border-bottom: 1px solid #bfc0c1;

      .name {
        margin-left: 20px;
        font-weight: 700;
        font-size: 28px;
      }

      .type {
        text-align: center;
        display: inline-block;
        width: 50px;
        height: 20px;
        margin-left: 20px;
        background-color: #daf5fe;
        color: #4a7caa;
        margin-top: 10px;
      }
    }

    .bottom {
      padding: 10px 10px 10px 20px;
      display: flex;

      .price {
        margin-right: 10px;
        width: 50%;
        height: 80px;
        background-color: #ebeffa;
        border-radius: 5px;
        border: 2px solid #d1d5e1;

        .num {
          margin-right: 10px;
          text-align: right;
          font-size: 25px;
          font-weight: 700;
        }

        .text {
          margin: 8px 0 12px 15px;
        }

        &.active {
          background-color: #c6e6d7;
          border: 1px solid #239663;
        }
      }

      .weight {
        margin-right: 10px;
        width: 50%;
        height: 80px;
        background-color: #ebeffa;
        border-radius: 5px;
        border: 2px solid #d1d5e1;

        .num {
          margin-right: 10px;
          text-align: right;
          font-size: 25px;
          font-weight: 700;
        }

        .text {
          margin: 8px 0 12px 15px;
        }

        &.active {
          background-color: #c6e6d7;
          border: 1px solid #239663;
        }
      }
    }
 .lastprice {
      height: 50px;
      line-height: 50px;
      padding-left: 20px;
      background-color: #e4e8f1;
      margin-top: 140px;
      font-size: 16px;
      // font-weight: 700;
    }
    .key-words {
      width: 100%;
      position: fixed;
      bottom: 0;
      display: flex;

      .text-item {
        flex: 1;
        // padding-top: 50px;
        background-color: #e4e8f1;

        .outsideone {
          margin-right: 10px;
          margin-bottom: 10px;
          height: 110px;
          background-color: #4065ac;
          border-radius: 8px;

          .top-next {
            border-radius: 5px;
            background: linear-gradient(#4584da, #5c91f0);
            height: 104px;
            line-height: 104px;
            text-align: center;
            font-size: 22px;
            font-weight: 700;
            color: #fff;

          }
        }

        .outsidetwo {
          margin-right: 10px;
          margin-bottom: 10px;
          height: 110px;
          background-color: #038839;
          border-radius: 8px;

          .bottom-sure {
            border-radius: 5px;
            background: linear-gradient(#03a345, #03bf55);
            height: 104px;
            line-height: 104px;
            text-align: center;
            font-size: 22px;
            font-weight: 700;
            color: #fff;

          }
        }
      }
    }
  }
</style>