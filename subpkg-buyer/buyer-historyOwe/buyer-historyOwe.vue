<template>
  <view class="page">
    <!-- <image src="http://tmp/5qDtWI71GWGv714d944c5ea610c1e5c4d80db12d6fce.jpg" mode=""></image> -->
    <!-- 选择客户 -->
    <navigator :url="`/subpkg-buyer/buyer-choose/buyer-choose`" class="buyer">
      <view class="left">
        客户
      </view>
      <view class="right">
        <view class="name">
          {{buyerName}}
        </view>
        <view class="">
          下欠:<text style="color: #e88432;">1000元</text>
        </view>
        <view class="icon">
          <uni-icons color="#9b9b9b" type="right" size="30"></uni-icons>
        </view>
      </view>
    </navigator>
    <view class="oweTime" @click="show">
      <view class="left">
        赊欠时间
      </view>
      <uni-datetime-picker ref="popup" type="date" :clear-icon="false" v-model="single" />
      <view class="right" >
        <view class="time">
           {{single}}
        </view>
        <view class="icon">
          <uni-icons color="#9b9b9b" type="right" size="30"></uni-icons>
        </view>
      </view>
     
    </view>
    <view class="oweMoney">
     <view class="input">
        <uni-easyinput v-model="value" placeholderStyle="color: #333" :inputBorder="false" :clearable="false" placeholder="赊欠金额"></uni-easyinput>
     </view>
     <view class="unit">
       元
     </view>
    </view>
    <view class="uploading">
   <!--   <view class="one">
        <view class="text">
          上传赊欠记录
        </view>
        <view class="num">
          0/9
        </view>
      </view>
      <view class="two">
        <view class="icon">
          <uni-icons color="#d1d5d8" type="plusempty" size="50"></uni-icons>
        </view>
        <view class="text">
          拍照上传
        </view>
      </view>
     --> 
     <uni-file-picker @delete="deleted" @select="select" @success="success" limit="9" title="上传赊欠记录"></uni-file-picker>
    </view>
    <view class="submit" @click="submit">
      提交
    </view>
  </view>
</template>

<script>
   const dayjs = require("dayjs");
   import {getBuyerDetailRequest} from '../../api/api.js'
   import {
     mapState,
   } from 'vuex'
  export default {
    
    options: {
    			styleIsolation: 'shared', // 解除样式隔离
    		},
    data() {
      return {
        value:'',
        buyerName:'',
        buyerId:0,
        single:'',
        imageList:[]
      };
    },
    onLoad(option) {
      this.buyerId=+option.buyerId
      console.log( this.buyerId)
      this.getBuyerDetail()
    },
    computed:{
        ...mapState('m_cart', ['cart']),
    },
    methods:{
      deleted(e){
        console.log('删除文件：',e.tempFilePath)
        this.imageList=this.imageList.filter(item=>item!==e.tempFilePath)
         console.log(' this.imageList', this.imageList)
      },
      // 获取上传状态
      select(e){
      	console.log('选择文件：',e)
        this.imageList.push(e.tempFilePaths[0])
        console.log(' this.imageList', this.imageList)
      },
      // 上传成功
      success(e){
        console.log(e)
      },
      show(){
        console.log(111)
        this.$refs.popup.show()
      },
      // 获取买家详情
      async getBuyerDetail() {
        this.buyerDetail =await getBuyerDetailRequest(this.buyerId)
        this.buyerName=this.buyerDetail.attributes.name
      },
      async submit(){
        console.log('客户id',this.buyerId,'客户名字',this.buyerName,'赊欠时间',this.single,'赊欠金额',this.value,'选中的照片',this.imageList)
        // 买家详情
        const {
          data: res2
        } = await uni.$http.get(`api/buyers/${this.buyerId}`)
        let buyerDetail = res2.data
        // 获取员工详情
        const {
          data: res
        } = await uni.$http.get(`api/employees/1`)
        if (res.data === null) return uni.$showMsg(res.error.message)
        let userDetail = res.data
        let orderInfo = {
          // 订单状态
          orderState: '赊欠',
          // 应收金额
          totalPrice: +this.value,
          // 是优惠还是多收
          isDiscountsOrOvercharge:true ,
          // 优惠还是多收金额
          discountOrOverchargePriceValue: 0,
          // 实收需要收的金额
          actualPriceValue: +this.value,
          // 给了多少钱
          price: 0,
          // 欠了多少钱
          owePrice: +this.value,
          // 付款方式
          paymentMethod:'',
          // 赊欠时间
          oweTime:this.single,
          // 赊欠记录
          imageList:this.imageList,
          orderlife: [{
           // 订单状态
           orderState: '赊欠',
           // 应收金额
           totalPrice: +this.value,
           // 是优惠还是多收
           isDiscountsOrOvercharge:true ,
           // 优惠还是多收金额
           discountOrOverchargePriceValue: 0,
           // 实收需要收的金额
           actualPriceValue: +this.value,
           // 给了多少钱
           price: 0,
           // 欠了多少钱
           owePrice: +this.value,
           // 付款方式
           paymentMethod:'',
            time:dayjs().format('YYYY-MM-DD HH:mm:ss')
          }]
        }
        let data = {
          "data": {
            productDetail: this.cart,
            buyerDetail:buyerDetail,
            orderInfo: orderInfo,
            userDetail: userDetail
          }
        }
        // console.log('请求需要的数据',data)
        const {
          data: res1
        } = await uni.$http.post('api/orders', data)
        console.log('请求需要的数据',res1)
      }
    }
  }
