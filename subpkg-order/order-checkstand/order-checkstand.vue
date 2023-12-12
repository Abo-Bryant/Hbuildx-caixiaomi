<template>
  <!-- 收银台页面 -->
  <view class="page">
    <!-- 选择买家和时间 -->
    <view class="top">
      <!-- 选择买家 -->
      <navigator :url="`/subpkg-buyer/buyer-choose/buyer-choose`" class="buyer">
        <view class="buyuer-text">
          买家
        </view>
        <view class="buyuer-name">
          <view>{{buyerName}}</view>
          <view class="arrow"><uni-icons color="#e1e1e1" type="forward" size="30"></uni-icons></view>
        </view>
      </navigator>
      <!-- 选择收银时间 -->
      <view class="cashier-time">
        <view class="buyuer-text">
          收银时间
        </view>
        <view class="buyuer-name">
          <view>当前时间</view>
          <view class="arrow"><uni-icons color="#e1e1e1" type="forward" size="30"></uni-icons></view>
        </view>
      </view>
    </view>
    <!-- 操作数据 -->
    <view class="bottom">
      <view class="nexine">
        <!-- 应收 -->
        <view class="receivable">
          <view class="receivable-text">
            应收
          </view>
          <view class="receivable-num">
            {{totalPrice}}
          </view>
        </view>
        <!-- 优惠与多收 -->
        <view class="discounts">
          <view class="discounts-text">
            <view class="textone" :class="{active:isDiscountsOrOvercharge===true}" @click="doDiscount">
              优惠
            </view>
            <view class="texttwo" :class="{active:isDiscountsOrOvercharge===false}" @click="doOvercharge">
              多收
            </view>
          </view>
          <view class="discounts-input" :class="{borderActive:isActual===false}" v-if="isDiscountsOrOvercharge===true">
            {{discountOrOverchargePriceValue}}
          </view>
          <view class="discounts-input" :class="{borderActive:isActual===false}" v-if="isDiscountsOrOvercharge===false">
            {{discountOrOverchargePriceValue}}
          </view>
        </view>
        <!-- 实际收取金额 -->
        <view class="realincome " :class="{borderActive:isActual===true}" @click="doisActual">
          <view class="realincome-text">实收</view>
          <view class="realincome-num">
            <view v-if="isActual===false" style="font-size: 18px;font-weight: 700;text-align: right;">
              {{actualPriceValue}}上</view>
            <view v-if="isActual===true" style="font-size: 18px;font-weight: 700;text-align: right;">{{price}}下</view>
            <view style="font-size: 12px;font-weight: 700;color: #989898;">下欠 <text
                style="color: #ec8b43;margin-left: 10px;">{{owePrice}}</text></view>
          </view>
        </view>
        <!--  <view class="realincome "  :class="{borderActive:isActual===true}" @click="doisActual">
          <view class="realincome-text">实收</view>
          <view class="realincome-num">
            
            <view style="font-size: 12px;font-weight: 700;color: #989898;">下欠 <text
                style="color: #ec8b43;margin-left: 10px;">{{owePrice}}</text></view>
          </view>
        </view> -->
        <!-- 收款方式组件-->
        <payment-way @change="change"></payment-way>
        <!-- 占位符 -->
        <view style="height: 5px;"> </view>
      </view>
    </view>
    <!-- 数字键盘 -->
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
    mapMutations,
    mapState,
    mapGetters
  } from 'vuex'
  import {
    updateKeyboardValue
  } from '../../utils/index.js'
  export default {
    options: {
      styleIsolation: 'shared', // 解除样式隔离
    },
    data() {
      return {
        // 付款方式
        paymentMethod: '现金',
        // 买家姓名
        buyerName: '',

        price: this.totalPrice,
        // 应收金额
        receivablePriceValue: this.totalPrice,
        // 优惠或者多收金额
        discountOrOverchargePriceValue: '0',
        // 控制 是优惠还是多收
        isDiscountsOrOvercharge: true,
        // 控制 是不是实收金额
        isActual: true,
        buyerId: 12,
        orderId:0,
        a: 0,
        orderDetail:{}
      };
    },
    onLoad(option) {
      console.log('option.buyerId',option.buyerId)
      this.price = option.totalPrice
      this.receivablePriceValue = option.totalPrice
      this.buyerName = option.buyerName
      this.buyerId = +option.buyerId
      this.orderId=option.orderId
      
    },
    watch: {
      price(newval, oldval) {
        console.log('旧', oldval, '新', newval)
        if (this.isDiscountsOrOvercharge === true) {
          this.owePrice = +this.receivablePriceValue - this.discountOrOverchargePriceValue - newval
        } else {
          this.owePrice = +this.receivablePriceValue + this.discountOrOverchargePriceValue - newval
        }
      }
    },
    computed: {
      ...mapState('m_cart', ['cart']),
      ...mapGetters('m_cart', ['totalPrice']),
      actualPriceValue: {
        get() {
          if (this.discountOrOverchargePriceValue === '0') {
            return this.receivablePriceValue
          } else {
            if (this.isDiscountsOrOvercharge === true) {
              return +this.receivablePriceValue - this.discountOrOverchargePriceValue
            } else {
              return +this.receivablePriceValue + this.discountOrOverchargePriceValue
            }
          }
        },
        set(newval) {
          console.log(newval)
          this.receivablePriceValue = newval
          // this.price = newval
        }
      },
      owePrice: {
        get() {
          return this.a
          if (this.isDiscountsOrOvercharge === true) {
            this.a = +this.receivablePriceValue - this.discountOrOverchargePriceValue - this.actualPriceValue
            return this.a
          } else {
            this.a = +this.receivablePriceValue + this.discountOrOverchargePriceValue - this.actualPriceValue
            return this.a
          }
        },
        set(val) {
          // let a=0
          console.log(val)
          this.a = val
          console.log(val, this.a)
          // return 
        }
      },
      orderState() {
        if (this.owePrice === 0) {
          return '结清'
        }
        if (this.owePrice !== 0) {
          return '赊欠'
        }
      }
    },

    methods: {
      ...mapMutations('m_cart', ['clearCart']),
      // 由key-words组件抛出的自定义事件
      handleChange(e) {
        console.log('this.receivablePriceValue', +this.receivablePriceValue, 'this.actualPriceValue', +this
          .actualPriceValue)

        // 条件判断 判断需要修改的是实收金额还是优惠多收 true的话就是修改实收金额 ， false的话就是修改优惠多收
        if (this.isActual === true) {
          // if(+this.actualPriceValue>=+this.receivablePriceValue||+this.price>=+this.receivablePriceValue) return uni.$showMsg('实收金额不得大于应收-优惠金额')
          this.price = +updateKeyboardValue(this.price.toString(), e)
        } else {
          // 条件判断 判断需要修改的是优惠金额还是多收金额 true的话就是修改优惠金额 ， false的话就是修改多收金额
          this.discountOrOverchargePriceValue = +updateKeyboardValue(this.discountOrOverchargePriceValue.toString(), e)
        }
      },
      // 点击优惠
      doDiscount() {
        this.isDiscountsOrOvercharge = true
        this.isActual = false
        this.price = this.actualPriceValue
      },
      // 点击多收
      doOvercharge() {
        this.isDiscountsOrOvercharge = false
        this.isActual = false
        this.price = this.actualPriceValue

      },
      // 点击实收
      doisActual() {
        this.isActual = true
        this.price = this.actualPriceValue
      },
      change(value) {
        this.paymentMethod = value
      },
      // 点击AC
      clear() {
        // 条件判断 判断需要清空的是实收金额还是优惠多收 true的话就是清空实收金额 ， false的话就是清空优惠多收
        if (this.isActual === true) {
          this.price = '0'
        } else {
          this.discountOrOverchargePriceValue = '0'
        }
      },
      async sure() {
        console.log('订单状态', this.orderState, '买家id', this.buyerId, '买家姓名', this.buyerName, '应收金额', this.totalPrice,
          '是优惠还是多收', this
          .isDiscountsOrOvercharge,
          '优惠还是多收金额', this.discountOrOverchargePriceValue, '实收金额', this.actualPriceValue, '给了多少钱', this.price,
          '下欠金额',
          this.owePrice, '付款方式', this.paymentMethod)
          console.log('this.orderId',this.orderId)
        if (this.buyerName === '临时客户' && this.owePrice > 0) return uni.$showMsg('临时客户不可以赊欠')
        if (this.owePrice <0 ) return uni.$showMsg('收款金额不能大于优惠后的应收金额,请核对')
        // 买家详情
        const {
          data: res2
        } = await uni.$http.get(`api/buyers/${this.buyerId}`)
        let buyerDetail = res2.data
        // 获取员工详情
        const {
          data: res
        } = await uni.$http.get(`api/employees/1`)
        if (res.data === null) return uni.$showMsg(res.error.message)
        let userDetail = res.data
  
        // 如果是新增订单 this.orderId为0
        if(this.orderId==0){
          let orderInfo = {
            // 订单状态
            orderState: this.orderState,
            // 应收金额
            totalPrice: +this.totalPrice,
            // 是优惠还是多收
            isDiscountsOrOvercharge: this.isDiscountsOrOvercharge,
            // 优惠还是多收金额
            discountOrOverchargePriceValue: +this.discountOrOverchargePriceValue,
            // 实收需要收的金额
            actualPriceValue: +this.actualPriceValue,
            // 给了多少钱
            price: +this.price,
            // 欠了多少钱
            owePrice: this.owePrice,
            // 付款方式
            paymentMethod: this.paymentMethod,
            orderlife: [{
              // 订单状态
              orderState: this.orderState,
              // 应收金额
              totalPrice: +this.totalPrice,
              // 是优惠还是多收
              isDiscountsOrOvercharge: this.isDiscountsOrOvercharge,
              // 优惠还是多收金额
              discountOrOverchargePriceValue: +this.discountOrOverchargePriceValue,
              // 实收需要收的金额
              actualPriceValue: +this.actualPriceValue,
              // 给了多少钱
              price: +this.price,
              // 欠了多少钱
              owePrice: this.owePrice,
              // 付款方式
              paymentMethod: this.paymentMethod,
            }]
          }
          
          console.log(orderInfo, buyerDetail, userDetail, this.cart)
          let data = {
            "data": {
              productDetail: this.cart,
              buyerDetail: buyerDetail,
              orderInfo: orderInfo,
              userDetail: userDetail
            }
          }
          console.log('新增')
          const {
            data: res1
          } = await uni.$http.post('api/orders', data)
          uni.$showMsg('开单成功');
        }else{
          this.orderDetail=await getOrderDetailRequest(this.orderId)
          this.orderDetail.orderInfo.orderlife[0]={
            ...this.orderDetail.orderInfo.orderlife[0],
            time:this.orderDetail.createdAt,
            }
            this.orderDetail.orderInfo={
            // 订单状态
            orderState: this.orderState,
            // 应收金额
            totalPrice: +this.totalPrice,
            // 是优惠还是多收
            isDiscountsOrOvercharge: this.isDiscountsOrOvercharge,
            // 优惠还是多收金额
            discountOrOverchargePriceValue: +this.discountOrOverchargePriceValue,
            // 实收需要收的金额
            actualPriceValue: +this.actualPriceValue,
            // 给了多少钱
            price: +this.price,
            // 欠了多少钱
            owePrice: this.owePrice,
            // 付款方式
            paymentMethod: this.paymentMethod,
            orderlife:[...this.orderDetail.orderInfo.orderlife,{
                     // 订单状态
                    orderState:'改单' ,
                     // 应收金额
                     totalPrice: +this.totalPrice,
                     // 是优惠还是多收
                     isDiscountsOrOvercharge: this.isDiscountsOrOvercharge,
                     // 优惠还是多收金额
                     discountOrOverchargePriceValue: +this.discountOrOverchargePriceValue,
                     // 实收需要收的金额
                     actualPriceValue: +this.actualPriceValue,
                     // 给了多少钱
                     price: +this.price,
                     // 欠了多少钱
                     owePrice: this.owePrice,
                     // 付款方式
                     paymentMethod: this.paymentMethod,
                     time:dayjs().format('YYYY-MM-DD HH:mm:ss')
            }]
          }
            let data = {
              "data": {
                productDetail: this.cart,
                buyerDetail: buyerDetail,
                orderInfo: this.orderDetail.orderInfo,
                userDetail: userDetail
              }
            }
          console.log('修改')
          const {
            data: res1
          } = await uni.$http.put(`api/orders/${this.orderId}`, data)
           uni.$showMsg('改单成功');
        }
        // const {
        //   data: res1
        // } = await uni.$http.post('api/orders', data)
        // uni.$showMsg('开单成功');
        // // this.cart=[]
        this.clearCart([])
        
        uni.navigateBack({ //uni.navigateTo跳转的返回，默认1为返回上一级
          delta: 2
        });
        // console.log('res1', res1)
      }

    }
  }
