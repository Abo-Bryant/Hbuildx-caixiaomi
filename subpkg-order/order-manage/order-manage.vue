<template>
  <view class="page">
    <!-- 搜索筛选 -->
   <view class="search">
     <uni-search-bar @confirm="search" @input="input" placeholder="请输入买家姓名或号票" ></uni-search-bar>
   </view>
   <!-- 过滤筛选 -->
   <view class="filter">
     <view class="select-time">
     			<uni-datetime-picker placeholder="选择时间范围" />
     		</view>
        <view class="select-state">
           <uni-data-select
           :clear="false"
                v-model="value"
                :localdata="range"
                @change="change"
              ></uni-data-select>
        </view>
   </view>
  <!-- 历史赊欠 -->
  <view class="tick">
    <view class="top">
      <view class="text">
        历史赊欠
      </view>
      <view class="time">
        2023-11-15 10:02
      </view>
      <view class="state">
        结清
      </view>
    </view>
    <view class="bottom">
      <view class="name">
        买家1<text style="font-weight: 400;">(刘博)</text>
      </view>
      <view class="money">
        500
      </view>
    </view>
  </view>
  
  <!-- 订单 -->
  <navigator :url="`/subpkg-order/order-detail/order-detail?orderId=${item.id}`" class="order-item" v-for="item in orderList" :key="item.id" >
    <view class="top">
      <view class="text">
       票号:0002
      </view>
      <view class="time">
        {{item.updatedAt}}
      </view>
      <view class="state-settle" v-if="item.orderInfo.orderState==='结清'">
        结清
      </view>
      <view class="state-owe" v-if="item.orderInfo.orderState==='赊欠'">
        赊欠
      </view>
      <view class="state-void" v-if="item.orderInfo.orderState==='作废'">
        作废
      </view>
    </view>
    <view class="middle">
      <view class="name">
        {{item.buyerDetail.attributes.name?item.buyerDetail.attributes.name:'临时客户'}} <text style="font-weight: 400;"></text>
      </view>
      <view class="money">
        {{item.orderInfo.actualPriceValue}}
      </view>
    </view>
    <view class="bottom" >
     <view class="proname">
       <text v-for="i in item.productDetail" :key="i.id"> {{i.name + '、'}}</text>
     </view>
     <view class="owe" v-if="item.orderInfo.orderState==='赊欠'">
       下欠：{{item.orderInfo.owePrice}}
     </view>
    </view>
  </navigator>
  </view>
</template>

<script>
  export default {
    options: {
      styleIsolation: 'shared', // 解除样式隔离
    },
    data() {
      return {
        orderList:[],
        value:0,
        datetimerange:'',
         range: [
                { value: 0, text: "全部" },
                { value: 1, text: "已结清" },
                { value: 2, text: "赊欠" },
                { value: 3, text: "作废" }
              ],
      };
    },
    onLoad() {
      this.getOrderList()
    },
    onShow() {
      this.getOrderList()
    },
    methods:{
      async getOrderList(){
         const {data: res} = await uni.$http.get('api/orders')
         this.orderList = res.data.map(item=>{
           return {
             ...item.attributes,
             id:item.id
           }
         })
         console.log(this.orderList)
         
      },
      input(v){
        console.log(v)
      },
       change(e) {
            console.log("e:", e);
          },
    }
  }
</script>

<style lang="scss">
.page{
  width: 100%;
  height: 600px;
  background-color:#f4f5f7 ;
  .search{
    width: 100%;
    height: 55px;
    background-color: #fff;
  }
  .filter{
    width: 100%;
    height: 60px;
    background-color: #f4f5f7;
    border-top: 1px solid #e4e4e4;
    border-bottom: 1px solid #e4e4e4;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .select-time{
      margin-left: 20px;
     ::v-deep .uni-date{
        width: 120px;
      }
    }
    .select-state{
      margin-right: 20px;
      ::v-deep .uni-stat__select{
        width: 80px;
        background-color: #fff;
        border-radius: 5px;
      }
    }
  }
  .tick{
    width: 100%;
    height: 70px;
    background-color: #fff;
    border-bottom: 1px solid #e4e4e4;
    padding-top: 10px;
    margin-bottom: 20px;
    .top{
      margin-left: 20px;
      margin-bottom: 15px;
      margin: 0px 0px 15px 20px;
      display: flex;
      justify-content: space-between;
      .text{
        font-size: 14px;
        color: #989898;
      }
      .time{
        margin-right: -60px;
        font-size: 14px;
        color: #989898;
      }
      .state{
        // width: ;
        margin-top: -5px;
        padding: 2px 20px;
        background-color: #dcf3df;
        color: #337a57;
        border-radius:15px 0 0 15px ;
      }
    }
    .bottom{
      display: flex;
      justify-content: space-between;
      font-size: 18px;
      font-weight: 700;
      .name{
        margin-left: 20px;
      }
      .money{
        margin-right: 20px;
      }
    }
  }
  .order-item{
    width: 100%;
    height: 100px;
    background-color: #fff;
    border-bottom: 1px solid #e4e4e4;
    border-top: 1px solid #e4e4e4;
    padding: 10px 0;
    .top{
      margin-left: 20px;
      margin-bottom: 15px;
      margin: 0px 0px 15px 20px;
      display: flex;
      justify-content: space-between;
      .text{
        font-size: 14px;
        color: #989898;
      }
      .time{
        margin-right: -60px;
        font-size: 14px;
        color: #989898;
      }
      .state-settle{
        // width: ;
        margin-top: -5px;
        padding: 2px 20px;
        background-color: #dcf3df;
        color: #337a57;
        border-radius:15px 0 0 15px ;
      }
      .state-owe{
        margin-top: -5px;
        padding: 2px 20px;
        background-color: #ffd500;
        color: #ffaa00;
        border-radius:15px 0 0 15px ;
      }
      .state-void{
        margin-top: -5px;
        padding: 2px 20px;
        background-color: #d4d4d4;
        color: #999999;
        border-radius:15px 0 0 15px ;
      }
    }
    .middle{
      display: flex;
      justify-content: space-between;
      font-size: 18px;
      font-weight: 700;
      margin-bottom: 15px;
      .name{
        margin-left: 20px;
      }
      .money{
        margin-right: 20px;
      }
    }
    .bottom{
     display: flex;
     justify-content: space-between;
     // font-size: 18px;
 .proname{
    margin-left: 20px;
 }
 .owe{
   color: #ffaa00;
    margin-right: 20px;
 }
      
    }
  }
}
</style>
