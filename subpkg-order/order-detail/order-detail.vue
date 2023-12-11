<template>
  <view class="page">
    <view class="buyer"  :class="{cancelstate:orderDetail.orderInfo.orderState==='作废',owestate:orderDetail.orderInfo.orderState==='赊欠',settelstate:orderDetail.orderInfo.orderState==='结清'}">
      <view class="order-num">
        <view class="text">
          票号 0006
        </view>
        <view class="duty">
          当班
        </view>
      </view>
      <view class="buyername" >
        {{orderDetail.buyerDetail.attributes.name}}
      </view>
      <view class="buyermobile" v-if="orderDetail.buyerDetail.attributes.mobile">
        电话 : {{orderDetail.buyerDetail.attributes.mobile}}
      </view>
      <view class="billing">
        开单 : {{orderDetail.createdAt}}  <text v-if="orderDetail.orderInfo.orderState==='结清'">收银:{{orderDetail.updatedAt}}</text><text v-if="orderDetail.orderInfo.orderState==='赊欠'">赊欠:{{orderDetail.createdAt}}</text>
        <!-- 开单 : {{orderDetail.createdAt}}  赊欠:{{orderDetail.updatedAt}} -->
      </view>
      <view class="money">
        <view class="order-owe" v-if="orderDetail.orderInfo.orderState==='赊欠'">
          本单赊欠 {{orderDetail.orderInfo.owePrice}}元
        </view>
        <view class="order-settel" v-if="orderDetail.orderInfo.orderState==='结清'">
          已结清
        </view>
        <view class="order-cancel" v-if="orderDetail.orderInfo.orderState==='作废'">
          已作废
        </view>
        <view class="order-actual">
          订单 {{orderDetail.orderInfo.totalPrice}}<text v-if="orderDetail.orderInfo.discountOrOverchargePriceValue!==0">-优惠{{orderDetail.orderInfo.discountOrOverchargePriceValue}}</text><text v-if="orderDetail.orderInfo.orderState==='结清'">-已付{{orderDetail.orderInfo.price}}</text>
        </view>
      </view>
    </view>
    <view class="product">
      <view class="product-detail">
        货品明细
      </view>
      <view class="product-unit">
        <view class="left">
          <view class="name">
            货品/批次号
          </view>
        </view>
        <view class="right">
          <view class="weight">
            数量(重量)
          </view>
          <view class="price">
            单价(百斤)
          </view>
          <view class="subtotal">
            小计
          </view>
        </view>
      </view>
      <view class="product-item" v-for="(item,index) in orderDetail.productDetail" :key="item.id">
          <view class="name">
            {{index+1}}.{{item.name}}
          </view>
          <view class="weight">{{item.weightValue}}斤</view>
          <view class="price">{{item.price}}</view>
          <view class="subtotal">{{item.weightValue*item.price/100}}</view>

      </view>
    </view>
    <view class="user">
      <view class="cashier">
        收银员: {{orderDetail.userDetail.attributes.name}}
      </view>
      <view class="invoice-clerk">
        开票员: {{orderDetail.userDetail.attributes.name}}
      </view>
    </view>
    <view class="order">
      <view class="text">
        订单的一生
      </view>
      <view class="orderinfo" v-for="(v,i) in orderDetail.orderInfo.orderlife">
        <view class="all">
          <text style="font-size: 20px; font-weight: 700;color: #1d9d60;"> {{i+1}}.</text>
          <text style="font-weight: 700;color: #1d9d60;margin-right: 15px;font-size: 16px;">{{v.orderState}}</text>
          {{v.time}} 
        </view>
        <view class="all">
          操作人员 : {{orderDetail.userDetail.attributes.name}}
        </view>
        <view class="all" v-if="v.orderState==='结清'||v.orderState==='赊欠'||v.orderState==='还款'">
          应&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;收 : {{v.actualPriceValue}}元 &nbsp;&nbsp;&nbsp;&nbsp;<text v-if="v.discountOrOverchargePriceValue!=0">(已优惠{{v.discountOrOverchargePriceValue}})</text>
        </view>
        <view class="all" v-if="v.orderState==='作废'">
          退&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;款 : {{v.price}}元
        </view>
        
        <view class="all" v-if="v.orderState==='还款'">
          还款金额 : {{v.price}}元
        </view>
        <view class="all" v-if="v.orderState==='作废'">
          作废金额 : {{v.price}}元
        </view>
       
        <view class="all" v-if="v.orderState==='结清'">
          实&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;收 : {{v.actualPriceValue}}元
        </view>
        <view class="all" v-if="v.orderState==='结清'||v.orderState==='还款'">
          支付方式 : {{v.paymentMethod}}{{v.price}}元
        </view>
        <view class="all" v-if="v.orderState==='赊欠'||v.orderState==='还款'">
          下&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;欠 : {{v.owePrice}}元
        </view>
      </view>
    </view>
    <view class="kong"></view>
    <view class="bottom">
      <view class="cancellation" v-if="orderDetail.orderInfo.orderState!=='作废'" @click="cancellatOrder">作废</view>
      <view class="amendment" v-if="orderDetail.orderInfo.orderState!=='作废'" @click="amendOrder">改单</view>
      <navigator :url="`/subpkg-order/order-repaymoney/order-repaymoney?orderId=${orderDetail.id}`" class="repayment" v-if="orderDetail.orderInfo.orderState!=='作废'&&orderDetail.orderInfo.orderState==='赊欠'">还款</navigator>
    </view>
    <!-- 点击选择按钮后的弹出框 -->
    <uni-popup ref="cancellatpopup" type="dialog">
      <uni-popup-dialog mode="base" title="确定要作废订单吗?" content="作废后将不可恢复" @close="cancellatOrderClose"
        @confirm="cancellatOrderConfirm"></uni-popup-dialog>
    </uni-popup>
    <uni-popup ref="delpopup" type="dialog">
      <uni-popup-dialog mode="base" title="确定要改单吗?"  @close="delOrderClose"
        @confirm="delOrderConfirm"></uni-popup-dialog>
    </uni-popup>
  </view>
