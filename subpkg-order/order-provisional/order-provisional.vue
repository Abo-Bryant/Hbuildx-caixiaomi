<template>
  <view class="page">
    <view class="">
      <!-- 上部分数据展示 -->
      <view class="m-category">
        <!-- 左侧导航 -->
        <scroll-view scroll-y class="left">
          <view class="item" v-for="(item, index) in leftList" :key="item.id"
            @click="selectProductCategory(index, item.id)" :class="{ active: index === currentIndex }">{{ item.name
                   }} </view>
          <view class="addkind" @click="add">
            新增分类
          </view>
        </scroll-view>
        <!-- 右侧展示数据列表 -->
        <scroll-view scroll-y class="right">
          <uni-search-bar :radius="18" bgColor="#fff" @confirm="search" @input="input"></uni-search-bar>
          <view class="cell">
            <navigator class="cell-item" :url="`/subpkg-order/order-price/order-price?productId=${item.id}`"
              v-for="item in productShowList" :key="item.id">
              <view class="item-text">
                {{item.name}}
              </view>
              <view class="item-type" v-if="item.packageType==='sanzhuang'">
                散装
              </view>
              <view class="item-type" v-if="item.packageType==='dingzhuang'">
                定装
              </view>
              <view class="item-type" v-if="item.packageType==='feidingzhuang'">
                非定装
              </view>
              <view class="kindtype">
                肉
              </view>
            </navigator>
          </view>
          <navigator class="addProduct" :url="`/subpkg/product-add/product-add`">
            新增货品
          </navigator>
        </scroll-view>
      </view>
      <!-- 下部分按钮 -->
      <navigator class="bottom" :url="`/subpkg-order/order-shopping/order-shopping`">
        <view class="total">
          合计: {{totalPrice}} 元
        </view>
        <view class="true">
          <view class="true-text">({{cart.length}}种)选好了</view>
          <view class="arrow">
            <uni-icons color="#e1e1e1" type="forward" size="30"></uni-icons>
          </view>
        </view>
      </navigator>
    </view>
    <!-- 新增弹出框 -->
    <uni-popup ref="popup" type="dialog">
      <uni-popup-dialog ref="dialogInputRef" title='新增分类' placeholder='请输入分类名称' mode="input" message="成功消息"
        :duration="2000" :before-close="true" @close="addCancel" @confirm="addConfirm"></uni-popup-dialog>
    </uni-popup>
  </view>
</template>

<script>
  import {mapState,mapGetters} from 'vuex'
  import {
    getKindListRequest,
    getProductListRequest,
    // getOrderListRequest
  } from '../../api/api.js'
  export default {
    options: {
      styleIsolation: 'shared', // 解除样式隔离
    },
    data() {
      return {
        // 所有货品的信息
        productList: [],
        // 所有的分类信息
        kindList: [],
        // 右侧货品展示列表
        productShowList: [],
        // 选中的下标
        currentIndex: 0,
        // 订单列表
        orderList: []
      };
    },
    onLoad() {
      this.getKindList()
      this.getProductList()
      // this.getOrderList()
    },
    onShow() {
      this.currentIndex = 0
      this.getKindList()
      this.getProductList()
      // this.getOrderList()
    },
    computed: {
      ...mapState('m_cart',['cart']),
      ...mapGetters('m_cart',['totalPrice']),
      // 计算属性是函数， 但是在模板html上面是当做属性去用，不能加小括号
      leftList() {
        this.kindList = this.kindList.filter(item => item.name !== '未分类')
        return [{
          name: '全部分类',
          id: 0
        }, ...this.kindList]
      },
      // totalPrice() {
      //   let newPrice = 0
      //   this.orderList.forEach(item => {
      //     newPrice += item.attributes.productDetail.price * item.attributes.productDetail.weightValue / 100
      //   })
      //   return newPrice
      // },
    },
    methods: {
      // 获取分类
      async getKindList() {
        this.kindList = await getKindListRequest()
        console.log('this.kindList', this.kindList)
      },
      // 获取商品
      async getProductList() {
        this.productList = await getProductListRequest()
        this.productShowList = this.productList
      },
      async selectProductCategory(index, kindId) {
        /* 
        Args:
          index: 当前选中的分类的导航的下标
          kindId: 当前选中的分类的Id
        */
        if (kindId === 0) { //0表示全部商品的id
          this.productShowList = this.productList
        } else {
          let params = {
            'populate[0]': 'products'
          }
          const {
            data: res
          } = await uni.$http.get(`api/kinds/${kindId}`, params)
          // 请求出错的提示
          if(res.data===null) return uni.$showMsg(res.error.message)
          this.productShowList = res.data.attributes.products.data.map(item => {
            return {
              id: item.id,
              ...item.attributes
            }
          })
        }
        this.currentIndex = index;
      },
      // 点击新增按钮
      add() {
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
        let data = {
          "data": {
            title: value
          }
        }
        const {
          data: res
        } = await uni.$http.post('api/kinds', data)
        // 请求出错的提示
        if(res.data===null) return uni.$showMsg(res.error.message)
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
  .page {
    height: 100%;
    position: relative;

    .m-category {
      display: flex;
      height: calc(90vh - 44px);

      .left {
        // position: relative;
        // height: 100%;
        margin-bottom: 20px;
        width: 80px;
        font-size: 15px;
        text-align: center;
        background-color: #1d9d60;
        border-radius: 0 15px 0 0;

        .item {
          margin-top: 20px;
          padding: 40rpx 20rpx;
          font-weight: 700;
          color: #fff;
          // margin-bottom: 100px;

          // border-radius: 8px;
          &.active {
            background: #fff;
            color: #1d9d60;
            border-radius: 8px;
          }
        }

        .addkind {
          position: fixed;
          bottom: 64px;
          left: 0;
          width: 80px;
          height: 60px;
          line-height: 60px;
          text-align: center;
          color: #fff;
          background-color: #20be74;
          border-radius: 0 0 15px 0;
        }
      }

      .right {
        height: 100%;
        background-color: #fff;
        flex: 1;

        ::v-deep .uni-searchbar__box {
          border: 1px solid #20be74;
        }

        .addProduct {
          margin-left: 70px;
          width: 150px;
          height: 50px;
          line-height: 50px;
          text-align: center;
          font-size: 28px;
          color: #1d9d60;
          border: 1px solid #1d9d60;
          border-radius: 30px;
        }

        .cell {
          background-color: #fff;
          width: 100%;
          display: flex;
          flex-wrap: wrap;

          .cell-item {
            margin-left: 10px;
            margin-bottom: 10px;
            height: 100px;
            width: 45%;
            background-color: #f4f5f7;
            border-radius: 10px;

            .item-text {
              font-weight: 700;
              margin-left: 10px;
              padding-top: 10px;
              margin-bottom: 15px;
            }

            .item-type {
              text-align: center;
              display: inline-block;
              width: 50px;
              height: 20px;
              margin-left: 10px;
              background-color: #daf5fe;
              color: #4a7caa;
              margin-bottom: 10px;
            }

            .kindtype {
              margin-left: 10px;
              font-size: 14px;
            }
          }
        }

      }
    }

    .bottom {
      height: 50px;
      width: 98%;
      background-color: #1d9d60;
      position: absolute;
      bottom: -104px;
      border-radius: 0 50px 50px 0;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .total {
        margin-left: 20px;
        color: #fff;
        font-size: 20px;
        font-weight: 700;
      }

      .true {
        display: flex;
        align-items: center;

        .true-text {
          color: #fff;
          font-size: 16px;
          font-weight: 700;
        }
      }
    }

  }
</style>