<template>
  <view class="page">
    <!-- 货品名称 -->
    <goods-name :valueName="productDetail.goodsName" @changeName="doName"></goods-name>
    <!-- 包装类型 -->
    <view class="goods-type">
      <view class="type-txet">包装类型</view>
      <view style="font-size: 20px;">
        {{productDetail.packagingType}}
      </view>
    </view>
    <!-- 销售规格 -->
    <goods-size v-if="productDetail.packagingType==='定装'" :pikerValue="productDetail.size"
      :valueWeight="productDetail.sizeNum" @changeWeight="doWeight" @changePiker="doPiker"></goods-size>
       <!-- 计数单位 -->
        <goods-tally v-if="productDetail.packagingType==='非定装'" :tallyValue="productDetail.tally" @changeTally="doTally"></goods-tally>
    <!-- 销售单价 -->
    <goods-price :valuePrice="productDetail.price" @changePrice="doPrice"></goods-price>
    <!-- 货品分类 -->
    <goods-classify :valueKind="productDetail.kindName" @changeKind="doKind"></goods-classify>
    <view class="">
      保存
    </view>
    <view class="bottom">
            <view @click="productDel">
              <view class="bottom-btn del">删除货品</view>
            </view>
           <view  @click="productStop">
             <view class="bottom-btn stop">停用货品</view>
           </view>
    </view>
    
  </view>
</template>

<script>
  export default {
    data() {
      return {
        productDetail: {},
        kindList: [],
      }
    },
    onLoad(option) {
      console.log(option.productId, 321);
      this.productId = option.productId
      this.getProductDetail()
      this.getProductKindList()
    },
    methods: {
      getProductDetail() {
        this.productList = uni.getStorageSync('productList')
        this.productDetail = this.productList.filter(item => item.productId === this.productId)[0]
        console.log('this.productDetail', this.productDetail);
      },
      getProductKindList() {
        this.kindList = uni.getStorageSync('kindList')
      },
      doName(valueName) {
        console.log('valueName', valueName)
        this.valueName = valueName
      },
      doKind(valueKind) {
        console.log('valueName', valueKind)
        this.valueKind = valueKind
      },
      doPrice(valuePrice) {
        console.log('valueName', valuePrice)
        this.valuePrice = valuePrice
      },
      doWeight(valueWeight) {
        this.valueWeight = valueWeight
      },
      doPiker(pikerValue) {
        console.log('打印', pikerValue)
        this.pikerValue = pikerValue
      },
   doTally(tallyValue){
        console.log('打印',tallyValue)
     this.tallyValue=tallyValue
   },
   productDel(){
     console.log('删除')
   },
   productStop(){
     console.log('停止')
   }
    }
  }
</script>

<style lang="scss">
  .page {
    background-color: #f4f5f7;
    height: 600px;
    // position: relative;
    .goods-type {
      background-color: #fff;
      // padding: 10px 20px;
      height: 50px;
      border-top: 1px solid #e6e6e6;
      border-bottom: 1px solid #e6e6e6;
      display: flex;
      // justify-content: center;
      align-items: center;

      .type-txet {
        // margin-bottom: 10px;
        margin-right: 10px;
        margin-left: 20px;
      }


    }

    .goods-size {
      height: 50px;
      background-color: #fff;
      border-bottom: 1px solid #e6e6e6;
      display: flex;
      align-items: center;
      position: relative;

      .size-txet {
        margin-left: 20px;
        margin-right: 8px;
      }

      .price-input {
        .uni-easyinput__content-input {
          width: 250px;
        }
      }

      .size-unit {
        position: absolute;
        top: 15px;
        right: 25px;
        z-index: 99;
        display: flex;
        justify-content: center;

        .size-select {
          margin-bottom: 5px;
          font-size: 16px;

          .uni-select {
            border: none;

            .uni-select__input-box {
              height: 32px;
              align-items: stretch;
            }
          }
        }

      }

    }
    .bottom {
     
        position: fixed;
        bottom: 0px;
        left: 0px;
        display: flex;
        justify-content: space-around;
        .del{
          border: 1px solid #f74f44;
          color: #f74f44;
        }
        .stop{
          border: 1px solid #31906b;
          color: #31906b;
        }
        .bottom-btn {
               margin-left: 22px;
               width: 150px;
               height: 44px;
               line-height: 44px;
               text-align: center;
              
               border-radius: 22px;
        }
      }
  }
</style>