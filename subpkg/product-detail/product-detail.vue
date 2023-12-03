<template>
  <view class="page">
    <view class="" v-if="productDetail.state === true">
      <!-- 货品名称 -->
      <goods-name :valueName="productDetail.name" @changeName="doName"></goods-name>
      <!-- 包装类型 -->
      <view class="goods-type" v-if="productDetail.packageType==='sanzhuang'">
        <view class="type-txet">包装类型</view>
        <view style="font-size: 20px;">
          散装
        </view>
      </view>
      <view class="goods-type" v-if="productDetail.packageType==='dingzhuang'">
        <view class="type-txet">包装类型</view>
        <view style="font-size: 20px;">
          定装
        </view>
      </view>
      <view class="goods-type" v-if="productDetail.packageType==='feidingzhuang'">
        <view class="type-txet">包装类型</view>
        <view style="font-size: 20px;">
          非定装
        </view>
      </view>
      <!-- 销售规格 -->
      <goods-size v-if="productDetail.packageType==='dingzhuang'" :pikerValue="productDetail.unit"
        :valueWeight="productDetail.weight" @changeWeight="doWeight" @changePiker="doPiker"></goods-size>
      <!-- 计数单位 -->
      <goods-tally v-if="productDetail.packageType==='feidingzhuang'" :tallyValue="productDetail.unit"
        @changeTally="doTally"></goods-tally>
      <!-- 销售单价 -->
      <goods-price :valuePrice="productDetail.price" @changePrice="doPrice"></goods-price>
      <!-- 货品分类 -->
      <goods-classify @changeKindId="doKindId" :valueKind="productDetail.kind.data.attributes.title"
        @changeKind="doKind"></goods-classify>
      <!-- 保存按钮 -->
      <view @click="saveProductDetail" class="save">
        保存
      </view>
      <!-- 底部操作按钮 -->
      <view class="bottom">
        <view @click="delProduct">
          <view class="bottom-btn del">删除货品</view>
        </view>
        <view @click="stopProduct">
          <view class="bottom-btn stop">停用货品</view>
        </view>
      </view>
      <!-- 停用弹出框 -->
      <uni-popup ref="popup" type="dialog">
        <uni-popup-dialog mode="base" content="确定要停用改商品?停用后货品无法售卖" @close="stopProductPopupClose"
          @confirm="stopProductPopupConfirm"></uni-popup-dialog>
      </uni-popup>
      <!-- 删除弹出框 -->
      <uni-popup ref="popupDel" type="dialog">
        <uni-popup-dialog mode="base" content="确定要删除改商品?" @close="delProductPopupClose"
          @confirm="delProductPopupConfirm"></uni-popup-dialog>
      </uni-popup>

    </view>
    <view class="stop-page" v-else>
      <view class="stop-left">
        <view class="stop-txt">货品名称 <text class="stop-text">{{ productDetail.name }}</text></view>
        <view class="stop-txt" v-if="productDetail.packageType === 'dingzhuang'">包装类型<text
            class="stop-text type">定装</text></view>
        <view class="stop-txt" v-if="productDetail.packageType === 'sanzhuang'">包装类型<text
            class="stop-text type">散装</text></view>
        <view class="stop-txt" v-if="productDetail.packageType === 'feidingzhuang'">包装类型<text
            class="stop-text type">非定装</text></view>
        <view class="stop-txt" v-if="productDetail.packageType === 'dingzhuang'">销售单价<text class="stop-text">{{
          productDetail.weight
          +
          '元/' + productDetail.unit }}</text>
        </view>
        <view class="stop-txt" v-if="productDetail.packageType === 'sanzhuang'">销售单价<text class="stop-text">{{
          productDetail.price +
          '元/百斤' }}</text>
        </view>
        <view class="stop-txt" v-if="productDetail.packageType === 'feidingzhuang'">销售单价<text class="stop-text">{{
          productDetail.price +
          '元/' + productDetail.unit }}</text>
        </view>
        <view class="stop-txt">货品分类<text class="stop-text">{{ productDetail.kind.data.attributes.title}}</text></view>
      </view>
      <view class="delOrStop">
        <view class="del" @click="delProduct">删除货品</view>
        <view class="stop" @click="startProduct">启用货品</view>
      </view>
      <uni-popup ref="popupDel" type="dialog">
        <uni-popup-dialog mode="base" content="确定要删除改商品?" @close="delProductPopupClose"
          @confirm="delProductPopupConfirm"></uni-popup-dialog>
      </uni-popup>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        //货品Id
        productId: '',
        // 货品详情
        productDetail: {},
        // 货品分类列表
        kindList: [],
      }
    },
    onLoad(option) {
      // console.log(option.id, 321);
      this.productId = +option.id
      this.getProductDetail()
    },
    methods: {
      // 获取商品详情
      async getProductDetail() {
        let params = {
          'populate[0]': 'kind'
        }
        const {
          data: res
        } = await uni.$http.get(`api/products/${ this.productId}`, params)
        // 请求出错的提示
        if(res.data===null) return uni.$showMsg(res.error.message)
        this.productDetail = res.data.attributes
      },
      doName(valueName) {
        // console.log('valueName', valueName)
        this.productDetail.name = valueName
      },
      doKind(valueKind) {
        // console.log('valueKind', valueKind)
        this.productDetail.kind.data.attributes.title = valueKind
      },
      doKindId(KindId) {
        this.productDetail.kind.data.id = KindId
      },
      doPrice(valuePrice) {
        // console.log('valuePrice', valuePrice)
        this.productDetail.price = valuePrice
      },
      doWeight(valueWeight) {
        // console.log('valueWeight', valueWeight)
        this.productDetail.weight = valueWeight
      },
      doPiker(pikerValue) {
        // console.log('pikerValue', pikerValue)
        this.productDetail.unit = pikerValue
      },
      doTally(tallyValue) {
        // console.log('tallyValue', tallyValue)
        this.productDetail.unit = tallyValue
      },
      // 点击删除货品
      delProduct() {
        // console.log('删除')
        this.$refs.popupDel.open()
      },
      // 点击删除货品弹出框的取消
      delProductPopupClose() {
        this.$refs.popupDel.close()
      },
      // 点击删除货品弹出框的确认
      async delProductPopupConfirm() {
        // console.log(typeof this.productId);
        // 1.发送请求
        const {
          data: res
        } = await uni.$http.delete(`api/products/${ this.productId}`)
         // 请求出错的提示
         if(res.data===null) return uni.$showMsg(res.error.message)
        console.log(res)
        // 2.轻提示
        uni.showToast({
          title: '删除成功',
          duration: 5000,
          icon: 'success'
        });
        // 3.返回上一级页面
        uni.navigateBack({
          delta: 1
        });

      },
      // 点击停用按钮
      stopProduct() {
        // console.log('停止')
        this.$refs.popup.open()
      },
      // 点击停用货品弹出框的取消
      stopProductPopupClose() {
        this.$refs.popup.close()
      },
      // 点击停用货品弹出框的确认
      async stopProductPopupConfirm() {
        // 发送请求
        let data = {
          "data": {
            state: false
          }
        }
        const {
          data: res
        } = await uni.$http.put(`api/products/${ this.productId}`, data)
       // 请求出错的提示
       if(res.data===null) return uni.$showMsg(res.error.message)
        // 2.轻提示
        uni.showToast({
          title: '成功',
          duration: 5000,
          icon: 'success'
        });
        // 3.返回上一级页面
        uni.navigateBack({
          delta: 1
        });
      },
      // 点击启用货品
      async startProduct() {
        // 1.发送请求
        let data = {
          "data": {
            state: true
          }
        }
        const {
          data: res
        } = await uni.$http.put(`api/products/${ this.productId}`, data)
        // 请求出错的提示
        if(res.data===null) return uni.$showMsg(res.error.message)
        // 2.更新页面
        this.getProductDetail()
      },
      // 点击保存
      async saveProductDetail() {
        // 1.非空判断
        if (this.productDetail.name === '') return uni.$showMsg('请输入商品名称')
        // 2.发送请求
        let data = {
          "data": {
            name: this.productDetail.name,
            price: this.productDetail.price,
            kind: this.productDetail.kind.data.id,
            weight: this.productDetail.weight,
            unit: this.productDetail.unit
          }
        }
        const {
          data: res
        } = await uni.$http.put(`api/products/${ this.productId}`, data)
        // 请求出错的提示
        if(res.data===null) return uni.$showMsg(res.error.message)
        // 3.轻提示
        uni.showToast({
          title: '修改成功',
          duration: 5000,
          icon: 'success'
        });
        // 4.返回上一级页面
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

    .save {
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
      background-color: #1d9d60;
      color: #fff;
      font-size: 30px;
      font-weight: 700;
    }
  }
</style>