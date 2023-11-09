<template>
  <!-- 销售规格 -->
  <view class="goods-size" >
    <view class="size-unit">
      <view class="">
        元/
      </view>
      <view class="size-select">
        <uni-data-select style="z-index: 100;" v-model="pikerValueOne" :localdata="range"
          @change="change"></uni-data-select>
      </view>
    </view>
    <view class="size-txet">销售规格</view>
    <view class="price-input">
      <uni-easyinput v-model="valueWeightOne" :inputBorder="false" :placeholderStyle="placeholderStyle"
        placeholder="请输入货品规格" @input="input"></uni-easyinput>
    </view>
  </view>
  
</template>

<script>
  export default {
    props:{
      pikerValue:String,
      valueWeight:String
    },
    options: {
    			styleIsolation: 'shared', // 解除样式隔离
    		},
    name:"goods-size",
    data() {
      return {
        // 销售规格的value
        valueWeightOne: '',
        // 定装销售规格的下拉选择器的值
        pikerValueOne: '0',
         // input的里层样式
             placeholderStyle: "color:#96979b;font-size:16px;background-color:#f6f7fb;padding-left:10px;",
        // 下拉选择器里面的数据
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
       this.pikerValueOne=this.pikerValue
       this.valueWeightOne=this.valueWeight
      console.log('this.valueWeight',this.valueWeight,123)
      console.log('this.valueWeightOne',this.valueWeightOne,123)
    },
    methods:{
      change(e) {
        console.log("e:", e);
        this.pikerValueOne=e
        this.$emit('changePiker',this.pikerValueOne)
      },
      input() {
        this.$emit('changeWeight',this.valueWeightOne)
      },
    }
  }
</script>

<style lang="scss">
  .goods-size {
      height: 50px;
      background-color: #fff;
      border-bottom: 1px solid #e6e6e6;
      display: flex;
      align-items: center;
      position: relative;

      .size-txet {
        margin-left: 20px;
        // margin-right: 8px;
      }

      .price-input {
       ::v-deep .uni-easyinput__content-input {
          width: 150px;
        }
        .content-clear-icon{
          display: none;
        }
      }

      .size-unit {
        position: absolute;
        top: 15px;
        right: 25px;
        z-index: 99;
        display: flex;
        justify-content: center;

        .size-select {
          margin-bottom: 5px;
          font-size: 16px;

          .uni-select {
            border: none;

            .uni-select__input-box {
              height: 32px;
              align-items: stretch;
            }
          }
        }

      }

    }

</style>