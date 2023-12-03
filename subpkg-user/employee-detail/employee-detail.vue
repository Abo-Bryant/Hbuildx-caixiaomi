<template>
  <view class="page">
    <!-- 员工详情 -->
    <view class="detail">
      <!-- 头像 -->
      <view class="img">
      </view>
      <!-- 信息 -->
      <view class="info">
        <view>{{userDetail.attributes.name}}</view>
        <view class="num">{{userDetail.attributes.mobile}}</view>
        <view class="active">{{userDetail.attributes.duty}}</view>
      </view>
      <!-- 编辑 -->
      <navigator :url="`/subpkg-user/employee-edit/employee-edit?userId=${userDetail.id}`" class="edit"
        v-if="userDetail.attributes.state"></navigator>
      <!-- 禁用 -->
      <view class="stop" v-if="userDetail.attributes.state===false">
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
        <switch class="btn" :checked="userDetail.attributes.state" @change="switchChange" />
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        // 当前员工的详情
        userDetail: {},
        // 当前员工id
        userId: null
      };
    },
    onLoad(option) {
      this.userId = +option.userId
      this.getUserDetail()
    },
    onShow() {
      this.getUserDetail()
    },
    methods: {
      // 获取员工详情
      async getUserDetail() {
        const {
          data: res
        } = await uni.$http.get(`api/employees/${this.userId}`)
        // 请求出错的提示
        if(res.data===null) return uni.$showMsg(res.error.message)
        console.log('res', res)
        this.userDetail = res.data
      },
      // 停用启用按钮
      async switchChange(e) {
        // 条件判断:如果是启用状态 则修改为停用 如果是停用状态 修改为启用
        if (this.userDetail.attributes.state === true) {
          let data = {
            "data": {
              "state": false
            }
          }
          const {
            data: res
          } = await uni.$http.put(`api/employees/${this.userId}`, data)
          // 请求出错的提示
          if(res.data===null) return uni.$showMsg(res.error.message)
        } else {
          let data = {
            "data": {
              "state": true
            }
          }
          const {
            data: res
          } = await uni.$http.put(`api/employees/${this.userId}`, data)
          // 请求出错的提示
          if(res.data===null) return uni.$showMsg(res.error.message)
        }
        // 更新页面
        this.getUserDetail()
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