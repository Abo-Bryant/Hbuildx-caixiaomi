<template>
  <view class="page">
    <!-- 货品分类 -->
    <view class="goods-classify" @click="doSelection">
      <view class="classify-txet">货品分类</view>
      <view class="classify-txettwo" ref="myInput">{{ goodsKindOne === '' ? '选择分类' : goodsKindOne }}</view>
      <view class="classify-icon">
    
        <uni-icons v-if="selectIsShow" type="bottom" size="30"></uni-icons>
        <uni-icons v-else type="top" size="30"></uni-icons>
      </view>
    </view>

    <!-- 货品分类的列表 -->
    <view class="classify-select" v-if="selectIsShow === false">
      <view class="select-btn active" @click="doAddManage">+新增分类</view>
      <view class="select-btn" v-for="item in kindList" @click="selectProductCategory(item.id, item.name)">{{
          item.name }}
      </view>
    </view>

    <!-- 新增分类 -->
    <view class="goods-add">
      <uni-popup ref="popup" type="dialog">
        <uni-popup-dialog ref="dialogInputRef" title='新增分类' placeholder='请输入分类名称' mode="input" message="成功消息"
          :duration="2000" :before-close="true" @close="addCancel" @confirm="addConfirm"></uni-popup-dialog>
      </uni-popup>
    </view>
  </view>
</template>

<script>
    import {getKindListRequest} from '../../api/kindAndProduct.js'
  export default {
    props:{
      valueKind:String
    },
    name: "goods-classify",
    data() {
      return {
        // 货品分类是否展开
        selectIsShow: true,
        kindList: [],
        goodsKindOne: '',
        addValue: ''
      };
    },
    mounted(){
       this.goodsKindOne=this.valueKind
      // console.log('this.valueNameOne',this.valueNameOne,123)
      // console.log('this.valueName',this.valueName,123)
    },
    created() {
      this.getKindList()
      this.getProductList()
      
      
    },
    methods: {
     // async getKindList(){
     //    const {data: res} = await uni.$http.get('api/kinds')
     //    this.kindList=res.data.map(item=>{
     //      return {
     //        name:item.attributes.title,
     //        id:item.id
     //      }
     //    })
     // },
     async getKindList(){
       this.kindList = await getKindListRequest()
       console.log('this.kindList',this.kindList)
     },
     async getProductList(){
        const {data: res} = await uni.$http.get('api/products')
        this.productList = res.data.map(item=>{
          return {
            id:item.id,
           ...item.attributes
          }
        })
        },
      // 货品分类的展示与隐藏
      doSelection() {
        this.selectIsShow = !this.selectIsShow
      },
      // 选择分类
      selectProductCategory(kindId, name) {
        console.log(kindId, name)
        this.goodsKindOne = name
        this.selectIsShow = true
        this.$emit('changeKind',this.goodsKindOne)
        this.$emit('changeKindId',kindId)
      },
      // 新增分类
      doAddManage() {
        this.$refs.popup.open()
      },
      // 新增弹窗取消按钮
      addCancel() {
        this.$refs.popup.close()
        this.$refs.dialogInputRef.val = ''
      },
      // 新增弹窗确认按钮
     async addConfirm(value) {
        this.addValue = value
        this.goodsKind = value
        if(!value) return uni.$showMsg('请填写分类名称')
        let data ={
          "data": {
            title:value
          }
        }
         const {data: res} = await uni.$http.post('api/kinds',data)
         this.getKindList()
        this.$refs.popup.close()
        this.$refs.dialogInputRef.val = ''
        
      }
    }
  }
</script>

<style lang="scss">
  .page {
    .goods-classify {
      height: 50px;
      background-color: #fff;
      border-bottom: 1px solid #e6e6e6;
      display: flex;
      align-items: center;
      align-items: center;
      position: relative;

      .classify-txet {
        margin-left: 20px;
        margin-right: 10px;
      }

      .classify-txettwo {
        color: #979797;
      }

      .classify-icon {
        position: absolute;
        right: 20px;
        top: 10px;
        // margin-right: 20px;
      }
    }

    .classify-select {
      background-color: #fff;
      padding: 10px 20px;
      border-bottom: 1px solid #e6e6e6;
      display: flex;
      flex-wrap: wrap;


      .select-btn {
        padding: 0px 25px;
        // width: 80px;
        height: 30px;
        line-height: 30px;
        border-radius: 20px;
        border: 1px solid #b3b3b3;
        margin-right: 20px;
        margin-bottom: 20px;

        &.active {
          color: #239663;
          border: 1px solid #239663;
        }
      }
    }
  }
</style>