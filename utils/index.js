export function timestampToTime(time){
  let timestamp = Date.parse(new Date(time).toString());
   timestamp = timestamp ? timestamp : null;
   let date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
   let Y = date.getFullYear() + '-';
   let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
   let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
   let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
   let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
   let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
   return Y + M + D + h + m + s;
}
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
          console.log('点击了.')
          if (!decimalPoint.test(currentValue)) {
            console.log('添加.',currentValue+keyboardValue)
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
        return currentValue
      }
      
