<template>
  <view class="page">
    <view class="top">
      <view class="buyer">
        <view class="buyuer-text">
          买家
        </view>
        <view class="buyuer-name">
          <view>临时客户</view>
          <view class="arrow"><uni-icons color="#e1e1e1" type="forward" size="30"></uni-icons></view>
        </view>
      </view>
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
    <view class="bottom">
      <view class="nexine">
        <!-- 应收 -->
        <view class="receivable">
          <view class="receivable-text">
            应收
          </view>
          <view class="receivable-num">
            {{receivablePriceValue}}
          </view>
        </view>
        <!-- 优惠与多收 -->
        <view class="discounts">
          <view class="discounts-text">
            <view class="textone" :class="{active:isDiscountsOrOvercharge===true}"
              @click="doDiscount">
              优惠
            </view>
            <view class="texttwo" :class="{active:isDiscountsOrOvercharge===false}"
              @click="doOvercharge">
              多收
            </view>
          </view>
          <view class="discounts-input" :class="{borderActive:isOvercharge===false}" v-if="isDiscountsOrOvercharge===true">
            {{discountPriceValue}}
          </view>
          <view class="discounts-input" :class="{borderActive:isOvercharge===false}" v-if="isDiscountsOrOvercharge===false" >
            {{overchargePriceValue}}
          </view>
        </view>
        <!-- 实际收取金额 -->
        <view class="realincome " :class="{borderActive:isOvercharge===true}" @click="isOvercharge=true">
          <view class="realincome-text">实收</view>
          <view class="realincome-num">
            <view style="font-size: 18px;font-weight: 700;text-align: right;">{{actualPriceValue}}</view>
            <view style="font-size: 12px;font-weight: 700;color: #989898;">下欠 <text
                style="color: #ec8b43;margin-left: 10px;">0</text></view>
          </view>
        </view>
        <!-- 收款方式组件-->
        <payment-way></payment-way>
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
          <view class="top-next" >
            AC
          </view>
        </view>
        <view class="outsideone" @click="next">
          <view class="top-next">
            整单赊账
          </view>
        </view>
        <view class="outsidetwo" @click="back">
          <view class="bottom-sure">
            确认
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
    import {updateKeyboardValue} from '../../utils/index.js'
  export default {
    options: {
      styleIsolation: 'shared', // 解除样式隔离
    },
    onLoad(option) {
      this.actualPriceValue = option.totalPrice
      this.receivablePriceValue = option.totalPrice
    },
    data() {
      return {
        // 应收金额
        receivablePriceValue:null,
        // 优惠金额
        discountPriceValue:'0',
        // 多收金额
        overchargePriceValue:'0',
        // 实际金额
        actualPriceValue:null,
        // 控制 是优惠还是多收
        isDiscountsOrOvercharge: true,
        // 控制 是不是实收金额
        isOvercharge:true
      };
    },
    methods:{
      handleChange(e) {
        console.log('e', e)
        if (this.isOvercharge === true) {
          this.actualPriceValue = updateKeyboardValue(this.actualPriceValue, e)
        } else {
          if( this.isDiscountsOrOvercharge===true){
             this.discountPriceValue = updateKeyboardValue(this.discountPriceValue, e)
          }else{
             this.overchargePriceValue = updateKeyboardValue(this.overchargePriceValue, e)
          }
         
        }
      },
      doDiscount(){
        this.isDiscountsOrOvercharge=true
        this.isOvercharge=false
      },
      doOvercharge(){
        this.isDiscountsOrOvercharge=false
        this.isOvercharge=false
      },
      clear(){
        if (this.isOvercharge === true) {
          this.actualPriceValue = '0'
        } else {
          if( this.isDiscountsOrOvercharge===true){
             this.discountPriceValue = '0'
          }else{
             this.overchargePriceValue = '0'
          }
         
        }
      }
      // doOvercharge(){},
      
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