</script>

<style lang="scss">
.page{
  width: 100%;
  height: 600px;
  background-color: #f4f5f7;
  .buyer{
    width: 100%;
    height: 60px;
    background-color: #fff;
    border-top: 2px solid #e4e4e4;
    border-bottom: 1px solid #e4e4e4;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left{
      margin-left: 20px;
    }
    .right{
      margin-right: 10px;
      display: flex;
      align-items: center;
      .name{
        margin-right: 5px;
      }
      .icon{
        
      }
    }
  }
  .oweTime{
    width: 100%;
    height: 60px;
    background-color: #fff;
    // border-top: 2px solid #e4e4e4;
    border-bottom: 1px solid #e4e4e4;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left{
      margin-left: 20px;
    }
    .uni-date{
      // opacity: 0.5;
      .uni-date-editor{
        opacity: 0;
      }
    }
    .right{
      margin-right: 10px;
      display: flex;
      align-items: center;
      .time{
        // margin-right: 5px;
      }
      .icon{
        
      }
    }
  }
  .oweMoney{
    width: 100%;
    height: 80px;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .input{
      margin-left: 20px;
      .uni-easyinput{
        width: 175%;
        .uni-easyinput__content{
          background-color: #f4f5f7 !important;
        }
      }
    }
    .unit{
      margin-right: 20px;
    }
  }
  .uploading{
    
    margin-top: 20px;
    width: 100%;
    // height: 150px;
    background-color: #fff;
    padding-top: 20px;
    padding-bottom: 20px;
    .uni-file-picker{
      .uni-file-picker__container{
        margin-bottom: 100px;
        .file-picker__box{
          margin-left: 20px;
        }
      }
      .uni-file-picker__header{
        .file-title{
          margin-left: 20px;
          font-size: 16px;
          color: #6a6a6a;
        }
        .file-count{
          margin-right: 20px;
          font-size: 16px;
          color: #6a6a6a;
        }
      }
    }
    .one{
      // margin-top: 20px;
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
      .text{
        margin-left: 20px;
      }
      .num{
        margin-right: 20px;
      }
    }
    .two{
      margin-left: 20px;
      width: 100px;
      height: 100px;
      background-color: #f4f5f7;
      display: flex;
       flex-direction: column;
       align-items: center;
         justify-content: center;
      .icon{
        
      }
      .text{
        color: #b8b9bd;
      }
    }
  }
  .submit{
    z-index: 2;
    position: fixed;
    bottom: 0px;
    left: 0px;
    width: 100%;
    height: 60px;
    line-height: 60px;
    text-align: center;
    background-color: #1d9d60;
    color: #fff;
    border-radius: 60px;
    font-size: 24px;
    font-weight: 700;
  }
}
</style>
