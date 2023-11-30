<template>
  <view class="page">
    <!-- 选择买家 -->
    <navigator class="buyer" :url="`/subpkg-buyer/buyer-choose/buyer-choose`">
      <view class="call">
        买家:
        <text class="name">
          临时客户
        </text>
      </view>
      <view class="arrow"><uni-icons color="#e1e1e1" type="forward" size="30"></uni-icons></view>
    </navigator>
    <!-- 订单货品 -->
    <view class="order-production">
      <!-- 订单货品 -->
      <view class="order">
        <view class="text">
          订单货品
        </view>
        <view class="continueadd" @click="addpro" v-if="orderList.length>0">
          + 继续添加
        </view>
      </view>
      <!-- 如果没有货品展示的页面 -->
      <view class="product" v-if="orderList.length===0">
        <view class="text">
          您还未添加任何货品进购物车
        </view>
        <view class="addpro" @click="addpro">
          添加货品
        </view>
      </view>
      <!-- 如果有货品展示的页面 -->
      <view class="prolist" v-if="orderList.length>0">
        <!-- 名称 -->
        <view class="first">
          <view class="right">货品</view>
          <view class="left">
            <view>销量</view>
            <view>单价</view>
            <view>货款</view>
            <view>操作</view>
          </view>
        </view>
        <scroll-view scroll-y style="height: 315px;">
          <navigator class="pro-item" v-for="(item,index) in orderList" :key="item.id"
            :url="`/subpkg-order/order-price/order-price?orderId=${item.id}`">
            <view class="right">{{index+1}}.{{item.attributes.productDetail.name}}</view>
            <view class="left">
              <view>{{item.attributes.productDetail.weightValue}}斤</view>
              <view style="margin-right: 10px;">{{item.attributes.productDetail.price}}</view>
              <view>{{item.attributes.productDetail.weightValue*item.attributes.productDetail.price/100}}</view>
              <view @click="productDel(item.id)"><uni-icons type="trash" color="#fa5151" size="24"></uni-icons></view>
            </view>
          </navigator>
        </scroll-view>
      </view>
    </view>
    <!-- 下方金额合计 -->
    <view class="bottom-operation">
      <view class="total">
        <view class="total-price">
          合计:<text style="font-size: 20px;color: #f58b3c;margin-left: 5px;">{{totalPrice}}</text>元
        </view>
        <view class="total-weight">
          总数 0 总重 {{totalWeight}}
        </view>
      </view>
      <view class="overbooking">
        <navigator class="overbooking-item"
          :url="`/subpkg-order/order-checkstand/order-checkstand?totalPrice=${totalPrice}`">
          下单
        </navigator>
      </view>
    </view>
    <!-- 删除弹出框 -->
    <uni-popup ref="popupDel" type="dialog">
      <uni-popup-dialog mode="base" content="确定要删除改商品?" @close="productDelClose"
        @confirm="productDelConfirm"></uni-popup-dialog>
    </uni-popup>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        // 删除Id
        delId: "",
        // 订单列表
        orderList: []
      };
    },
    onLoad() {
      this.getOrderList()
    },
    onShow() {
      this.getOrderList()
    },
    computed: {
      // 总金额
      totalPrice() {
        let newPrice = 0
        this.orderList.forEach(item => {
          // console.log(item.attributes.productDetail.price)
          // console.log(item.attributes.productDetail.weightValue)
          newPrice += item.attributes.productDetail.price * item.attributes.productDetail.weightValue / 100
        })
        return newPrice
        // console.log(newPrice)
      },
      // 总重量
      totalWeight() {
        let newWeight = 0
        this.orderList.forEach(item => {
          console.log(item.attributes.productDetail.price)
          // console.log(item.attributes.productDetail.weightValue)
          newWeight += item.attributes.productDetail.weightValue
        })
        return newWeight
      }
    },
    methods: {
      // 获取订单列表
      async getOrderList() {
        const {
          data: res
        } = await uni.$http.get('api/orders')
        this.orderList = res.data
        // console.log(res.data)
      },
      // 点击删除货品
      productDel(id) {
        // console.log('删除')
        this.delId = id
        this.$refs.popupDel.open()
      },
      // 点击删除货品弹出框的取消
      productDelClose() {
        this.$refs.popupDel.close()
      },
      // 点击删除货品弹出框的确认
      async productDelConfirm() {
        // console.log(typeof this.productId);
        // 1.发送请求
        const {
          data: res
        } = await uni.$http.delete(`api/orders/${ this.delId}`)

        // console.log(res)
        // 2.轻提示
        uni.showToast({
          title: '删除成功',
          duration: 5000,
          icon: 'success'
        });
        // 3.更新数据
        this.getOrderList()


      },
      //点击继续添加
      addpro() {
        uni.navigateBack({
          delta: 1
        });
      }
    }
  }
