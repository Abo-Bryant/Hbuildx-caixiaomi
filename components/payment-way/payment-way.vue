<template>
  <view>
    <view class="way">
      <view class="way-item " :class="{itemactive:currentIndex===index}" v-for="(item,index) in list"
        @click="dochoose(index,item.value)">
        <view class="item-icon">
          <uni-icons :color="currentIndex===index?'#fff':'#666666'" custom-prefix="iconfont" :type="item.label"
            size="20"></uni-icons>
        </view>
        <view class="item-text">
          {{item.value}}
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: "payment-way",
    data() {
      return {
        currentIndex: 0,
        list: [{
          label: 'icon-cash',
          value: '现金'
        }, {
          label: 'icon-wxpay',
          value: '微信'
        }, {
          label: 'icon-alipay',
          value: '支付宝'
        }, {
          label: 'icon-ai-pay-copy',
          value: '银联'
        }, {
          label: 'icon-qita',
          value: '其他'
        }]
      };
    },
    methods: {
      dochoose(index, value) {
        this.currentIndex = index
        this.$emit('change', value)
      }
    }
  }
</script>

<style lang="scss">
  .way {
    margin: 10px;
    width: 335px;
    height: 60px;
    // background-color: red;
    border-radius: 5px;
    display: flex;
    justify-content: space-around;
    align-items: center;

    .way-item {
      width: 60px;
      height: 60px;
      background-color: #f4f4f4;
      border-radius: 5px;

      // color: #fff;       
      .item-icon {
        width: 20px;
        height: 20px;
        margin: 10px auto 0;
      }

      .item-text {
        width: 50px;
        height: 20px;
        text-align: center;
        line-height: 20px;
        margin: 0 auto;
        font-size: 14px;
      }
    }

    .itemactive {
      background-color: #1d9d60;
      color: #fff;
    }
  }
</style>