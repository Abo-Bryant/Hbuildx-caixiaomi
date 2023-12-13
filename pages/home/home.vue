<template>
  <view class="page">
    
   <navigator :url="'/subpkg-order/order-provisional/order-provisional'" class="billing">
     开单
  </navigator>
  </view>
</template>

<script>
  export default {
    data() {
      return {
      };
    },
    onLoad() {
    },
    computed:{
   
    },
    methods: {
 
    }
    }
</script>

<style lang="scss">
.page{
  width: 100%;
  height: 600px;
  background-color: #f4f5f7;
  .billing{
    position: fixed;
    bottom: 40px;
    right: 112px;
    width: 150px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    background-color: #1d9d60;
    color: #fff;
    font-size: 25px;
    border-radius: 50px;
  }
}

</style>