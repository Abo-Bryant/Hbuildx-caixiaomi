<template>
  <view class="page">
    <view class="filter">
      <view class="chooseState">
        <view class="all " :class="{active:isshow===true}" @click="isshow=true">
          全部
        </view>
        <view class="owe" :class="{active:isshow===false}" @click="isshow=false">
          赊欠
        </view>
      </view>
      <view class="chooseTime">
         <uni-datetime-picker @confirm="onConfirm"></uni-datetime-picker>
      </view>
    </view>
    <view class="purchaseMoney">
     <view class="text" v-show="isshow===true">
        采购金额 ： <text style="color: #e88636;">1000元</text>
     </view>
     <view class="text" v-show="isshow===false">
        赊欠金额 ： <text style="color: #e88636;">1000元</text>
     </view>
    </view>
    <!-- 历史赊欠 -->
   <navigator v-for="item in 2"  class="order-item">
      <view class="top">
        <view class="text">
         历史赊欠
        </view>
        <view class="time">
           2023-11-15 10:02
        </view>
        <!-- <view class="state-settle" v-if="item.orderInfo.orderState==='结清'">
          结清
        </view> -->
        <view class="state-owe">
          赊欠
        </view>
        <!-- <view class="state-void" v-if="item.orderInfo.orderState==='作废'">
          作废
        </view> -->
      </view>
      <view class="middle">
        <view class="name">
          小刘 <text style="font-weight: 400;"></text>
        </view>
        <view class="money">
          500
        </view>
      </view>
      <view class="bottom" >
       <view class="proname">
         <!-- <text v-for="i in item.productDetail" :key="i.id"> {{i.name + '、'}}</text> -->
       </view>
       <view class="owe">
         下欠：500
       </view>
      </view>
    </navigator>
  </view>
</template>

<script>
 
  export default {
    options: {
    			styleIsolation: 'shared', // 解除样式隔离
    		},
    data() {
      return {
        isshow:true
      };
    }
  }
</script>

<style lang="scss">
.page{
  width: 100%;
  height: 600px;
  background-color: #f4f5f7;
  .filter{
    width: 100%;
    height: 60px;
    background-color: #fff;
    border-top: 2px solid #e4e4e4;
    border-bottom: 2px solid #e4e4e4;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .chooseState{
      margin-left: 20px;
      display: flex;
      .all{
        width: 50px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        color: #969696;
        // background-color: red;
      }
      .owe{
        width: 50px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        color: #969696;
        // background-color: red;
      }
      .active{
        background-color: #f7f7f7;
        color: #25a958;
      }
    }
    .chooseTime{
      margin-right: 30px;
      .uni-date{
        width: 110%;
      }
    }
  }
  .purchaseMoney{
    width: 100%;
    height: 60px;
    .text{
      margin-left: 20px;
      height: 60px;
      line-height: 60px;
    }
  }
  .order-item{
     width: 100%;
     height: 100px;
     background-color: #fff;
     border-bottom: 1px solid #e4e4e4;
     border-top: 1px solid #e4e4e4;
     padding: 10px 0;
     margin-bottom: 20px;
     .top{
       margin-left: 20px;
       margin-bottom: 15px;
       margin: 0px 0px 15px 20px;
       display: flex;
       justify-content: space-between;
       .text{
         font-size: 14px;
         color: #989898;
       }
       .time{
         margin-right: -60px;
         font-size: 14px;
         color: #989898;
       }
       .state-settle{
         // width: ;
         margin-top: -5px;
         padding: 2px 20px;
         background-color: #dcf3df;
         color: #337a57;
         border-radius:15px 0 0 15px ;
       }
       .state-owe{
         margin-top: -5px;
         padding: 2px 20px;
         background-color: #ffd500;
         color: #ffaa00;
         border-radius:15px 0 0 15px ;
       }
       .state-void{
         margin-top: -5px;
         padding: 2px 20px;
         background-color: #d4d4d4;
         color: #999999;
         border-radius:15px 0 0 15px ;
       }
     }
     .middle{
       display: flex;
       justify-content: space-between;
       font-size: 18px;
       font-weight: 700;
       margin-bottom: 15px;
       .name{
         margin-left: 20px;
       }
       .money{
         margin-right: 20px;
       }
     }
     .bottom{
      display: flex;
      justify-content: space-between;
      // font-size: 18px;
  .proname{
     margin-left: 20px;
  }
  .owe{
    color: #ffaa00;
     margin-right: 20px;
  }
       
     }
   }
}
</style>
