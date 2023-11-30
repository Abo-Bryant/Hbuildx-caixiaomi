<template>
  <!-- 销售单价 -->
  <view class="goods-price">
    <view class="price-unit">
      元/百斤
    </view>
    <view class="price-txet">销售单价</view>
   <view class="price-input">
     <uni-easyinput   v-model="valuePriceOne" :inputBorder="false" placeholder="请输入货品单价" :placeholderStyle="placeholderStyle" @input="input"></uni-easyinput>
     
   </view>
   
  </view>
</template>

<script>
  export default {
    props:{
      valuePrice:String
    },
    options: {
    			styleIsolation: 'shared', // 解除样式隔离
    		},
    name:"goods-price",
   mounted(){
      this.valuePriceOne=this.valuePrice
     // console.log('this.valueNameOne',this.valueNameOne,123)
     // console.log('this.valueName',this.valueName,123)
   },
    data() {
      return {
        // 货品名称placeholder的style
        placeholderStyle: "color:#96979b;font-size:16px;background-color:#f6f7fb;padding-left:10px;",
        // 货品销售单价
        valuePriceOne:this.valuePrice
      };
    },
    methods:{
      input(){
        this.$emit('changePrice',this.valuePriceOne)
      }
    }
  }
</script>

<style lang="scss">
 .goods-price {
        height: 50px;
        background-color: #fff;
        border-bottom: 1px solid #e6e6e6;
        display: flex;
        align-items: center;
        position: relative;
        .price-txet {
           margin-left: 20px;
          margin-right: 8px;
        }
        .price-input{
          .uni-easyinput__content-input{
            width: 230px;
          }
        }
        .price-unit{
          position: absolute;
          top: 15px;
          right: 25px;
          z-index:2;
        }
      }
</style>