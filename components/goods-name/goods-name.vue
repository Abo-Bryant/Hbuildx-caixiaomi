<template>
 <!-- 货品名称 -->
 <view class="goods-name">
   <view class="name-txet">货品名称</view>
   <view>
     <uni-easyinput  :focus="true" v-model="valueNameOne"  :placeholderStyle="placeholderStyle"
       placeholder="请输入货品名称(必填)" @input="input"></uni-easyinput>
   </view>
 </view>
 
</template>

<script>
  export default {
    props:{
      valueName:String
    },
    mounted(){
       this.valueNameOne=this.valueName
      // console.log('this.valueNameOne',this.valueNameOne,123)
      // console.log('this.valueName',this.valueName,123)
    },
    name:"goods-name",
    data() {
      return {
        // 货品名称input的值
        valueNameOne:this.valueName,
        // valueName: '',
        // 货品名称placeholder的style
        placeholderStyle: "color:#96979b;font-size:16px;background-color:#f6f7fb;padding-left:10px;",
      };
    },
    methods:{
      input(){
        this.$emit('changeName',this.valueNameOne)
      }
    }
  }
</script>

<style lang="scss">
   .goods-name {
      border-top: 2px solid #e5e5e5;
      height: 90px;
      background-color: #fff;
      padding: 10px 20px;
      margin-bottom: 10px;
      .name-txet {
        margin-bottom: 10px;
      }
      .uni-easyinput__content-input{
        border: 2px solid #40af6d;
      }
    }

   
</style>