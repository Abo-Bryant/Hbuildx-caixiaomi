<template>
  <view class="page">
    <uni-forms ref="form" :modelValue="formData" :rules="rules">
      <view class="base">基本信息</view>
      <!-- 基本信息 -->
      <view class="info">
        <!-- 买家姓名 -->
        <uni-forms-item label="买家姓名" name="name">
          <uni-easyinput type="text" v-model="buyerDetail.attributes.name" placeholder="请输入买家姓名" />
        </uni-forms-item>
        <!-- 买家电话 -->
        <uni-forms-item label="电话" name="mobile">
          <uni-easyinput type="text" v-model="buyerDetail.attributes.mobile" placeholder="录入手机号买家可获取账单推送" />
        </uni-forms-item>
      </view>
     <!-- 备注信息 -->
      <view class="remark">
        <uni-forms-item label="备注" name="remark">
          <uni-easyinput type="textarea" autoHeight v-model="buyerDetail.attributes.remark"
            placeholder="请输入内容"></uni-easyinput>
        </uni-forms-item>
      </view>
     <!-- 赊欠设置 -->
      <view class="base">赊欠设置</view>
      <view class="owe">
        <uni-forms-item label="赊欠限额提醒" name="owe" label-width="250px">
          <switch :checked="false" />
        </uni-forms-item>
      </view>
     <!-- 其他设置 -->
      <view class="base">其他设置</view>
      <view class="prevent">
        <!-- 防乱传 -->
        <uni-forms-item label="防乱传" name="prevent" label-width="250px">
          <switch :checked="false" />
        </uni-forms-item>
        <!-- 停用买家 -->
        <uni-forms-item label="停用买家" name="stop" label-width="250px">
          <switch :checked="!buyerDetail.attributes.state" @change="switchChange" />
        </uni-forms-item>
      </view>
      <!-- 是否关联其他买家 -->
      <navigator :url="`/subpkg-buyer/buyer-relevancy/buyer-relevancy?buyerId=${buyerId}`" class="relevancy">
        <view class="text">关联</view>
        <view style="margin-right: 20px;">
          {{linkedBuyerList.length>0?'已关联':'暂无关联买家'}}<uni-icons type="forward" size="18"></uni-icons>
        </view>
      </navigator>
    </uni-forms>
      <!-- 保存按钮 -->
    <view class="save">
      <button class="btn" @click="saveUpdateBuyer">保存</button>
    </view>
  </view>
</template>

<script>
  import {getBuyerDetailRequest} from '../../api/api.js'
  export default {
    data() {
      return {
        // 当前买家id
        buyerId: null,
        // 当前买家详情
        buyerDetail: {},
        //关联买家的数据列表
        linkedBuyerList: []
      };
    },
    onLoad(option) {
      this.buyerId = +option.buyerId
      this.getBuyerDetail()
    },
    methods: {
      // 获取买家详情
      async getBuyerDetail() {
        this.buyerDetail =await getBuyerDetailRequest(this.buyerId)
        this.linkedBuyerList = this.buyerDetail.attributes.linkedBuyerList
      },
      // 停用启用按钮
      switchChange(e) {
        this.buyerDetail.attributes.state = !e.detail.value
      },
     // 点击保存按钮
      async saveUpdateBuyer() {
        // 1.非空判断
        if (this.buyerDetail.attributes.name === '') return uni.$showMsg('请输入买家姓名')
        if (this.buyerDetail.attributes.mobile === '') return uni.$showMsg('请输入电话号码')
        // 2.发送请求
        let data = {
          "data": {
            state: this.buyerDetail.attributes.state,
            name: this.buyerDetail.attributes.name,
            mobile: this.buyerDetail.attributes.mobile,
            remark: this.buyerDetail.attributes.remark,
          }
        }
        const {
          data: res
        } = await uni.$http.put(`api/buyers/${this.buyerId}`, data)
        // 请求出错的提示
        if(res.data===null) return uni.$showMsg(res.error.message)
        // 3.轻提示提示
        uni.showToast({
          title: '修改成功',
          duration: 2000,
          icon: 'success'
        });
        // 4.返回列表页面
        uni.navigateBack({
          delta: 2
        });

      }
    }
  }
</script>

<style lang="scss">
  .page {
    background-color: #f4f5f7;
    padding: 20px 20px;

    .base {
      font-size: 14px;
      color: #949597;
      font-weight: 700;
      margin-bottom: 5px;
    }

    .info {
      height: 100px;
      background-color: #fff;
      border-radius: 10px;
      padding: 10px 20px;
      margin-bottom: 10px;

      .is-input-border {
        border: none;
      }
    }

    .remark {
      height: 100px;
      background-color: #fff;
      border-radius: 10px;
      padding: 10px 20px;
      margin-bottom: 10px;
    }

    .owe {
      height: 40px;
      background-color: #fff;
      border-radius: 10px;
      padding: 10px 20px 0px;
      margin-bottom: 10px;
    }

    .prevent {
      height: 100px;
      background-color: #fff;
      border-radius: 10px;
      padding: 10px 20px 0px;
      // margin-bottom: 80px;
    }

    .relevancy {
      width: 100%;
      height: 40px;
      background-color: #fff;
      margin-bottom: 80px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #606266;
      font-size: 14px;

      .text {
        margin-left: 20px;

      }
    }

    .save {
      position: fixed;
      bottom: 0px;
      left: 0px;
      width: 100%;
      height: 60px;
      background-color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      border-top: 1px solid #e5e4e1;

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