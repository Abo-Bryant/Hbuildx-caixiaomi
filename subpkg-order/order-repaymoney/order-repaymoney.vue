<template>
  <view class="page">
    <!-- 买家 -->
    <view class="buyer">
      <view class="left">
        买家:
      </view>
      <view class="right">
        <view class="name">
         {{orderDetail.buyerDetail.attributes.name}}
        </view>
        <view class="owetotal">
          总赊欠&nbsp;&nbsp;<text style="margin-left: 5px;color: #ee8b4d;">5000</text>
        </view>
      </view>
    </view>
 <view class="bottom">
   <!-- 应收 -->
    <view class="receivable">
      <view class="left">
        应收
      </view>
      <view class="right">
       {{receivablePriceValue}}
      </view>
    </view>
    <!-- 优惠 -->
    <view class="discounts">
      <view class="left">
        优惠
      </view>
      <view class="right" :class="{borderActive:isActual===false}" @click="doDiscount">
        -{{discountOrOverchargePriceValue}}
      </view>
    </view>
    <!-- 实收 -->
    <view class="box">
      <view class="realincome" :class="{borderActive:isActual===true}" @click="doisActual">
        <view class="left">
          实收
        </view>
        <view class="right">
         <!-- <view class="name" v-if="isActual===false">
          {{actualPriceValue}}上
          </view>
          <view class="name" v-if="isActual===true">
           {{price}}下
          </view> -->
          <view class="name" >
          {{actualPriceValue}}上
          </view>
         <!-- <view class="name" >
           {{price}}下
          </view> -->
          <view class="owetotal">
            <!-- 下欠 <text style="margin-left: 5px;color: #ee8b4d;">{{owePrice}}</text> -->
            下欠 <text style="margin-left: 5px;color: #ee8b4d;">{{receivablePriceValue-discountOrOverchargePriceValue-actualPriceValue}}</text> 
          </view>
        </view>
      </view>
    </view>
    <!-- 收款方式组件-->
    <view class="box1">
      <payment-way @change="change"></payment-way>
    </view>
 </view>
  <view class="key-words">
    <!-- 数字键盘组件 -->
    <key-words @change="handleChange" ref="keyboard"></key-words>
    <!-- 右边按钮 -->
    <view class="text-item">
      <view class="outsidethree" @click="clear">
        <view class="top-next">
          AC
        </view>
      </view>
      <view class="outsideone" @click="next">
        <view class="top-next">
          整单赊账
        </view>
      </view>
      <view class="outsidetwo" @click="sure">
        <view class="bottom-sure">
          收银
        </view>
      </view>
    </view>
  </view>
  </view>
</template>

<script>
    const dayjs = require("dayjs");
    import {getOrderDetailRequest} from '../../api/api.js'
    import {
      updateKeyboardValue
    } from '../../utils/index.js'
  export default {
    data() {
      return {
        orderId:0,
        paymentMethod:'现金',
        isActual:false,
        orderDetail:{},
        discountOrOverchargePriceValue:'0',
        receivablePriceValue:'0',
         price:'0' ,
          a:0
      };
    },
    onLoad(option) {
      console.log(option.orderId)
      this.orderId=option.orderId
      this.getOrderDetail()
    },
    computed:{
      actualPriceValue: {
        get() {
          return this.price
          if (this.discountOrOverchargePriceValue === '0') {
             this.price=this.receivablePriceValue
             return this.price
          } else {
              this.price=+this.receivablePriceValue - this.discountOrOverchargePriceValue
              return this.price
            }
        },
        set(newval) {
          console.log('newval',newval)
          this.price = newval
        }
      },
      // owePrice: {
      //   get() {
      //      // return this.a
      //      this.a =  +this.receivablePriceValue - this.discountOrOverchargePriceValue - this.price
      //       return this.a
      //    }
      //   ,
      //   set(val) {
      //     // let a=0
      //     console.log(val)
      //     this.a=val
      //     console.log(val,this.a)
      //     // return 
      //   }
      // },
    },
    methods:{
      async getOrderDetail(){
        this.orderDetail=await getOrderDetailRequest(this.orderId)
        console.log(this.orderDetail)
        this.receivablePriceValue=this.orderDetail.orderInfo.owePrice
        this.price=this.orderDetail.orderInfo.owePrice
      },
      change(value) {
        console.log(value)
        this.paymentMethod = value
      },
      handleChange(e) {
        console.log(e)
        // 条件判断 判断需要修改的是实收金额还是优惠多收 true的话就是修改实收金额 ， false的话就是修改优惠
        if (this.isActual === true) {
          // this.price = +updateKeyboardValue(this.price.toString(), e)
          this.actualPriceValue=+updateKeyboardValue(this.actualPriceValue.toString(), e)
        } else {
          // 条件判断 判断需要修改的是优惠金额还是多收金额 true的话就是修改优惠金额 ， false的话就是修改多收金额
          this.discountOrOverchargePriceValue = +updateKeyboardValue(this.discountOrOverchargePriceValue.toString(), e)
        }
      },
      doDiscount() {
        this.isActual = false
         // this.price = this.actualPriceValue
      },
      // 点击实收
      doisActual() {
        this.isActual = true
        // this.price = this.actualPriceValue
      },
      // 点击AC
      clear() {
        // 条件判断 判断需要清空的是实收金额还是优惠多收 true的话就是清空实收金额 ， false的话就是清空优惠多收
        if (this.isActual === true) {
          this.actualPriceValue = '0'
        } else {
          this.discountOrOverchargePriceValue = '0'
        }
      },
      async sure(){
        if(this.receivablePriceValue-this.discountOrOverchargePriceValue-this.actualPriceValue===0){
          this.orderDetail.orderInfo.orderState='结清'
        }
        if(this.receivablePriceValue-this.discountOrOverchargePriceValue-this.actualPriceValue>0){
          this.orderDetail.orderInfo.orderState='赊欠'
        }
        console.log('字符串',dayjs().format('YYYY-MM-DD HH:mm:ss'))
        this.orderDetail.orderInfo.orderlife=[{
                orderState:'还款' ,
                totalPrice: this.receivablePriceValue,
                isDiscountsOrOvercharge: true,
                discountOrOverchargePriceValue: +this.discountOrOverchargePriceValue,
                actualPriceValue:this.receivablePriceValue-this.discountOrOverchargePriceValue ,
                price: this.actualPriceValue,
                owePrice: this.receivablePriceValue-this.discountOrOverchargePriceValue-this.actualPriceValue,
                paymentMethod: this.paymentMethod,
                 time:dayjs().format('YYYY-MM-DD HH:mm:ss')
        },...this.orderDetail.orderInfo.orderlife]
        // 2.发送请求
        let data = {
          "data": {
            orderInfo:{
              orderState:this.orderDetail.orderInfo.orderState,
              totalPrice: this.orderDetail.orderInfo.totalPrice,
              isDiscountsOrOvercharge: this.orderDetail.orderInfo.isDiscountsOrOvercharge,
              discountOrOverchargePriceValue: +(this.orderDetail.orderInfo.discountOrOverchargePriceValue+this.discountOrOverchargePriceValue),
              actualPriceValue: this.receivablePriceValue-this.discountOrOverchargePriceValue,
              price: this.orderDetail.orderInfo.price+this.actualPriceValue,
              owePrice: this.receivablePriceValue-this.discountOrOverchargePriceValue-this.actualPriceValue,
              paymentMethod: this.paymentMethod,
               orderlife:this.orderDetail.orderInfo.orderlife
            },  
          }
        }
        const {
          data: res
        } = await uni.$http.put(`api/orders/${this.orderId}`, data)
        console.log(res)
        uni.navigateBack({ //uni.navigateTo跳转的返回，默认1为返回上一级
          delta: 1
        });
        
      }
      
    }
  }
