<template>
  <view class="page">
    <view class="" v-if="productDetail.state === '启用'">
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
      <goods-tally v-if="productDetail.packagingType==='非定装'" :tallyValue="productDetail.tally"
        @changeTally="doTally"></goods-tally>
      <!-- 销售单价 -->
      <goods-price :valuePrice="productDetail.price" @changePrice="doPrice"></goods-price>
      <!-- 货品分类 -->
      <goods-classify  @changeKindId="doKindId" :valueKind="productDetail.kindName" @changeKind="doKind"></goods-classify>
      <!-- 保存按钮 -->
      <view  @click="save" class="save">
        保存
      </view>
     <!-- 底部操作按钮 -->
      <view class="bottom">
        <view @click="productDel">
          <view class="bottom-btn del">删除货品</view>
        </view>
        <view @click="productStop">
          <view class="bottom-btn stop">停用货品</view>
        </view>
      </view>
     <!-- 停用弹出框 -->
      <uni-popup ref="popup" type="dialog">
        <uni-popup-dialog mode="base" content="确定要停用改商品?停用后货品无法售卖" @close="productStopClose"
          @confirm="productStopConfirm"></uni-popup-dialog>
      </uni-popup>
      <!-- 删除弹出框 -->
      <uni-popup ref="popupDel" type="dialog">
        <uni-popup-dialog mode="base" content="确定要删除改商品?" @close="productDelClose"
          @confirm="productDelConfirm"></uni-popup-dialog>
      </uni-popup>

    </view>
    <view class="stop-page" v-else>
      <view class="stop-left">
        <view class="stop-txt">货品名称 <text class="stop-text">{{ productDetail.goodsName }}</text></view>
        <view class="stop-txt">包装类型<text class="stop-text type">{{ productDetail.packagingType }}</text></view>
        <view class="stop-txt" v-if="productDetail.packagingType === '定装'">销售单价<text class="stop-text">{{
          productDetail.sizeNum
          +
          '元/' + productDetail.size }}</text>
        </view>
        <view class="stop-txt" v-if="productDetail.packagingType === '散装'">销售单价<text class="stop-text">{{
          productDetail.price +
          '元/斤' }}</text>
        </view>
        <view class="stop-txt" v-if="productDetail.packagingType === '非定装'">销售单价<text class="stop-text">{{
          productDetail.price +
          '元/' + productDetail.tally }}</text>
        </view>
        <view class="stop-txt">货品分类<text class="stop-text">{{ productDetail.kindName }}</text></view>
      </view>
      <view class="delOrStop">
        <view class="del" @click="productDel">删除货品</view>
        <view class="stop" @click="productStart">启用货品</view>
      </view>
      <uni-popup ref="popupDel" type="dialog">
        <uni-popup-dialog mode="base" content="确定要删除改商品?" @close="productDelClose"
          @confirm="productDelConfirm"></uni-popup-dialog>
      </uni-popup>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        productId: '',
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
        this.productDetail.goodsName = valueName
      },
      doKind(valueKind) {
        console.log('valueName', valueKind)
        this.productDetail.kindName = valueKind
      },
      doKindId(KindId) {
        this.productDetail.kindId = KindId
      },
      doPrice(valuePrice) {
        console.log('valueName', valuePrice)
        this.productDetail.price = valuePrice
      },
      doWeight(valueWeight) {
        this.productDetail.sizeNum = valueWeight
      },
      doPiker(pikerValue) {
        console.log('打印', pikerValue)
        this.productDetail.size = pikerValue
      },
      doTally(tallyValue) {
        console.log('打印', tallyValue)
        this.productDetail.tally = tallyValue
      },
      // 点击删除货品
      productDel() {
        console.log('删除')
        this.$refs.popupDel.open()
      },
     // 点击删除货品弹出框的取消
      productDelClose() {
        this.$refs.popupDel.close()
      },
      // 点击删除货品弹出框的确认
       productDelConfirm(){
          console.log(typeof this.productId);
               this.productList = this.productList.filter(item => item.productId !== this.productId)
               console.log(this.productList);
               uni.setStorageSync('productList', this.productList)
               uni.navigateBack({
                 delta: 1
               });
       },
      // 点击停用货品
      productStop() {
        console.log('停止')
        this.$refs.popup.open()
      },
     // 点击停用货品弹出框的取消
      productStopClose() {
        this.$refs.popup.close()
      },
      // 点击停用货品弹出框的确认
      productStopConfirm() {
        this.productList.forEach(item => {
          if (item.productId === this.productId) {
            item.state = '未启用'
          }
        })
        // console.log(this.productList);
        uni.setStorageSync('productList', this.productList)
        uni.navigateBack({
          delta: 1
        });
      },
      // 点击启用货品
      productStart(){
          this.productDetail.state = '启用'
              this.productList.forEach(item => {
                if (item.productId === this.productId) {
                  item.state = '启用'
                }
              })
              uni.setStorageSync('productList', this.productList)
      },
      // 点击保存
      save(){
         console.log('save');
              this.productList.forEach(item => {
                if (item.productId === this.productId) {
                  item.goodsName = this.productDetail.goodsName
                  item.size = this.productDetail.size
                  item.price = this.productDetail.price
                  item.kindId = this.productDetail.kindId
                }
              })
              uni.setStorageSync('productList', this.productList)
              uni.navigateBack({
                delta: 1
              });
      }
    },
  
  }
</script>

<style lang="scss">
  .page {
    background-color: #f4f5f7;
    height: 600px;

    .stop-page {
      background-color: #f4f5f7;
      height: 600px;

      .stop-left {
        background-color: #fff;
        padding: 20px 10px;

        .stop-txt {
          margin-bottom: 10px;

          // margin-right: 5px;
          .stop-text {
            margin-left: 10px;
          }

          .type {
            width: 30px;
            padding: 5px;
            height: 20px;
            background-color: #daf5fe;
            color: #4684b2
          }
        }
      }



      .delOrStop {
        position: absolute;
        bottom: 10px;
        left: 0;
        width: 100%;
        height: 50px;
        background-color: #fff;
        display: flex;
        justify-content: space-around;
        align-items: center;

        .del {
          width: 150px;
          height: 50px;
          line-height: 50px;
          text-align: center;
          border: 1px solid #f13636;
          color: #f13636;
          border-radius: 25px;
        }

        .stop {
          width: 150px;
          height: 50px;
          border: 1px solid #15cf34;
          line-height: 50px;
          text-align: center;
          color: #15cf34;
          border-radius: 25px;


        }


      }
    }

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

      .del {
        border: 1px solid #f74f44;
        color: #f74f44;
      }

      .stop {
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
    .save{
      position: fixed;
      bottom: 45px;
      left: 0px;
      display: flex;
      justify-content: space-around;
      width: 100%;
      height: 44px;
      border-radius: 22px;
      line-height: 44px;
      text-align: center;
      background-color:#1d9d60 ;
      color: #fff;
      font-size: 30px;
      font-weight: 700;
    }
   }
</style>