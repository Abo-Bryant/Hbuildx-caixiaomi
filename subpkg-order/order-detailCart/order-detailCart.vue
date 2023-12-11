<template>
  <view>
    <shop-cart :cart="cart" :buyerName="buyerName" :totalPrice="totalPrice" :totalWeight="totalWeight"></shop-cart>
  </view>
</template>

<script>
    import {getOrderDetailRequest} from '../../api/api.js'
      import {mapState,mapGetters,mapMutations} from 'vuex'
  export default {
    data() {
      return {
        orderDetail:{},
        buyerName:''
      };
    },
    onLoad(option) {
      console.log('orderId',option.orderId)
      this.orderId=option.orderId
      this.getOrderDetail()
    },
    onUnload(){
      this.clearCart([])
    },
    computed: {
            ...mapState('m_cart',['cart']),
            ...mapGetters('m_cart',['totalPrice','totalWeight']),
    
    },
    methods:{
       ...mapMutations('m_cart',['delCart','echoCartData','clearCart','addToCart']),
      async getOrderDetail(){
         this.orderDetail=await getOrderDetailRequest(this.orderId)
         console.log('this.orderDetail.productDetail',...this.orderDetail.productDetail)
         this.orderDetail.productDetail.forEach(item=>{
           this.addToCart(item)
         })
         // this.addToCart(...this.orderDetail.productDetail)
         this.buyerName=this.orderDetail.buyerDetail.attributes.name
      }
    }
  }
</script>

<style lang="scss">

</style>
