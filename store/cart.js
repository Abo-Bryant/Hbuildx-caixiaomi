export default {
  namespaced:true,
  state:()=>({
    cart:JSON.parse(uni.getStorageSync('cart')||'[]')
  }),
  
  getters:{
    totalPrice(state){
      let newPrice = 0
      state.cart.forEach(item=>newPrice += item.price * item.weightValue / 100)
      return newPrice
    },
    totalWeight(state){
      let newWeight = 0
      state.cart.forEach(item=>newWeight += item.weightValue)
      return newWeight
    }
  },
  
  mutations:{
    addToCart(state,payload){
      state.cart.push(payload)
      console.log(state.cart)
      this.commit('m_cart/saveToStorage')
    },
    saveToStorage(state){
      uni.setStorageSync('cart',JSON.stringify(state.cart))
    }
  }
}