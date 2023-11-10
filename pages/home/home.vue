<template>
  <view>
    <view @click="test">
      点击
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        productList:['001','002','003','114']
      };
    },
    onLoad() {
    
    },
    methods:{
    
      test(){
       const a =  this.productList.includes('1111')
        console.log('this.productList',a)
      }
    }
  }
</script>

<style lang="scss">

</style>
