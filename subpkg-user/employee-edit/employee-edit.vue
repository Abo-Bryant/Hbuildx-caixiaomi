<template>
  <view class="page">
    <!-- 员工姓名 -->
    <view class="text-name">
      <view class="name">
        姓名<text class="must">(必填)</text>
      </view>
      <uni-easyinput :focus="true" v-model="userDetail.attributes.name" borderColor="#1ba035"
        :placeholderStyle="placeholderStyle" placeholder="请输入员工姓名(必填)"></uni-easyinput>
    </view>
    <!-- 员工电话 -->
    <view class="text-mobile">
      <view class="mobile">
        电话号码:<text class="must">{{userDetail.attributes.mobile}}</text>
      </view>
    </view>
    <!--  员工角色 -->
    <view class="text-role">
      <view class="role">
        员工角色
      </view>
      <view class="role-item">
        <view class="left">
          <view class="top">档口管理员</view>
          <view class="bottom">拥有全部功能权限</view>
        </view>
        <view class="right">
          <radio value="r1" checked="true" />
        </view>
      </view>
    </view>
    <!-- 保存按钮 -->
    <view class="svae">
      <view class="btn" @click="save">
        保存
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
    methods: {
      // 获取当前员工详情
      async getUserDetail() {
        const {
          data: res
        } = await uni.$http.get(`api/employees/${this.userId}`)
        console.log('res', res)
        this.userDetail = res.data
      },
      // 点击保存
      async save() {
        // 1.非空判断
        if (this.userDetail.attributes.name === '') return uni.$showMsg('请输入员工姓名')
        // 2.发送请求
        let data = {
          "data": {
            "name": this.userDetail.attributes.name

          }
        }
        const {
          data: res
        } = await uni.$http.put(`api/employees/${this.userId}`, data)
        // 3.轻提示
        uni.$showMsg('新增成功')
        // 4.返回上一级页面
        uni.navigateBack({
          delta: 1
        });
      }
    }
  }
</script>

<style lang="scss">
  .page {
    .text-name {
      border-top: 1px solid #000;
      padding: 20px;

      .name {
        margin-bottom: 10px;

        .must {
          color: red;
        }
      }
    }

    .text-mobile {
      padding: 20px;

      .mobile {
        margin-bottom: 10px;

        .must {
          // color: red;
          margin-left: 30px;
        }
      }

    }

    .text-role {

      // padding: 0px 20px;
      .role {
        margin-left: 20px;
        margin-bottom: 10px;
        color: #595959;
        font-weight: 600;
      }

      .role-item {
        padding: 10px 20px;
        height: 60px;
        border-top: 1px solid #e4e4e4;
        border-bottom: 1px solid #e4e4e4;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .left {
          .top {
            margin-bottom: 10px;
            font-size: 18px;
            color: #252525;
            font-weight: 700;
          }

          .bottom {
            color: #c1c1c1;
          }
        }
      }
    }

    .svae {
      position: fixed;
      bottom: 0px;
      left: 0px;
      width: 100%;
      height: 60px;
      background-color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;

      .btn {
        width: 90%;
        height: 40px;
        line-height: 40px;
        text-align: center;
        background-color: #1d9d60;
        border-radius: 20px;
        color: #fff;

      }
    }

  }
</style>