<template>
  <view class="manage-page">
    <view class="manage">
      <view class="top">
        <view class="left">
          <view class="icon"> </view>
        </view>
        <view class="right">
          <view>订单管理</view>
          <view class="arrow"><uni-icons color="#e1e1e1" type="forward" size="30"></uni-icons></view>
        </view>
      </view>
      <navigator :url="'/subpkg-buyer/buyer-manage/buyer-manage'" class="bottom">
        <view class="left"> <view class="icon"> </view></view>
        <view class="right">
          <view>买家管理</view>
          <view class="arrow"><uni-icons color="#e1e1e1" type="forward" size="30"></uni-icons></view>
        </view>
      </navigator>
    </view>
    <view class="report-center">
      <view class="left">
        <view class="icon"> </view>
      </view>
      <view class="right">
        <view>报表中心</view>
        <view class="arrow"><uni-icons color="#e1e1e1" type="forward" size="30"></uni-icons></view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {

      };
    }
  }
</script>

<style lang="scss">
  .manage-page {
    height: 600px;
    width: 100%;
    background-color: #f4f5f7;
    padding-top: 20px;

    .manage {
      border-top: 1px solid #e1e1e1;
      border-bottom: 1px solid #e1e1e1;
      width: 100%;
      height: 120px;
      background-color: #fff;

      .top {
        width: 100%;
        height: 60px;
        display: flex;
        align-items: center;

        .left {
          width: 80px;
          .icon{
            margin-left: 20px;
            width: 30px;
            height: 30px;
            // background-color: red;
            background-image: url('../../static/icons/dingdan.png');
            background-size: contain;
          }
        }

        .right {
          flex: 1;
          height: 60px;
          border-bottom: 1px solid #e1e1e1;
          display: flex;
          justify-content: space-between;
          align-items: center;

          .arrow {
            margin-right: 20px;
          }
        }
      }

      .bottom {
        width: 100%;
        height: 60px;
        display: flex;
        // justify-content: space-between;
        align-items: center;

        .left {
          width: 80px;
          .icon{
            margin-left: 20px;
            width: 30px;
            height: 30px;
            // background-color: red;
            background-image: url('../../static/icons/maijia.png');
            background-size: contain;
          }
        }
        
        .right {
          flex: 1;
          height: 60px;
          // border-bottom: 1px solid #000;
          display: flex;
          justify-content: space-between;
          align-items: center;
        
          .arrow {
            margin-right: 20px;
          }
        }
      }
    }
    .report-center{
      margin-top: 20px;
      height: 60px;
      width: 100%;
      background-color: #fff;
      border-top: 1px solid #e1e1e1;
      border-bottom: 1px solid #e1e1e1;
      display: flex;
      align-items: center;
      .left {
        width: 80px;
        .icon{
          margin-left: 20px;
          width: 30px;
          height: 30px;
          // background-color: red;
          background-image: url('../../static/icons/baobiao.png');
          background-size: contain;
        }
      }
      
      .right {
        flex: 1;
        height: 60px;
        border-bottom: 1px solid #e1e1e1;
        display: flex;
        justify-content: space-between;
        align-items: center;
      
        .arrow {
          margin-right: 20px;
        }
      }
    }
  }
</style>