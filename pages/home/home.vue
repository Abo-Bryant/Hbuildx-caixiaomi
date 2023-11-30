<template>
  <view class="page">
   home123
   
   <view class="big">
     <view class="a"></view>
     <view class="b"></view>
   </view>
   <navigator :url="'/subpkg-order/order-provisional/order-provisional'" class="billing">
     开单
  </navigator>
   <!-- <uni-icons custom-prefix="iconfont" type="icon-kaidan" size="60"></uni-icons> -->
  </view>
</template>

<script>
import {getKindListRequest} from '../../api/api.js'
  export default {
    data() {
      return {
      kindList:[]
      };
    },
    onLoad() {
    this.getKindList()
    },
    computed:{
   
    },
    methods: {
    async getKindList(){
      this.kindList = await getKindListRequest()
      console.log('this.kindList',this.kindList)
    }
    }
  }
</script>

<style lang="scss">
// @import "@/static/iconfont.css";
.page{
  .big{
    width: 200px;
    height: 200px;
    background-color: red;
   
    // display: flex;
    .a{
      width: 80px;
      height: 80px;
      background-color: green;
       margin: 0 auto;
  }
  .b{
    margin: 0 auto;
      width: 50px;
      height: 50px;
      background-color: green;
  }
  }
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