<template>
<view class="tally">
  <view class="goods-tally"  @click="tallyShow = !tallyShow">
    <view class="tally-txet">计数单位</view>
    <view class="tally-txettwo">{{tallyValueOne?tallyValueOne:'件'}}</view>
    <uni-icons v-if="tallyShow===false" type="bottom" size="30"></uni-icons>
    <uni-icons v-else type="top" size="30"></uni-icons>
  </view>
  <view class="tally-select" v-if="tallyShow===true">
    <view class="tally-select-text" v-for="item in range" :key="item.value" @click="doit(item.text)">
      {{item.text}}
    </view>
  </view>
  
</view>
</template>

<script>
  export default {
    props:{
      tallyValue:String
    },
    name:"goods-tally",
    data() {
      return {
        // 控制计数单位的下拉框显示与隐藏
        tallyShow:false,
        tallyValueOne:'',
        range: [{
            value: '0',
            text: "件"
          },
          {
            value: '1',
            text: "罐"
          },
          {
            value: '2',
            text: "箱"
          },
          {
            value: '3',
            text: "瓶"
          },
          {
            value: '4',
            text: "盒"
          },
          {
            value: '5',
            text: "袋"
          },
          {
            value: '6',
            text: "包"
          },
        ],
                
      };
    },
    mounted(){
       this.tallyValueOne=this.tallyValue
      console.log('this.tallyValueOne',this.tallyValueOne,123)
      console.log('this.tallyValue',this.tallyValue,123)
    },
    methods:{
      doit(text){
        this.tallyValueOne=text
        this.tallyShow=false
        this.$emit('changeTally',this.tallyValueOne)
      },
    }
  }
</script>

<style lang="scss">
  .tally{
    .goods-tally {
        height: 50px;
        background-color: #fff;
        border-bottom: 1px solid #e6e6e6;
        display: flex;
        align-items: center;
    
        .tally-txet {
          margin-left: 20px;
          margin-right: 18px;
        }
    
        .tally-txettwo {
          color: #000;
          font-size: 18px;
          font-weight: 500;
          margin-right: 205px;
        }
      }
      
      
      .tally-select{
        .tally-select-text{
          width: 100%;
          height: 50px;
          background-color: #fff;
          border-bottom: 1px solid #e6e6e6;
          line-height: 50px;
          text-align: center;
        }
      }
    
  }
</style>