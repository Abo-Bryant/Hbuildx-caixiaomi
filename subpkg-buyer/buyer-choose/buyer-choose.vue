<template>
  <view class="page">
     <view class="search">
       <uni-search-bar :radius="5" :cancelButton="none" bgColor="#f4f4f4" @confirm="search" @input="input"></uni-search-bar>
     </view>
   <!--  <view class="temporary-buyer">
       <view class="temporary-text">
         临时客户
       </view>
       <view class="temporary-choose">
         选择
       </view>
     </view> -->
    <view class="buyer-item"  v-for="item in showlist" :key="item.id">
      <view class="temporary-text">
        {{item.name}}
      </view>
      <view class="temporary-choose" @click="doChoose(item.name,item.id)">
        选择
      </view>
    </view>
  </view>
</template>

<script>
   import {getBuyerListRequest} from '../../api/api.js'
  export default {
    data() {
      return {
        buyerList:[]
      };
    },
    onLoad() {
      this.getBuyerList()
    },
    computed:{
      showlist(){
    let linklist = this.buyerList.map(item=>item.linkedBuyerList).flat(Infinity)
         
         this.buyerList.forEach(item=>{
              item.isMainBuyer=!linklist.includes(item.id)
          })
          
           this.buyerList=this.buyerList.filter(item=>item.state!==false&&item.isMainBuyer&&item.name!=='临时客户')     
           return [{id:12,name:'临时客户'},...this.buyerList]
       
      },
       
    },
    methods:{
      input(){},
      // 获取全部买家
      async getBuyerList(){
         this.buyerList=await getBuyerListRequest()
         console.log( this.buyerList)
      },
      doChoose(name,id){
        
        let pages = getCurrentPages(); // 当前页页⾯实例
        let nowPage = pages[pages.length -1]; //当前页⾯实例
        let prevPage = pages[pages.length -2]; // 上一页面实例
        console.log(prevPage,name,id)
        prevPage.$vm.buyerName = name
        prevPage.$vm.buyerId = id
        uni.navigateBack({  //uni.navigateTo跳转的返回，默认1为返回上一级
        		delta: 1
        	});
      }
    }
  }
</script>

<style lang="scss">
.page{
  width: 100%;
  height: 605px;
  background-color: #f4f5f7;
  .search{
    width: 100%;
    height: 60px;
    background-color: #fff;
    margin-bottom: 20px;
  }
  // .temporary-buyer{
  //   width: 100%;
  //   height: 60px;
  //   border-top: 2px solid #e6e7e9;
  //   border-bottom: 2px solid #e6e7e9;
  //   background-color: #fff;
  //   display: flex;
  //   align-items: center;
  //   justify-content: space-between;
  //   .temporary-text{
  //     margin-left: 20px;
  //     font-size: 20px;
  //     font-weight: 600;
  //     color: #333;
  //   }
  //   .temporary-choose{
  //     margin-right: 20px;
  //     color: #388f72;
  //   }
  // }
  .buyer-item{
    width: 100%;
    height: 60px;
    // border-top: 2px solid #e6e7e9;
    border-bottom: 2px solid #e6e7e9;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .temporary-text{
      margin-left: 20px;
      font-size: 20px;
      font-weight: 600;
      color: #333;
    }
    .temporary-choose{
      margin-right: 20px;
      color: #388f72;
    }
  }
}
</style>
