<template>
  <view class="page">
    <!-- 每一行列表 -->
    <view class="item" v-for="item in kindList" :key="item.kindId">
      <view class="item-name">{{item.goodsKind}}</view>
      <view class="item-put" @click="amend(item.goodsKind,item.kindId)">修改</view>
      <view class="item-del" @click="del(item.kindId)"><uni-icons type="trash" color="#fa5151" size="30"></uni-icons> </view>
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
        productList:[],
        // 修改时需要用到的Id
        amendId:'',
        // 删除时需要的Id
        delId:'',
        // 新增的value
        addValue:'',
        // 修改后的value
        amendValue:''
      };
    },
    onLoad(){
      this.getKindList()
      this.getProductList()
    },
    methods:{
      getKindList(){
        this.kindList = uni.getStorageSync('kindList')
        this.kindList = this.kindList.filter(item => item.goodsKind !== '未分类')
        console.log('kindList',this.kindList)
      },
      getProductList(){
        this.productList = uni.getStorageSync('productList')
      },
      // 点击修改按钮
      amend(goodsKind,kindId){
        this.amendId=kindId
        this.$refs.popupAmend.open()
        this.$refs.dialogInputRef.val=goodsKind
      },
      // 点击修改的取消
      amendCancel(){
         this.$refs.popupAmend.close()
      },
      // 点击修改的确认
      amendConfirm(value){
         this.amendValue = value
         this.$refs.popupAmend.close()
         this.kindList.forEach(item=>{
           console.log(item.kindId,this.amendId)
           if(item.kindId===this.amendId){
             item.goodsKind= this.amendValue
           }
         })
         uni.setStorageSync('kindList', this.kindList)
      },
      del(kindId){
        this.delId=kindId
        console.log('删除',kindId)
       let productKindIdList=this.productList.map(item => item.kindId)
         console.log('productKindIdList',productKindIdList)
       if(productKindIdList.includes(kindId)){
         console.log('显示删除弹出框')
         this.$refs.popupDel.open()
       }else{
         console.log('直接删除')
         this.kindList=this.kindList.filter(item=>item.kindId!==kindId)
         uni.setStorageSync('kindList', this.kindList)
         
       }
      },
      delClose(){
         this.$refs.popupDel.close()
      },
      delConfirm(){
        this.kindList=this.kindList.filter(item=>item.kindId!==this.delId)
        uni.setStorageSync('kindList', this.kindList)
        this.productList.forEach(item=>{
            console.log(item.kindId,this.delId)
          if(item.kindId===this.delId){
            item.kindId='0001'
          }
        })
        console.log('this.productList',this.productList)
         uni.setStorageSync('productList', this.productList)
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
      addConfirm(value) {
          this.addValue = value
          this.$refs.popup.close()
          this.$refs.dialogInputRef.val = ''
          let kindIdList = this.kindList.map(item => item.kindId)
          kindIdList=kindIdList.map(Number)
          // console.log('kindIdList',kindIdList);
          let kindID=String(Math.max(...kindIdList)+1)
          if(kindID.length===1){
            kindID='000'+kindID
          }
          if(kindID.length===2){
            kindID='00'+kindID
          }
          if(kindID.length===3){
            kindID='0'+kindID
          }
          if(kindID.length===4){
            kindID=kindID
          }
          this.kindList = [...this.kindList, {
            goodsKind: this.addValue,
            kindId: kindID
          }]
          console.log(this.kindList);
          uni.setStorageSync('kindList', this.kindList)
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
