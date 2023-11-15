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