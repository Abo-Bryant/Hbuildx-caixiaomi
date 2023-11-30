export function transformListToTree (list, rootId) {
  const arr = []
  list.forEach(item => {
    if (item.pid === rootId) {
      const children = transformListToTree(list, item.id)
      if (children.length > 0) {
        item.children = children
      }

      arr.push(item)
    }
  })
  return arr
}
export function updateKeyboardValue(currentValue, keyboardValue) {
        // if(keyboardValue==='next')
        const decimalPoint = /\./g // 小数点正则
        if (keyboardValue === '-1') {
          if (currentValue === '0') {
            uni.$showMsg('不能删除了')
          }
          if (currentValue.length === 1) {
            // console.log('将数据变成0')
            currentValue = '0'
          }
          if (currentValue.length > 1) {
            // console.log('删掉一位')
            currentValue = currentValue.slice(0, -1)
          }
        } else if (keyboardValue === ".") {
          // console.log('点击了.')
          if (!decimalPoint.test(currentValue)) {
            // console.log('添加.')
            currentValue += keyboardValue
          } else {
            uni.$showMsg('只允许输入一个.')
          }
        } else {
          if (currentValue === '0') {
            currentValue = keyboardValue
          } else {
            currentValue += keyboardValue
          }
        }
        return +currentValue
      }
      
// export const selectProductCategoryTool = async (index,kindId)=>{
//   /*
//   Args:
//     index: 当前选中的分类的导航的下标
//     kindId: 当前选中的分类的Id
//   */
//   if (kindId === 0) { //0表示全部商品的id
//     this.productShowList = this.productList
//   } else {
//     let params = {
//       'populate[0]': 'products'
//     }
//     const {
//       data: res
//     } = await uni.$http.get(`api/kinds/${kindId}`, params)
//     this.productShowList = res.data.attributes.products.data.map(item => {
//       return {
//         id: item.id,
//         ...item.attributes
//       }
//     })
//   }
//   this.currentIndex = index;
// }