</script>

<style lang="scss">
   @import "@/static/iconfont.css";
.page{
  width: 100%;
  height: 600px;
  background-color:#f4f5f7 ;
  padding-top: 10px;
  .buyer{
    // margin-top: 10px;
    width: 100%;
    height: 60px;
    background-color:#fff ;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left{
      margin-left: 20px;
      color: #999999;
      font-size: 16px;
    }
    .right{
      margin-right: 20px;
      .name{
        text-align: right;
        font-size: 18px;
        font-weight: 700;
        color: #000;
      }
      .owetotal{
        font-weight: 700;
        font-size: 14px;
        color: #999999;
      }
    }
  }
  .bottom{
     width: 100%;
     background-color: #fff;
     padding-bottom: 10px;
     .borderActive {
       border: 2px solid #2ebd5d;
     }
    .receivable{
      margin-top: 10px;
      width: 100%;
      height: 50px;
      background-color:#fff ;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left{
        margin-left: 20px;
        color: #999999;
        font-size: 16px;
      }
      .right{
        margin-right: 20px;
        font-size: 18px;
        font-weight: 700;
        color: #000;
      }
    }
    .discounts{
      width: 100%;
      height: 60px;
      background-color:#fff ;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left{
        margin-left: 20px;
        color: #000;
        font-weight: 700;
        font-size: 16px;
      }
      .right{
        padding-right: 5px;
        width: 150px;
        height: 40px;
        line-height: 40px;
        // border: 2px solid #3eba6c;
        border-radius: 15px;
        margin-right: 10px;
        font-size: 18px;
        font-weight: 700;
        color: #f84943;
        text-align: right;
        background-color: #f4f4f4;
      }
    }
    .box{
      width: 100%;
      height: 60px;
      background-color:#fff ;
      // padding: 0 10px 0 10px;
      .realincome{
        margin-left: 10px;
        width: 95%;
        height: 50px;
        background-color: #f4f4f4;
        // border: 2px solid #3eba6c;
        border-radius: 5px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .left{
          margin-left: 10px;
          color: #000;
          font-weight: 700;
          font-size: 16px;
        }
        .right{
          margin-right: 10px;
          .name{
            text-align: right;
            font-size: 22px;
            font-weight: 700;
            color: #000;
          }
          .owetotal{
            font-weight: 700;
            font-size: 14px;
            color: #999999;
          }
        }
      }
    }
    .box1{
     
      padding-left: 10px;
    }
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
  
        .outsidethree {
          margin-right: 10px;
          margin-bottom: 10px;
          height: 50px;
          background-color: #727884;
          border-radius: 8px;
  
          .top-next {
            border-radius: 5px;
            background: linear-gradient(#858ca5, #a0abbd);
            height: 44px;
            line-height: 44px;
            text-align: center;
            font-size: 22px;
            font-weight: 700;
            color: #fff;
  
          }
        }
  
        .outsideone {
          margin-right: 10px;
          margin-bottom: 10px;
          height: 50px;
          background-color: #b07637;
          border-radius: 8px;
  
          .top-next {
            border-radius: 5px;
            background: linear-gradient(#fe9227, #fea84e);
            height: 44px;
            line-height: 44px;
            text-align: center;
            font-size: 16px;
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
