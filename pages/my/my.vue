<template>
  <view class="my-page">
    <!-- 用户信息 -->
    <view class="userinfo">
      <!-- 头像 -->
      <view class="image">
        <image class="image" src="https://cdn.uviewui.com/uview/album/1.jpg"></image>
      </view>
      <!-- 名字 ,手机号-->
      <view class="text">
        <h1 class="text-name">大发行</h1>
        <view class="text-num">13554250247</view>
      </view>
      <!-- 修改的icon -->
      <view class="icon"></view>
      <!-- 会员中心 -->
      <view class="member">
        <!-- 会员头像 -->
        <view class="member-img"></view>
        <!-- 会员文字 -->
        <view class="mem-text">
          <view class="mem-name">会员中心</view>
          <view class="mem-num"> 体验会员将于今天到期</view>
        </view>
        <!-- 立即开通会员文字 -->
        <view class="mem-vip">
          <view class="vip-text">立即开通VIP会员</view>
        </view>
      </view>
    </view>

    <!-- 订单导航 -->
    <view class="nav">
      <navigator class="nav-item" :url="'/subpkg-user/employee-manage/employee-manage'">
        <view class="nav-icon iconOne"></view>
        <text class="nav-text">员工管理</text>
      </navigator>
      <navigator class="nav-item" :url="'/subpkg/product-manage/product-manage'">
        <view class="nav-icon iconTwo"></view>
        <text class="nav-text">货品管理</text>
      </navigator>
      <navigator class="nav-item" url="/goodsAdd/goods_add/goods_manage">
        <view class="nav-icon iconThree"></view>
        <text class="nav-text">配件商城</text>
      </navigator>
    </view>
    <!-- cell单元格 -->
    <view class="cell">
      <view class="cell-item">
        <view class="item-text">
          赊账安全服务
        </view>
        <view class="item-icon"> </view>
      </view>
      
        <view class="cell-item">
          <view class="item-text">
            设置
          </view>
          <view class="cell-textTip">
            语音提示、资费设置、连接打印机
          </view>
          <view class="item-icon"> </view>
        </view>
      
    </view>

    
  </view>
</template>

<script>
  export default {
    data() {
      return {};
    },
    onLoad() {
      this.getList()
    },
    methods: {
      async getList() {
        console.log('刘博')
        const {
          data: res
        } = await uni.$http.get('api/goods')
        console.log(res)
      }
    }
  }
</script>

<style lang="scss">
  .my-page {
    background-color: #f4f5f7;
    width: 100%;
    height: 100%;

    .userinfo {
      height: 150rpx;
      position: relative;
      display: flex;
      padding: 0 20px 30px;
      background-color: #40425b;
      margin-bottom: 80px;

      .image {
        border-radius: 50%;
        width: 80px;
        height: 80px;
      }

      .text {
        margin-left: 20px;

        .text-name {
          font-size: 30px;
          color: #fbfefd;
          font-weight: 600;
          margin-bottom: 15px;
        }

        .text-num {
          font-size: 15px;
          color: #fbfefd;
          font-weight: 500;
        }
      }

      .icon {
        width: 28px;
        height: 28px;
        // background-color: #fbfefd;
        background-image: url('../../static/icons/xiugai.png');
        background-size: contain;
        margin-top: 8px;
        margin-left: 100px;
      }

      .member {
        height: 60px;
        width: 320px;
        background-color: #ffffff;
        border-radius: 10px;
        position: absolute;
        top: 85px;
        left: 13px;
        display: flex;
        padding: 10px 15px;

        .member-img {
          margin-right: 5px;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background-image: url('../../static/img/vip.jpeg');
          background-size: contain;
          background-color: #dd925e;
        }

        .mem-text {
          .mem-name {
            font-size: 20px;
            color: #242424;
            font-weight: 400;
            margin-bottom: 5px;
          }

          .mem-num {
            font-size: 14px;
            color: #636363;
            font-weight: 500;
          }
        }

        .mem-vip {
          font-size: 14px;
          // text-align: center;
          margin-left: 15px;
          display: flex;

          .vip-text {
            margin-top: 21px;
            color: #dd925e;
          }
        }
      }
    }

    .nav {
      margin-bottom: 20px;
      margin-top: 50rpx;
      background-color: #fff;
      border-radius: 15rpx;
      height: 144rpx;
      display: flex;
      justify-content: space-around;
      align-items: center;

      .nav-item {

        // text-align: center;
        .nav-icon {
          margin-left: 17px;
          width: 30px;
          height: 30px;
          // background-color: #dd925e;
        }

        .iconOne {
          background-image: url('../../static/icons/yuangongguanli.png');
          background-size: contain;
        }

        .iconTwo {
          background-image: url('../../static/icons/huopinguanli.png');
          background-size: contain;
        }

        .iconThree {
          background-image: url('../../static/icons/peijianshangcheng.png');
          background-size: contain;
        }
      }
    }

    .cell {
      // margin-top: 30rpx;
      background-color: #fff;
      height: 80px;
      // border-radius: 15rpx;
      .cell-item {
        line-height: 40px;
        // padding-left: 20px;
        // padding-right: 20px;
        height: 40px;
        width: 100%;
        // border-top: 1px solid #e5e6e8;
        border-bottom: 1px solid #e5e6e8;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .item-text {
          margin-left: 20px;
        }

        .cell-textTip {
          margin-left: 60px;
          font-size: 14px;
        }

        .item-icon {
          background-image: url('../../static/icons/right.png');
          background-size: contain;
          margin-right: 20px;
          width: 20px;
          height: 20px;
          // background-color: #dd925e;
        }
      }
    }
  }
</style>