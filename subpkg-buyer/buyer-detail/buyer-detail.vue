<template>
  <view class="page">
    哈喽 detail

    <view class="bottom">
      <navigator style="background-color: #bfbfbf;color: #ffffff;" :url="''" class="btn">
        还款
      </navigator>
      <navigator :url="`/subpkg-buyer/buyer-edit/buyer-edit?buyerId=${buyerId}`" class="btn">
        修改
      </navigator>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        buyerId:''
      };
    },
    onLoad(option) {
      this.buyerId=option.buyerId
    }
  }
</script>

<style lang="scss">
.page{

  .bottom{
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
      .btn{
        width: 50%;
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
