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
import {getKindListRequest,getOrderDetailRequest} from '../../api/api.js'
import {timestampToTime}  from '../../utils/index.js'
  const dayjs = require("dayjs");
  export default {
    data() {
      return {
      orderDetail:{}
      };
    },
    onLoad() {
    this.getOrderDetail()
    },
    computed:{
   
    },
    methods: {
    async getOrderDetail(){
      this.orderDetail = await getOrderDetailRequest(75)
      // console.log('this.orderDetail',this.orderDetail.createdAt)
        // console.log(this.orderDetail.createdAt + "的时间戳为：" + timestamp);
        console.log( '时间',timestampToTime(this.orderDetail.createdAt));
        console.log( '时间',dayjs().format('YYYY-MM-DD HH:mm:ss'));
     
    },
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