<template>
  <view class="page">
    <!-- 每一行列表 -->
    <view class="item" v-for="item in kindList" :key="item.id">
      <view class="item-name">{{item.name}}</view>
      <view class="item-put" @click="amend(item.name,item.id)">修改</view>
      <view class="item-del" @click="del(item.id)"><uni-icons type="trash" color="#fa5151" size="30"></uni-icons> </view>
    </view>
    <!-- 新增弹出框 -->
    <uni-popup ref="popup" type="dialog">
      <uni-popup-dialog ref="dialogInputRef" title='新增分类' placeholder='请输入分类名称' mode="input" message="成功消息"
        :duration="2000" :before-close="true" @close="addCancel" @confirm="addConfirm"></uni-popup-dialog>
    </uni-popup>
    <!-- 修改弹出框 -->
    <uni-popup ref="popupAmend" type="dialog">
      <uni-popup-dialog ref="dialogInputRef" title='新增分类' placeholder='请输入分类名称' mode="input" message="成功消息"
        :duration="2000" :before-close="true" @close="amendCancel" @confirm="amendConfirm"></uni-popup-dialog>
    </uni-popup>
    <!-- 删除弹出框 -->
    <uni-popup ref="popupDel" type="dialog">
      <uni-popup-dialog mode="base" content="确定要删除改分类吗？删除后,分类的货品将移至未分类中,确定要删除吗？" @close="delClose"
        @confirm="delConfirm"></uni-popup-dialog>
    </uni-popup>
  <!-- 新增按钮 -->
  <view class="add">
    <view class="add-btn" @click="add">
      新增分类
    </view>
  </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        // 货品分类列表
        kindList:[],
        // 修改时需要用到的Id
        amendId:'',
        // 删除时需要的Id
        delId:'',
        // 新增的value
        addValue:'',
        // 修改后的value
        amendValue:'',
        // 商品id集合
        productIdList:[]
      };
    },
    onLoad(){
      this.getKindList()
    },
    methods:{
      // 获取全部分类以及联合的商品
      async getKindList(){
        let params = {
          'populate[0]':'products'
        }
         const {data: res} = await uni.$http.get('api/kinds',params)
         console.log('res',res)
         this.kindList=res.data.map(item=>{
           return {
             name:item.attributes.title,
             id:item.id,
             products:item.attributes.products
           }
         })
         this.kindList = this.kindList.filter(item=>item.id!==13)
         console.log('this.kindList',this.kindList)
      },
      // 点击修改按钮
      amend(goodsKind,kindId){
        /*
        Args:
          goodsKind: 当前选中的分类的名字
          kindId: 当前选中的分类的Id
        */
        this.amendId=kindId
        this.$refs.popupAmend.open()
        this.$refs.dialogInputRef.val=goodsKind
      },
      // 点击修改的取消
      amendCancel(){
         this.$refs.popupAmend.close()
      },
      // 点击修改的确认
     async amendConfirm(value){
       /*
       Args:
         value: 修改弹出框的值
       */
      // 1.赋值
         this.amendValue = value
         // 2.发请求
         let data = {
           "data": {
             title:this.amendValue
           }
         }
          const {data: res} = await uni.$http.put(`api/kinds/${this.amendId}`,data)
          console.log(res)
          // 3.更新页面
          this.getKindList()
          // 4.关闭弹窗
         this.$refs.popupAmend.close()
      },
     // 点击删除的icon
     async del(kindId){
       /*
       Args:
         kindId: 当前选中的分类的Id
       */
      // 1.赋值
        this.delId=kindId
        // 2.发请求
        let params = {
          'populate[0]':'products'
        }
          const {data: res} = await uni.$http.get(`api/kinds/${kindId}`,params)
        // 3.获取当前分类所有商品的id
          this.productIdList = res.data.attributes.products.data.map(item=>{
            return item.id
          })
          // 4.判断 如果当前分类有商品的话 显示弹出框 
       if(res.data.attributes.products.data.length>0){
         console.log('显示删除弹出框')
         this.$refs.popupDel.open()
       }else{ // 否则直接删除
         console.log('直接删除')
         const {data: res} = await uni.$http.delete(`api/kinds/${this.delId}`)
         // 5.更新页面
         this.getKindList()
       }
      },
     // 点击删除弹出框的取消
      delClose(){
         this.$refs.popupDel.close()
      },
      // 点击删除弹出框的确认
     async delConfirm(){
        console.log('this.productIdList',this.productIdList)
         // 1.将当前分类的商品的关联id改为未分类的
        let data = {
          "data": {
            kind:13
          }
        }
        this.productIdList.forEach(async(item)=>{
           const {data: res} = await uni.$http.put(`api/products/${item}`,data)
           console.log('123456',res)
        })
        // 2.删除掉当前分类
        const {data: res} = await uni.$http.delete(`api/kinds/${this.delId}`)
        // 3.更新页面
        this.getKindList()
       
        
        
      },
      // 点击新增按钮
      add(){
        this.$refs.popup.open()
      },
      // 点击新增的取消
      addCancel() {
        this.$refs.popup.close()
        this.$refs.dialogInputRef.val = ''
      },
      // 点击新增的确认
      async addConfirm(value) {
        /*
        Args:
          value: 新增弹出框的值
        */
       // 1.赋值
          this.addValue = value
         // 2.发送请求
        let data ={
          "data": {
            title:value
          }
        }
         const {data: res} = await uni.$http.post('api/kinds',data)
         // 3.关闭弹窗
         this.$refs.popup.close()
         this.$refs.dialogInputRef.val = ''
         // 4.更新页面
         this.getKindList()
        },
    }
  }
</script>

<style lang="scss">
.page{
  .item{
    height: 50px;
    line-height: 50px;
    width: 100%;
    border-top: 1px solid #e6e6e6;
    border-bottom: 1px solid #e6e6e6;
    // padding: 0px 20px ;
    display: flex;
    justify-content: space-between;
    position: relative;
    .item-name{
      margin-left: 20px;
    }
    .item-put{
      position: absolute;
      right: 100px;
      top: 0px;
      color: #1d9d60;
    }
    .item-del{
      margin-right: 20px;
    }
  }
   .add{
     position: fixed;
     bottom: 0px;
     left: 0px;
     width: 100%;
     height: 80px;
     border-top: 1px solid #e6e6e6;
     background-color: #fff;
     display: flex;
     align-items: center;
     justify-content: center;
     .add-btn{
       width: 80%;
       height: 60px;
       line-height: 60px;
       border: 3px solid #279462;
       border-radius: 30px;
       color: #279462;
       font-size: 30px;
       text-align: center;
     }
   }
}
</style>
