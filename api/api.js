// 合计的金额取小数点两位,总数改成总件数,计算器小数点,下欠的范围改一改
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
          ...res.data.attributes,
          id:res.data.id
        }
        return detail
  }