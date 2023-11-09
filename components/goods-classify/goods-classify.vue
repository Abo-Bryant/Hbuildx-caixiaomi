<template>
  <view class="page">
    <!-- 货品分类 -->
    <view class="goods-classify" @click="doSelection">
      <view class="classify-txet">货品分类</view>
      <view class="classify-txettwo" ref="myInput">{{ goodsKindOne === '' ? '选择分类' : goodsKindOne }}</view>
      <view class="classify-icon">
        <!-- <u-icon v-if="selectIsShow" name="arrow-down-fill"></u-icon>
      <u-icon v-else name="arrow-up-fill"></u-icon> -->
        <uni-icons v-if="selectIsShow" type="bottom" size="30"></uni-icons>
        <uni-icons v-else type="top" size="30"></uni-icons>
      </view>
    </view>

    <!-- 货品分类的列表 -->
    <view class="classify-select" v-if="selectIsShow === false">
      <view class="select-btn active" @click="doAddManage">+新增分类</view>
      <view class="select-btn" v-for="item in kindList" @click="selectProductCategory(item.kindId, item.goodsKind)">{{
          item.goodsKind }}
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
      this.getProductKindList()
      
    },
    methods: {
      getProductKindList() {
        this.kindList = uni.getStorageSync('kindList')
        // this.goodsKind=this.kindName
        // console.log(this.goodsKind)
      },
      // 货品分类的展示与隐藏
      doSelection() {
        this.selectIsShow = !this.selectIsShow
      },
      // 选择分类
      selectProductCategory(kindId, goodsKind) {
        this.goodsKindOne = goodsKind
        this.selectIsShow = true
        this.$emit('changeKind',this.goodsKindOne)
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
      addConfirm(value) {
        this.addValue = value
        this.goodsKind = value
        this.$refs.popup.close()
        this.$refs.dialogInputRef.val = ''
        const kindIdList = this.kindList.map(item => item.kindId)
        console.log(kindIdList);
        this.kindList = [...this.kindList, {
          goodsKind: this.addValue,
          kindId: '000' + String(this.kindList.length + 1)
        }]
        console.log(this.kindList);
        uni.setStorageSync('kindList', this.kindList)
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