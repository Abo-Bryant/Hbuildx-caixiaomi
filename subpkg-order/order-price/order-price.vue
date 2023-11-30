<template>
  <view class="page">
    <view class="top">
      <view class="name">
        {{productDetail.name}}
      </view>
      <view class="type" v-if="productDetail.packageType==='sanzhuang'">
        散装
      </view>
      <view class="type" v-if="productDetail.packageType==='dingzhuang'">
        定装
      </view>
      <view class="type" v-if="productDetail.packageType==='feidingzhuang'">
        非定装
      </view>
    </view>
    <view class="bottom">
      <view class="weight" @click="currentIndex=true" :class="{active:currentIndex===true}">
        <view class="text">
          重量（斤）
        </view>
        <view class="num">
          {{weightValue}}
        </view>
      </view>

      <view class="price" :class="{active:currentIndex===false}" @click="currentIndex=false">
        <view class="text">
          单价（元/百斤）
        </view>
        <view class="num">
          {{productDetail.price}}
        </view>
      </view>
    </view>
    <view class="lastprice">
       上次售价
     </view>
    <view class="key-words">
      <key-words @change="handleChange" ref="keyboard"></key-words>
      <view class="text-item">
        <view class="outsideone" @click="next">
          <view class="top-next">
            下一项
          </view>
        </view>
        <view class="outsidetwo" @click="back">
          <view class="bottom-sure">
            确认
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import {updateKeyboardValue} from '../../utils/index.js'
  export default {
    onLoad(option) {
      // console.log(option)
      this.productId = option.productId
      this.orderId = option.orderId
      this.getProductDetail()
      // this.getOrderProductDetail()
    },
    data() {
      return {
        currentIndex: true,
        orderId:'',
        orderDetail:{},
        productId:'',
        productDetail:{},
        weightValue: '0'
      };
    },
    methods: {
     async getProductDetail() {
       if(this.productId!==undefined){
         let params = {
           'populate[0]': 'kind'
         }
         const {
           data: res
         } = await uni.$http.get(`api/products/${ this.productId}`, params)
         // console.log('res.data',res.data)
         this.productDetail = {...res.data.attributes,id:res.data.id}
         // console.log('this.productDetail',this.productDetail)
       }else if(this.orderId!==undefined){
         console.log('123')
         const {
           data: res
         } = await uni.$http.get(`api/orders/${this.orderId}`)
         // console.log('res.data',res.data)
         this.productDetail = res.data.attributes.productDetail
         this.weightValue=this.productDetail.weightValue
         
         // console.log('this.productDetail',this.productDetail)
       }
     },
      next() {
        this.currentIndex=!this.currentIndex
      },
      async back(){
        if(this.productId!==undefined){
          let data ={
            "data": {
             productDetail:{
                ...this.productDetail,
               weightValue:+this.weightValue,
             }
            }
          }
           const {data: res} = await uni.$http.post('api/orders',data)
           // console.log(res)
           uni.$showMsg('加入购物车')
          uni.navigateBack({
            delta: 1
          })
        }else if(this.orderId!==undefined){
          console.log('修改',this.productDetail,+this.weightValue)
          let data = {
            "data": {
                productDetail: {
                  ...this.productDetail,
                  weightValue:+this.weightValue,
                }
              }
          }
           const {data: res} = await uni.$http.put(`api/orders/${ this.orderId}`,data)
           console.log('res',res)
           uni.$showMsg('修改成功')
           uni.navigateBack({
             delta: 1
           })
        }
         // console.log( this.weightValue, this.priceValue,this.name)
        
       },
      
      handleChange(e) {
        // console.log('e', )
        if (this.currentIndex === true) {
          this.weightValue = updateKeyboardValue(this.weightValue.toString(), e)
        } else {
          this.productDetail.price = updateKeyboardValue(this.productDetail.price.toString(), e)
        }
      },
    }
  }
</script>

<style lang="scss">
  .page {
    .top {
      width: 100%;
      height: 60px;
      display: flex;
      border-bottom: 1px solid #bfc0c1;

      .name {
        margin-left: 20px;
        font-weight: 700;
        font-size: 28px;
      }

      .type {
        text-align: center;
        display: inline-block;
        width: 50px;
        height: 20px;
        margin-left: 20px;
        background-color: #daf5fe;
        color: #4a7caa;
        margin-top: 10px;
      }
    }

    .bottom {
      padding: 10px 10px 10px 20px;
      display: flex;

      .price {
        margin-right: 10px;
        width: 50%;
        height: 80px;
        background-color: #ebeffa;
        border-radius: 5px;
        border: 2px solid #d1d5e1;

        .num {
          margin-right: 10px;
          text-align: right;
          font-size: 25px;
          font-weight: 700;
        }

        .text {
          margin: 8px 0 12px 15px;
        }

        &.active {
          background-color: #c6e6d7;
          border: 1px solid #239663;
        }
      }

      .weight {
        margin-right: 10px;
        width: 50%;
        height: 80px;
        background-color: #ebeffa;
        border-radius: 5px;
        border: 2px solid #d1d5e1;

        .num {
          margin-right: 10px;
          text-align: right;
          font-size: 25px;
          font-weight: 700;
        }

        .text {
          margin: 8px 0 12px 15px;
        }

        &.active {
          background-color: #c6e6d7;
          border: 1px solid #239663;
        }
      }
    }
 .lastprice {
      height: 50px;
      line-height: 50px;
      padding-left: 20px;
      background-color: #e4e8f1;
      margin-top: 140px;
      font-size: 16px;
      // font-weight: 700;
    }
    .key-words {
      width: 100%;
      position: fixed;
      bottom: 0;
      display: flex;

      .text-item {
        flex: 1;
        // padding-top: 50px;
        background-color: #e4e8f1;

        .outsideone {
          margin-right: 10px;
          margin-bottom: 10px;
          height: 110px;
          background-color: #4065ac;
          border-radius: 8px;

          .top-next {
            border-radius: 5px;
            background: linear-gradient(#4584da, #5c91f0);
            height: 104px;
            line-height: 104px;
            text-align: center;
            font-size: 22px;
            font-weight: 700;
            color: #fff;

          }
        }

        .outsidetwo {
          margin-right: 10px;
          margin-bottom: 10px;
          height: 110px;
          background-color: #038839;
          border-radius: 8px;

          .bottom-sure {
            border-radius: 5px;
            background: linear-gradient(#03a345, #03bf55);
            height: 104px;
            line-height: 104px;
            text-align: center;
            font-size: 22px;
            font-weight: 700;
            color: #fff;

          }
        }
      }
    }
  }
</style>