</template>

<script>
  const dayjs = require("dayjs");
  import {getOrderDetailRequest} from '../../api/api.js'
import {mapState,mapGetters,mapMutations} from 'vuex'
  export default {
    data() {
      return {
        orderId:0,
        orderDetail:{}
      };
    },
    onLoad(option) {
      console.log(option.orderId)
      this.orderId=option.orderId
      this.getOrderDetail()
    },
    onShow() {
      this.getOrderDetail()
    },
    computed:{
         ...mapState('m_cart',['cart']),
    },
    methods:{
      async getOrderDetail(){
        this.orderDetail=await getOrderDetailRequest(this.orderId)
        this.orderDetail.orderInfo.orderlife[0]={
          ...this.orderDetail.orderInfo.orderlife[0],
          time:this.orderDetail.createdAt
        }
        // console.log(dayjs().format('YYYYMMDDHHmmss'))
      },
      cancellatOrder(){
        console.log('作废')
        this.$refs.cancellatpopup.open()
      },
      cancellatOrderClose(){
         this.$refs.cancellatpopup.close()
      },
      async cancellatOrderConfirm(){
      
        this.orderDetail.orderInfo.orderlife=[...this.orderDetail.orderInfo.orderlife,{
                orderState: "作废",
                totalPrice: this.orderDetail.orderInfo.totalPrice,
                isDiscountsOrOvercharge: this.orderDetail.orderInfo.isDiscountsOrOvercharge,
                discountOrOverchargePriceValue: +this.orderDetail.orderInfo.discountOrOverchargePriceValue,
                actualPriceValue: this.orderDetail.orderInfo.actualPriceValue,
                price: this.orderDetail.orderInfo.price,
                owePrice: this.orderDetail.orderInfo.owePrice,
                paymentMethod: this.orderDetail.orderInfo.paymentMethod,
                time:dayjs().format('YYYY-MM-DD HH:mm:ss')
        }]
        // 2.发送请求
        let data = {
          "data": {
            orderInfo:{
              orderState:'作废',
              totalPrice: this.orderDetail.orderInfo.totalPrice,
              isDiscountsOrOvercharge: this.orderDetail.orderInfo.isDiscountsOrOvercharge,
              discountOrOverchargePriceValue: +this.orderDetail.orderInfo.discountOrOverchargePriceValue,
              actualPriceValue: this.orderDetail.orderInfo.actualPriceValue,
              price: this.orderDetail.orderInfo.price,
              owePrice: this.orderDetail.orderInfo.owePrice,
              paymentMethod: this.orderDetail.orderInfo.paymentMethod,
              orderlife:this.orderDetail.orderInfo.orderlife
            },  
          }
        }
        const {
          data: res
        } = await uni.$http.put(`api/orders/${this.orderId}`, data)
        console.log(res)
        this.getOrderDetail()
        // 1.将orderInfo.orderState的值修改为作废
        // 2.在orderInfo.orderlife这个数组里面添加一个对象
        // 对象信息orderState的值为作废,其他与这个数组第一项的内容一致
        // {
        //       "orderState": "作废",
        //       "totalPrice": 100,
        //       "isDiscountsOrOvercharge": true,
        //       "discountOrOverchargePriceValue": 0,
        //       "actualPriceValue": 100,
        //       "price": 60,
        //       "owePrice": 40,
        //       "paymentMethod": "现金"
        //     }
      },
      amendOrder(){
        if(this.cart.length===0){
          console.log('改单')
           this.$refs.delpopup.open()
        }else{
          return uni.$showMsg('购物车中已经添加了货品,请清空购物车后再修改订单')
        }
       
      },
      delOrderClose(){
         this.$refs.delpopup.close()
      },
      delOrderConfirm(){
        uni.navigateTo({
        	url:`/subpkg-order/order-detailCart/order-detailCart?orderId=${this.orderId}`
        });
      }
    }
  }
