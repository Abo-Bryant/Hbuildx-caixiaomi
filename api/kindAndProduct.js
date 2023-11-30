  export const getKindListRequest = async ()=> {
        const { data: res } = await uni.$http.get('api/kinds')
        console.log('res',res)
       let list =  res.data.map(item => {
          return {
            name: item.attributes.title,
            id: item.id
          }
        })
        console.log('list',list)
         return list
      }