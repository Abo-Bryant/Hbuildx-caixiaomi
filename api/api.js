// 获取分类
export const getKindListRequest = async () => {
  const {
    data: res
  } = await uni.$http.get('api/kinds')
  console.log('res', res)
  let list = res.data.map(item => {
    return {
      name: item.attributes.title,
      id: item.id
    }
  })
  console.log('list', list)
  return list
}
// 获取商品
export const getProductListRequest = async () => {
  const {
    data: res
  } = await uni.$http.get('api/products')
  let list = res.data.map(item => {
    return {
      id: item.id,
      ...item.attributes
    }
  })
  return list
}
// 获取全部买家数据列表
export const getBuyerListRequest = async () => {
    const {
      data: res
    } = await uni.$http.get('api/buyers')
    let list = res.data.map(item => {
      return {
        id: item.id,
        ...item.attributes
      }
    })
    return list
  }
  // 获取订单
  export const getOrderListRequest = async () => {
    const {
      data: res
    } = await uni.$http.get('api/orders')
    let list = res.data
    return list
  }