</script>

<style lang="scss">
.page{
  width: 100%;
  // height: calc(100vh - 50px);
  background-color: #f4f5f7;
  .buyer{
    position: relative;
    width: 100%;
    height: 150px;
    margin-bottom: 50px;
    
    .order-num{
      display: flex;
      // margin-top: 10px;
      .text{
        margin-top: 10px;
        margin-left: 20px;
        font-size: 14px;
        font-weight: 700;
        color: #fff;
      }
      .duty{
          margin-top: 10px;
          margin-left: 10px;
          padding: 1px 3px;
          border-radius: 3px;
          background-color: #fff;
          font-size: 12px;
          color: #ff8503;
      }
    }
    .buyername{
      margin-top: 5px;
      margin-left: 20px;
      font-size: 20px;
      font-weight: 700;
      color: #fff;
    }
    .buyermobile{
      margin-top: 5px;
      margin-left: 20px;
      font-size: 14px;
      color: #fff;
    }
    .billing{
      margin-top: 5px;
      margin-left: 20px;
      font-size: 14px;
      color: #fff;
    }
    .money{
      position: absolute;
      right: 9px;
      bottom: -35px;
      border-radius: 10px;
      width: 95%;
      height: 70px;
      box-shadow: 0px 5px 5px #e8e9eb;
      background-color: #fff;
      .order-owe{
        margin-top: 10px;
        margin-left: 20px;
        font-size: 20px;
        font-weight: 700;
        color: #fe9a04;
      }
      .order-settel{
        margin-top: 10px;
        margin-left: 20px;
        font-size: 20px;
        font-weight: 700;
        color: #209d63;
      }
      .order-cancel{
        margin-top: 10px;
        margin-left: 20px;
        font-size: 20px;
        font-weight: 700;
        color: #686868;
      }
      .order-actual{
        margin-left: 20px;
        font-size: 16px;
        font-weight: 700;
        color: #333;
      }
    }
  }
  .owestate{
    background: linear-gradient(#ff8503, #feb806);
  }
  .settelstate{
    background-color: #1c9d62;
  }
  .cancelstate{
     background: linear-gradient(#9f9f9f, #bdbdbd);
  }
  .product{
    width: 100%;
    // height: 50px;
    background-color: #fff;
    .product-detail{
      width: 100%;
      height: 50px;
      line-height: 50px;
      margin-left: 20px;
      font-size: 18px;
      font-weight: 600;
      color: #000;
    }
    .product-unit{
      border-top: 1px solid #e8e8e8;
      border-bottom: 1px solid #e8e8e8;
      width: 100%;
      height: 40px;
      display: flex;
      align-items: center;
      // justify-content: space-between;
      font-size: 14px;
      font-weight: 600;
      color: #9a9a9a;
      .left{
        margin-left: 20px;
        margin-right: 50px;
      }
      .right{
        flex: 1;
        display: flex;
        // margin-right: 20px;
        // align-items: center;
        justify-content: space-around;
      }
    }
    .product-item{
      width: 100%;
      height: 40px;
      display: flex;
      align-items: center;
      font-size: 14px;
      font-weight: 600;
      color: #000;
      .name{
        margin-left: 20px;
        width: 80px;
        height: 100%;
        line-height: 40px;
        text-align: left;
      }
      .weight{
        margin-left: 65px;
        width: 65px;
        height: 100%;
        line-height: 40px;
        text-align: center;
      }
      .price{
        margin-left: 35px;
        width: 35px;
        height: 100%;
        line-height: 40px;
        text-align: center;
      }
      .subtotal{
        margin-left: 25px;
        width: 35px;
        height: 100%;
        line-height: 40px;
        text-align: center;
      }
    }
  }
  .user{
    margin-top: 15px;
    width: 100%;
    height: 60px;
    line-height: 30px;
    background-color: #fff;
    .cashier{
      margin-left: 20px;
      font-size: 14px;
    }
    .invoice-clerk{
      margin-left: 20px;
      font-size: 14px;
    }
  }
  .order{
    margin-top: 15px;
    width: 100%;
    // height: 200px;
    background-color: #fff;
    padding: 10px 0 ;
    margin-bottom: 20px;
    .text{
      margin-left: 20px;
      font-weight: 700;
      color: #000;
    }
    .orderinfo{
      margin-top: 10px;
      margin-left: 40px;
    
      .all{
        font-size: 14px;
        margin-bottom: 10px;
      }
    }
  }
  .kong{
    width: 100%;
    height: 50px;
    background-color: #fff;
  }
  .bottom{
    position: fixed;
    bottom: 0px;
    left: 0px;
    width: 100%;
    height: 50px;
    border-top: 1px solid #cccccc;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-around;
    .cancellation{
      width: 100px;
      height: 40px;
      background-color: #fff;
      line-height: 40px;
      text-align: center;
      border: 1px solid red;
      color: red;
      border-radius: 10px;
      font-weight: 700;
      
    }
    .amendment{
      width: 100px;
      height: 40px;
      background-color: #fff;
      line-height: 40px;
      text-align: center;
      border: 1px solid #cccccc;
      color: #333;
      border-radius: 10px;
      font-weight: 700;
    }
    .repayment{
      width: 100px;
      height: 40px;
       background: linear-gradient(to right, #ff8503, #feb709);
      line-height: 40px;
      text-align: center;
      // border: 1px solid #000;
      color: #fff;
      border-radius: 10px;
      font-weight: 700;
    }
  }
}
</style>
