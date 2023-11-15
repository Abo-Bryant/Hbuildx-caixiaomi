<template>
  <view class="page">
    <view class="detail">
      <!-- 头像 -->
      <view class="img">

      </view>
      <!-- 信息 -->
      <view class="info">
        <view>{{userDetail.userName}}</view>
        <view class="num">{{userDetail.mobile}}</view>
        <view class="active">{{userDetail.role}}</view>
      </view>
      <!-- 编辑 -->
      <navigator :url="`/subpkg-user/employee-edit/employee-edit?userId=${userDetail.userId}`" class="edit" v-if="ischange"></navigator>
      <!-- 禁用 -->
      <view class="stop" v-if="ischange===false">
        <view class="stoptwo">
          已停用
        </view>
      </view>
    </view>
    <!-- 员工状态 -->
    <view class="state">
      <view class="text">
        员工状态
      </view>
      <view class="switch">
        启用
        <switch class="btn" :checked="ischange" @change="switchChange" />
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        //ischange: true,
        userList: [],
        userDetail: {},
        userId: ''
      };
    },
    onLoad(option) {
      console.log(option.userId, 321);
      this.userId = option.userId
      this.getUserList()
      this.getUserDetail()
    },
   computed:{
     ischange(){
       if(this.userDetail.state === '启用'){
         return true
       }else{
         return false
       }
     }
   },
   onShow() {
      this.getUserList()
      this.getUserDetail()
   },
    methods: {
      getUserList() {
        this.userList = uni.getStorageSync('userList')
      },
      getUserDetail() {
        this.userDetail = this.userList.filter(item => item.userId === this.userId)[0]
      },
      switchChange() {
        if(this.userDetail.state === '启用'){
          this.userDetail.state = '未启用'
        }else{
          this.userDetail.state = '启用'
        }
        console.log('this.userList' ,this.userList)
         uni.setStorageSync('userList', this.userList)
      }
    }
  }
</script>

<style lang="scss">
  .page {
    background-color: #f4f5f7;
    height: 600px;
    width: 100%;

    .detail {
      border-top: 2px solid #e4e4e4;
      border-bottom: 2px solid #e4e4e4;
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      height: 120px;
      background-color: #fff;
      margin-bottom: 15px;

      .img {
        margin-left: 20px;
        width: 80px;
        height: 80px;
        background-color: red;
        border-radius: 50px;
        background-image: url('../../static/img/touxiang.jpg');
        background-size: contain;
      }

      .info {
        margin-right: 60px;

        .num {
          margin-top: 8px;
          margin-bottom: 8px;
        }

        .active {
          border-radius: 15px;
          color: #378b66;
          padding: 5px 10px;
          background-color: #e8faea;
        }
      }

      .edit {
        margin-right: 20px;
        width: 64px;
        height: 64px;
        // background-color: #fbfefd;
        background-image: url('../../static/icons/xiugailvse.png');
        background-size: contain;
      }

      .stop {
        margin-right: 20px;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        border: 2px solid #e4e4e4;
        display: flex;
        justify-content: center;
        align-items: center;

        // background-color: red;
        .stoptwo {
          width: 50px;
          height: 50px;
          line-height: 50px;
          text-align: center;
          border-radius: 50%;
          border: 1px solid #e4e4e4;
          font-size: 14px;
          color: #e4e4e4;
        }

      }
    }

    .state {
      display: flex;
      justify-content: space-between;
      align-items: center;
      // padding: 0 20px;
      width: 100%;
      height: 60px;
      background-color: #fff;
      border-top: 2px solid #e4e4e4;
      border-bottom: 2px solid #e4e4e4;

      .text {
        margin-left: 20px;
        font-size: 20px;
        color: #252525;
        font-weight: 500;
      }

      .switch {
        margin-right: 15px;

        .btn {
          margin-left: 10px;
        }
      }
    }
  }
</style>