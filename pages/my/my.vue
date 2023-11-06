<template>
  <view>
    我的刘博
  </view>
</template>

<script>
  export default {
    data() {
      return {
        
      };
    },
    onLoad(){
      this.getList()
    },
    methods:{
     async getList(){
       console.log('刘博')
       const {data:res} = await uni.$http.get('api/goods')
       console.log(res)
      }
    }
  }
  
</script>

<style lang="scss">

</style>
