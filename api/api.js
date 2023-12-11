import {timestampToTime}  from '../utils/index.js'
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
  // 获取订单详情
  export const getOrderDetailRequest = async (id) => {
    const {
      data: res
    } = await uni.$http.get(`api/orders/${id}`)
   let detail ={
     createdAt:timestampToTime(res.data.attributes.createdAt),
     updatedAt:timestampToTime(res.data.attributes.updatedAt),
     productDetail:res.data.attributes.productDetail,
     buyerDetail:res.data.attributes.buyerDetail,
     orderInfo:res.data.attributes.orderInfo,
     userDetail:res.data.attributes.userDetail,
     // ...item.attributes,
     id:res.data.id
          // ...res.data.attributes,
          // id:res.data.id
        }
        return detail
  }