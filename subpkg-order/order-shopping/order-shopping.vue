<template>
  <view >
    <shop-cart :orderId="0" :buyerId="buyerId" :cart="cart" :buyerName="buyerName" :totalPrice="totalPrice" :totalWeight="totalWeight"></shop-cart>
  </view>
</template>

<script>
  // import {getOrderDetailRequest} from '../../api/api.js'
  import {mapState,mapGetters,mapMutations} from 'vuex'
  // import {
  //   getOrderListRequest
  // } from '../../api/api.js'
  export default {
     
    data() {
      return {
        buyerId:12,
        buyerName:'临时客户',
        // 删除Id
        delId: "",
        // 订单列表
        // orderList: [],
        // orderDetail:{},
        orderId:0
      };
    },
    onLoad(option) {
      console.log('orderId',option.orderId)
      this.orderId=option.orderId
    },
    onShow() {
    },
    computed: {
            ...mapState('m_cart',['cart']),
            ...mapGetters('m_cart',['totalPrice','totalWeight']),

    },
    methods: {
      // async getOrderDetail(){
      //   console.log('this.orderId',this.orderId)
      //   if(this.orderId!==undefined){
      //      this.orderDetail=await getOrderDetailRequest(this.orderId)
      //      this.echoCartData(...this.orderDetail.productDetail)
      //   }else{
      //     this.clearCart([])
      //   }
       
      // },
      // doSomething(id){
      //   console.log('点击')
      //   uni.navigateTo({
      //   	url:`/subpkg-order/order-price/order-price?orderId=${id}`
      //   });
      // },
      // ...mapMutations('m_cart',['delCart','echoCartData','clearCart','addToCart']),
      // 点击删除货品
      // productDel(index) {
      //   // console.log('删除')
      //   this.delId = index
      //   this.$refs.popupDel.open()
      // },
      // 点击删除货品弹出框的取消
      // productDelClose() {
      //   this.$refs.popupDel.close()
      // },
      // 点击删除货品弹出框的确认
      // async productDelConfirm() {
      //   console.log(this.delId,this.cart)
      //   this.delCart(this.delId)
      // },
      //点击继续添加
      // addpro() {
      //   uni.navigateBack({
      //     delta: 1
      //   });
      // },
      // hint(){
      //   return uni.$showMsg('请添加商品')
      // }
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
        .overbooking-itemone {
          width: 95%;
          height: 80%;
          line-height: 48px;
          border-radius: 48px;
          text-align: center;
          background-color: #b8b4a2;
          color: #fff;
          font-weight: 600;
          font-size: 18px;
        }
      }
    }
  }
</style>