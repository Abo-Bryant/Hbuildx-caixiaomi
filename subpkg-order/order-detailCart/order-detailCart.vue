<template>
  <view>
    <shop-cart :orderId="orderId"  :cart="cart" :buyerId="buyerId" :buyerName="buyerName" :totalPrice="totalPrice" :totalWeight="totalWeight"></shop-cart>
  </view>
</template>

<script>
    import {getOrderDetailRequest} from '../../api/api.js'
      import {mapState,mapGetters,mapMutations} from 'vuex'
  export default {
    data() {
      return {
        orderDetail:{},
        buyerName:'',
         buyerId:0,
        orderId:0
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
         console.log('this.orderDetail.productDetail',this.orderDetail)
         // this.orderDetail.productDetail.forEach(item=>{
         //   this.addToCart(item)
         // })
         if(this.cart.length===0){
           this.clearCart(this.orderDetail.productDetail)
         }
         if(this.cart.length>0){
           this.clearCart(this.cart)
         }
         this.buyerName=this.orderDetail.buyerDetail.attributes.name
         this.buyerId=this.orderDetail.buyerDetail.id
      }
    }
  }
</script>

<style lang="scss">

</style>
