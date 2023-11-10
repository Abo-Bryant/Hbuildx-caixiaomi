<template>
  <view class="page">
    <!-- 货品名称 -->
    <goods-name :valueName="valueName" @changeName="doName"></goods-name>
    <!-- 包装类型 -->
    <view class="goods-type">
      <view class="type-txet">包装类型</view>
      <view class="type-button">
        <button v-for="(item, index) in goodsType" :key="index" @click="selectCate(index, item)"
          :class="{ active: index === currentIndex }" class="btn">{{ item }}</button>
      </view>
    </view>
    <!-- 销售规格 -->
    <goods-size :pikerValue="pikerValue" :valueWeight="valueWeight" v-if="currentIndex === 1" @changeWeight="doWeight"
      @changePiker="doPiker"></goods-size>
    <!-- 计数单位 -->
    <goods-tally v-if="currentIndex === 2" :tallyValue="tallyValue" @changeTally="doTally"></goods-tally>
    <!-- 销售单价 -->
    <goods-price :valuePrice="valuePrice" @changePrice="doPrice"></goods-price>
    <!-- 货品分类 -->
    <goods-classify :valueKind="valueKind" @changeKind="doKind" @changeKindId="doKindId"></goods-classify>
    <!-- 保存按钮 -->
    <view class="goods-save" @click="saveAdd">保存</view>
  </view>
</template>

<script>
  export default {
    options: {
      styleIsolation: 'shared', // 解除样式隔离
    },
    data() {
      return {
        // 货品名字
        valueName: '',
        // 货品分类的Id
        KindId: '',
        // 货品分类名字
        valueKind: '',
        // 货品的单价
        valuePrice: '',
        // 计数单位
        tallyValue: '',
        // 销售规格的value
        valueWeight: '',
        // 定装销售规格的下拉选择器的值
        pikerValue: '0',
        // 包装类型
        packagingType: '散装',
        // 包装类型
        goodsType: ['散装', '定装', '非定装'],
        // 控制包装类型的下标
        currentIndex: 0,
        // input的里层样式
        placeholderStyle: "color:#96979b;font-size:16px;background-color:#f6f7fb;padding-left:10px;",
        productList: [],
        kindList: []
      };
    },
    onLoad() {
      this.productList = uni.getStorageSync('productList')
      this.kindList = uni.getStorageSync('kindList')
    },
    methods: {
      selectCate(index, item) {
        console.log(index, item);
        // // 当前选中的是哪一项
        this.currentIndex = index;
        this.packagingType = item
      },
      doName(valueName) {
        console.log('打印', valueName)
        this.valueName = valueName
      },
      doKind(valueKind) {
        // console.log('打印',valueKind)
        this.valueKind = valueKind
      },
      doWeight(valueWeight) {
        this.valueWeight = valueWeight
      },
      doPiker(pikerValue) {
        console.log('打印', pikerValue)
        this.pikerValue = pikerValue
      },
      doPrice(valuePrice) {
        // console.log('打印',valuePrice)
        this.valuePrice = valuePrice
      },
      doTally(tallyValue) {
        console.log('打印', tallyValue)
        this.tallyValue = tallyValue
      },
      doKindId(KindId) {
        this.KindId = KindId
      },
      saveAdd() {
        console.log('货品分类的Id', this.KindId, '货品分类的名字', this.valueKind, '货品名字', this.valueName, '包装类型', this
          .packagingType, '货品的单价', this.valuePrice, '销售规格的input',
          this.valueWeight, '定装销售规格picker的值', this.pikerValue, '非定装销售规格picker的值', this.tallyValue);
        console.log(this.productList)
       let productIdList=this.productList.map(item => item.productId)
         console.log('productIdList',productIdList)
        productIdList=productIdList.map(Number)
        console.log('productIdList',productIdList);
        let productID=String(Math.max(...productIdList)+1)
        if(productID.length===1){
          productID='00'+productID
        }
        if(productID.length===2){
          productID='0'+productID
        }
        if(productID.length===3){
          productID=productID
        }
        this.productList = [...this.productList, {
          goodsName: this.valueName,
          kindId: this.KindId,
          packagingType: this.packagingType,
          price: this.valuePrice,
          productId: productID,
          size: this.pikerValue,
          sizeNum: this.valueWeight,
          tally: this.tallyValue,
          kindName: this.valueKind,
          state:'启用'
        }]
        uni.setStorageSync('productList', this.productList)
        uni.navigateBack({
          delta: 1
        });
      }
    }
  }
</script>

<style lang="scss">
  .page {
    background-color: #f4f5f7;
    height: 600px;
    // position: relative;

    .goods-type {
      background-color: #fff;
      padding: 10px 20px;
      border-top: 1px solid #e6e6e6;
      border-bottom: 1px solid #e6e6e6;

      .type-txet {
        margin-bottom: 10px;
      }

      .type-button {
        display: flex;

        .btn {
          width: 100px;
          height: 40px;
          border-radius: 20px;
          line-height: 40px;
          border: 1px solid #e7e7e7;
          background-color: #fff;
          font-size: 16px;

          &.active {
            background: #dbfee5;
            color: #239663;
            // border-radius: 8px;
            border: 1px solid #239663;
          }
        }
      }
    }


    .goods-save {
      text-align: center;
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 50px;
      line-height: 50px;
      background-color: #239663;
      font-size: 30px;
      color: #fff;
    }
  }
</style>