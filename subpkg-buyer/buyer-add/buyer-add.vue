<template>
<view class="page">
		<uni-forms ref="form" :modelValue="formData" :rules="rules" >
      
      <view class="base">基本信息</view>
      
			<view class="info">
			  <uni-forms-item label="买家姓名" name="name">
			  	<uni-easyinput type="text" v-model="formData.name" placeholder="请输入买家姓名" />
			  </uni-forms-item>
			  <uni-forms-item label="电话" name="mobile">
          <uni-easyinput type="text" v-model="formData.mobile" placeholder="录入手机号买家可获取账单推送" />
			  </uni-forms-item>
			</view>
      
      <view class="remark">
        <uni-forms-item label="备注" name="remark" >
        	<uni-easyinput type="textarea" autoHeight v-model="formData.remark" placeholder="请输入内容"></uni-easyinput>
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
       </view>
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
 			// 表单数据
 			formData: {
 				name: '',
 				mobile: '',
        remark:'',
 			},
      buyerList:[],
 			rules: {
 				// 对name字段进行必填验证
 				name: {
 					rules: [{
 							required: true,
 							errorMessage: '请输入姓名',
 						},
 						{
 							minLength: 0,
 							maxLength: 5,
 							errorMessage: '姓名长度在 {minLength} 到 {maxLength} 个字符',
 						}
 					]
 				},
 				// 对mobile字段进行必填验证
 				mobile: {
 					rules: [{
 						required: true,
 						errorMessage: '请输入电话号码',
 					}]
 				}
 			}
 		}
 	},
  onLoad() {
    this.getBuyerList()
  },
 	methods: {
    getBuyerList(){
      this.buyerList = uni.getStorageSync('buyerList')
    },
 		/**
 		 * 复写 binddata 方法，如果只是为了校验，无复杂自定义操作，可忽略此方法
 		 * @param {String} name 字段名称
 		 * @param {String} value 表单域的值
 		 */
 		// binddata(name,value){
 		// 通过 input 事件设置表单指定 name 的值
 		//   this.$refs.form.setValue(name, value)
 		// },
 		// 触发提交表单
 		submit() {
 			this.$refs.form.validate().then(res=>{
 				console.log('表单数据信息：', res);
        let buyerIdList=this.buyerList.map(item => item.buyerId)
          console.log('buyerIdList',buyerIdList)
         buyerIdList=buyerIdList.map(Number)
         console.log('buyerIdList',buyerIdList);
         let buyerId=String(Math.max(...buyerIdList)+1)
         if(buyerId.length===1){
           buyerId='000'+buyerId
         }
         if(buyerId.length===2){
           buyerId='00'+buyerId
         }
         if(buyerId.length===3){
           buyerId='0'+buyerId
         }
         if(buyerId.length===4){
           buyerId=buyerId
         }
        this.buyerList=[... this.buyerList,{
          buyerId:buyerId,
          buyerMobile:this.formData.mobile,
          buyerName:this.formData.name,
          state:'启用',
          remark:this.formData.remark
        }]
        console.log('this.buyerList',this.buyerList)
         uni.setStorageSync('buyerList', this.buyerList)
 			}).catch(err =>{
 				console.log('表单错误信息：', err);
 			})
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
    height: 40px;
    background-color: #fff;
    border-radius: 10px;
    padding: 10px 20px 0px ;
    margin-bottom: 80px;
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