</script>

<style lang="scss">
  .page {
    height: 600px;
    width: 100%;
    background-color: #f4f5f7;

    .buyer {
      width: 100%;
      height: 50px;
      background-color: #fff;
      border-bottom: 1px solid #e4e4e4;
      border-top: 1px solid #e4e4e4;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 15px;

      .call {
        margin-left: 20px;
        font-weight: 700;
        font-size: 22px;
      }

      .arrow {
        margin-right: 20px;
      }
    }

    .order-production {
      width: 100%;
      background-color: #fff;

      .order {
        height: 50px;
        border-bottom: 1px solid #e4e4e4;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .text {
          margin-left: 20px;
          font-weight: 700;
          font-size: 18px;
        }

        .continueadd {
          font-weight: 700;
          font-size: 16px;
          color: #1d9d60;
          margin-right: 20px;
          border: 1px solid #1d9d60;
          padding: 8px 15px;
          border-radius: 26px;
        }
      }

      .product {
        width: 100%;
        height: 200px;
        background-color: #fff;
        border-bottom: 1px solid #e4e4e4;

        .text {
          color: #c0c0c0;
          padding-top: 75px;
          margin-left: 80px;
          margin-bottom: 40px;
        }

        .addpro {
          margin-left: 110px;
          width: 150px;
          height: 40px;
          line-height: 40px;
          text-align: center;
          font-weight: 600;
          font-size: 18px;
          border-radius: 40px;
          color: #fff;
          background-color: #1d9d60;
        }
      }

      .prolist {
        .first {
          width: 100%;
          height: 50px;
          background-color: #f2f2f2;
          border-bottom: 1px solid #e4e4e4;
          display: flex;
          align-items: center;
          color: #353535;
          font-size: 14px;

          .right {
            width: 40%;
            margin-left: 20px;
            // margin-right: 100px;
          }

          .left {
            flex: 1;
            display: flex;
            justify-content: space-around;
          }

          // justify-content: space-around;
        }

        .pro-item {
          width: 100%;
          height: 80px;
          background-color: #fff;
          border-bottom: 1px solid #e4e4e4;
          display: flex;
          align-items: center;

          .right {
            font-size: 16px;
            font-weight: 600;
            width: 40%;
            margin-left: 20px;
          }

          .left {
            font-size: 14px;
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: space-around;
          }
        }
      }
    }

    .bottom-operation {
      width: 100%;
      position: fixed;
      bottom: 0;
      left: 0;

      .total {
        height: 60px;
        background-color: #fff;
        border-bottom: 1px solid #e4e4e4;
        border-top: 1px solid #e4e4e4;

        .total-price {
          margin-left: 20px;
          margin-top: 8px;
          font-size: 14px;
          font-weight: 600;
          color: #646464;
        }

        .total-weight {
          margin-left: 20px;
          font-size: 14px;
          color: #999999;
        }
      }

      .overbooking {
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;

        .overbooking-item {
          width: 95%;
          height: 80%;
          line-height: 48px;
          border-radius: 48px;
          text-align: center;
          background-color: #1d9d60;
          color: #fff;
          font-weight: 600;
          font-size: 18px;
        }
      }
    }
  }
</style>