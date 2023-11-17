<template>
  <view class="page">
  		<uni-forms ref="form" :modelValue="formData" :rules="rules" >
        
        <view class="base">基本信息</view>
        
  			<view class="info">
  			  <uni-forms-item label="买家姓名" name="name">
  			  	<uni-easyinput type="text" v-model="buyerDetail.buyerName" placeholder="请输入买家姓名" />
  			  </uni-forms-item>
  			  <uni-forms-item label="电话" name="mobile">
            <uni-easyinput type="text" v-model="buyerDetail.buyerMobile" placeholder="录入手机号买家可获取账单推送" />
  			  </uni-forms-item>
  			</view>
        
        <view class="remark">
          <uni-forms-item label="备注" name="remark" >
          	<uni-easyinput type="textarea" autoHeight v-model="buyerDetail.remark" placeholder="请输入内容"></uni-easyinput>
          </uni-forms-item>
        </view>
        
         <view class="base">赊欠设置</view>
         
         <view class="owe">
           <uni-forms-item label="赊欠限额提醒" name="owe" label-width="250px">
          				<switch :checked="false" />
           </uni-forms-item>
         </view>
         
         <view class="base">其他设置</view>
         
         <view class="prevent">
           <uni-forms-item label="防乱传" name="prevent" label-width="250px">
          			<switch :checked="false" />
           </uni-forms-item>
           
           <uni-forms-item  label="停用买家" name="stop" label-width="250px">
                     				  <switch :checked="ischange" @change="switchChange" />
           </uni-forms-item>
         </view>
         <navigator :url="`/subpkg-buyer/buyer-relevancy/buyer-relevancy?buyerId=${buyerId}`" class="relevancy">
           <view class="text">关联</view>
           <view style="margin-right: 20px;">
             {{linkedBuyerList.length>0?'已关联':'暂无关联买家'}}<uni-icons type="forward" size="18"></uni-icons>
           </view>
         </navigator>
         
  		</uni-forms>
  		
      <view class="save">
        <button class="btn" @click="submit">保存</button>
      </view>
  	</view>
</template>

<script>
  export default {
    data() {
      return {
         buyerId:'',
         buyerList:[],
         buyerDetail:{},
         linkedBuyerList:[]
      };
    },
    onLoad(option) {
      this.buyerId=option.buyerId
      this.getbuyerList()
      this.getBuyerDetail()
    },
    computed:{
      ischange(){
        if(this.buyerDetail.state === '启用'){
          return false
        }else{
          return true
        }
      }
    },
    methods:{
      getbuyerList() {
        this.buyerList = uni.getStorageSync('buyerList')
         console.log('this.buyerList',this.buyerList)
      },
      getBuyerDetail() {
        this.buyerDetail = this.buyerList.filter(item => item.buyerId === this.buyerId)[0]
        this.linkedBuyerList=this.buyerDetail.linkedBuyerList
        console.log('this.buyerDetail',this.buyerDetail.linkedBuyerList)
        // this.valueName=this.buyerDetail.buyerName
      },
      switchChange() {
        if(this.buyerDetail.state === '启用'){
          this.buyerDetail.state = '未启用'
        }else{
          this.buyerDetail.state = '启用'
        }
        console.log('this.buyerList' ,this.buyerList)
         uni.setStorageSync('buyerList', this.buyerList)
      }
    }
  }
</script>

<style lang="scss">
.page{
  background-color: #f4f5f7;
  padding: 20px 20px;
  .base{
    font-size: 14px;
    color: #949597;
    font-weight: 700;
    margin-bottom: 5px;
  }
  .info{
    height: 100px;
    background-color: #fff;
    border-radius: 10px;
    padding: 10px 20px;
    margin-bottom: 10px;
    .is-input-border{
      border: none;
    }
  }
  .remark{
    height: 100px;
    background-color: #fff;
    border-radius: 10px;
    padding: 10px 20px;
    margin-bottom: 10px;
  }
  .owe{
    height: 40px;
    background-color: #fff;
    border-radius: 10px;
    padding: 10px 20px 0px ;
    margin-bottom: 10px;
  }
  .prevent{
    height: 100px;
    background-color: #fff;
    border-radius: 10px;
    padding: 10px 20px 0px ;
    // margin-bottom: 80px;
  }
  .relevancy{
    width: 100%;
    height: 40px;
    background-color: #fff;
    margin-bottom: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #606266;
    font-size: 14px;
    .text{
      margin-left: 20px;
     
    }
  }
  .save{
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
