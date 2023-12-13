<template>
  <view class="page">
    <view class="buyer">
      <view class="left">
        客户
      </view>
      <view class="right">
        <view class="name">
          小李
        </view>
        <view class="">
          下欠:<text style="color: #e88432;">1000元</text>
        </view>
        <view class="icon">
          <uni-icons color="#9b9b9b" type="right" size="30"></uni-icons>
        </view>
      </view>
    </view>
    <view class="oweTime">
      <view class="left">
        赊欠时间
      </view>
      <view class="right">
        <view class="time">
          2023-12-01
        </view>
        <view class="icon">
          <uni-icons color="#9b9b9b" type="right" size="30"></uni-icons>
        </view>
      </view>
    </view>
    <view class="oweMoney">
     <view class="input">
        <uni-easyinput v-model="value" placeholderStyle="color: #333" :inputBorder="false" :clearable="false" placeholder="赊欠金额"></uni-easyinput>
     </view>
     <view class="unit">
       元
     </view>
    </view>
    <view class="uploading">
      <view class="one">
        <view class="text">
          上传赊欠记录
        </view>
        <view class="num">
          0/9
        </view>
      </view>
      <view class="two">
        <view class="icon">
          <uni-icons color="#d1d5d8" type="plusempty" size="50"></uni-icons>
        </view>
        <view class="text">
          拍照上传
        </view>
      </view>
    </view>
    <view class="submit">
      提交
    </view>
  </view>
</template>

<script>
  export default {
    options: {
    			styleIsolation: 'shared', // 解除样式隔离
    		},
    data() {
      return {
        value:''
      };
    }
  }
</script>

<style lang="scss">
.page{
  width: 100%;
  height: 600px;
  background-color: #f4f5f7;
  .buyer{
    width: 100%;
    height: 60px;
    background-color: #fff;
    border-top: 2px solid #e4e4e4;
    border-bottom: 1px solid #e4e4e4;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left{
      margin-left: 20px;
    }
    .right{
      margin-right: 10px;
      display: flex;
      align-items: center;
      .name{
        margin-right: 5px;
      }
      .icon{
        
      }
    }
  }
  .oweTime{
    width: 100%;
    height: 60px;
    background-color: #fff;
    // border-top: 2px solid #e4e4e4;
    border-bottom: 1px solid #e4e4e4;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left{
      margin-left: 20px;
    }
    .right{
      margin-right: 10px;
      display: flex;
      align-items: center;
      .time{
        // margin-right: 5px;
      }
      .icon{
        
      }
    }
  }
  .oweMoney{
    width: 100%;
    height: 80px;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .input{
      margin-left: 20px;
      .uni-easyinput{
        width: 175%;
        .uni-easyinput__content{
          background-color: #f4f5f7 !important;
        }
      }
    }
    .unit{
      margin-right: 20px;
    }
  }
  .uploading{
    margin-top: 20px;
    width: 100%;
    // height: 150px;
    background-color: #fff;
    padding-top: 20px;
    padding-bottom: 20px;
    .one{
      // margin-top: 20px;
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
      .text{
        margin-left: 20px;
      }
      .num{
        margin-right: 20px;
      }
    }
    .two{
      margin-left: 20px;
      width: 100px;
      height: 100px;
      background-color: #f4f5f7;
      display: flex;
       flex-direction: column;
       align-items: center;
         justify-content: center;
      .icon{
        
      }
      .text{
        color: #b8b9bd;
      }
    }
  }
  .submit{
    position: fixed;
    bottom: 0px;
    left: 0px;
    width: 100%;
    height: 60px;
    line-height: 60px;
    text-align: center;
    background-color: #1d9d60;
    color: #fff;
    border-radius: 60px;
    font-size: 24px;
    font-weight: 700;
  }
}
</style>
