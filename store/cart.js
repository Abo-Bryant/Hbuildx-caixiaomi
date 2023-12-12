export default {
  namespaced: true,
  state: () => ({
    cart: JSON.parse(uni.getStorageSync('cart') || '[]'),
    test: []
  }),

  getters: {
    totalPrice(state) {
      let newPrice = 0
      state.cart.forEach(item => newPrice += item.price * item.weightValue / 100)
      return newPrice.toFixed(0)
    },
    totalWeight(state) {
      let newWeight = 0
      state.cart.forEach(item => newWeight += item.weightValue)
      return newWeight
    }
  },

  mutations: {
    addToCart(state, payload) {
      // 根据提交的商品id,查询购物车里面是否存在这件商品
      const findResult = state.cart.find(item => item.id === payload.id && item.price === payload.price)
      if (!findResult) {
        state.cart.push(payload)
      } else {
        console.log('商品的重量相加')
        state.cart.forEach(item => {
          item.weightValue += payload.weightValue
        })
      }

      console.log(state.cart)
      this.commit('m_cart/saveToStorage')
    },
    echoCartData(state, payload) {
      // 根据提交的商品id,查询购物车里面是否存在这件商品
      const findResult = state.cart.find(item => item.id === payload.id && item.price === payload.price)
      if (!findResult) {
        state.cart.push(payload)
      } else {
        console.log('商品的重量相加')
        state.cart.forEach(item => {
          item.weightValue += payload.weightValue
        })
      }
    },
    delCart(state, payload) {
      state.cart = state.cart.filter((item, index) => index !== payload)
      this.commit('m_cart/saveToStorage')
    },
    updateCart(state, payload) {
      console.log(payload)
      state.cart.forEach(item => {
        if (item.id === payload.id) {
          item.price = payload.price
          item.weightValue = payload.weightValue
        }
      })
      this.commit('m_cart/saveToStorage')
    },
    clearCart(state, payload) {
      state.cart = payload
      this.commit('m_cart/saveToStorage')
    },
    saveToStorage(state) {
      uni.setStorageSync('cart', JSON.stringify(state.cart))
    }
  }
}