</script>

<style lang="scss">
  @import "@/static/iconfont.css";

  .page {
    width: 100%;
    height: 600px;
    background-color: #f4f5f7;

    .top {
      margin-bottom: 10px;
      width: 100%;
      display: flex;
      padding-top: 10px;

      .buyer {
        width: 50%;
        height: 100px;
        background-color: #fff;
        margin-right: 10px;
        margin-left: 10px;

        .buyuer-text {
          margin: 15px;
          color: #a5a5a5;
        }

        .buyuer-name {
          margin-left: 15px;
          display: flex;
          align-items: center;
          font-size: 18px;
          font-weight: 700;

          .arrow {
            margin-left: 50px;
          }
        }
      }

      .cashier-time {
        width: 50%;
        height: 100px;
        background-color: #fff;
        margin-right: 10px;

        .buyuer-text {
          margin: 15px;
          color: #a5a5a5;
        }

        .buyuer-name {
          margin-left: 15px;
          display: flex;
          align-items: center;
          font-size: 18px;
          font-weight: 700;

          .arrow {
            margin-left: 50px;
          }
        }
      }
    }

    .bottom {
      width: 100%;

      .nexine {
        background-color: #fff;
        margin: 0 10px;

        .borderActive {
          border: 2px solid #2ebd5d;
        }

        .receivable {
          width: 100%;
          height: 40px;
          display: flex;
          justify-content: space-between;
          align-items: center;

          .receivable-text {
            color: #a0a0a0;
            margin-left: 15px;
          }

          .receivable-num {
            font-weight: 700;
            color: #383838;
            font-size: 18px;
            margin-right: 15px;
          }
        }

        .discounts {
          width: 100%;
          height: 40px;
          display: flex;
          justify-content: space-between;
          align-items: center;

          .discounts-text {
            margin-left: 10px;
            display: flex;

            .textone {
              width: 60px;
              height: 40px;
              line-height: 40px;
              text-align: center;
              border-radius: 10px;
              background-color: #f7f7f7;
            }

            .texttwo {
              width: 60px;
              height: 40px;
              line-height: 40px;
              text-align: center;
              border-radius: 10px;
              background-color: #f7f7f7;
            }

            .active {
              background-color: #1d9d60;
              color: #fff;
            }
          }

          .discounts-input {
            padding-right: 10px;
            margin-right: 10px;
            width: 170px;
            height: 40px;
            line-height: 40px;
            background-color: #f4f4f4;
            border-radius: 10px;
            text-align: right;
          }

        }

        .realincome {
          margin: 10px;
          width: 330px;
          height: 50px;
          background-color: #f4f4f4;
          border-radius: 5px;
          display: flex;
          justify-content: space-between;
          align-items: center;

          .realincome-text {
            margin-left: 10px;
            font-size: 18px;
            font-weight: 600;
          }

          .realincome-num {
            margin-right: 10px;
          }
        }
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