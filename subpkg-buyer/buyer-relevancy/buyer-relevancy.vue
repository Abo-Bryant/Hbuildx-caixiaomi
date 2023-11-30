<template>
  <view class="page">
    <!-- 展示已经关联的买家 -->
    <view class="relecancy-select" v-if="linkedBuyerList.length>0">
      <view class="text">已关联买家:</view>
      <view class="select" v-for="item in relecancyBuyerList">
        {{item.name}}<uni-icons @click="disassociate(item.id)" style="margin-left: 8px;" color="#fe4938" type="clear"
          size="16"></uni-icons>
      </view>
    </view>
    <view class="buyer" v-if="linkedBuyerList.length===0">
      暂无关联买家
    </view>
    <view class="need">
      选择需要关联的买家
    </view>
    <!-- 可以选择关联的买家 -->
    <view class="item" v-for="item in buyerShowList">
      <view class="name">
        {{item.name}}
      </view>
      <view class="xz" @click="choose(item.id)">
        选择
      </view>
    </view>
    <!-- 点击选择按钮后的弹出框 -->
    <uni-popup ref="popup" type="dialog">
      <uni-popup-dialog mode="base" title="温馨提示" content="确定与主买家关联吗?" @close="close"
        @confirm="confirm"></uni-popup-dialog>
    </uni-popup>
    <!-- 点击小叉叉后的弹出框 -->
    <uni-popup ref="popupDel" type="dialog">
      <uni-popup-dialog mode="base" title="温馨提示" content="确定要移出与主买家关联吗?" @close="closeDel"
        @confirm="confirmDel"></uni-popup-dialog>
    </uni-popup>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        // 删除关联买家的id
        delBuyerId: '',
        // 当前买家的id
        buyerId: '',
        // 全部买家
        buyerList: [],
        // 当前买家详情
        buyerDetail: {},
        // 与当前买家关联的买家id列表
        linkedBuyerList: [],
        // 关联买家的id
        relecancyBuyerId: '',
        // 有关联的买家列表
        relecancyBuyerList: []
      };
    },
    onLoad(option) {
      this.buyerId = +option.buyerId
      this.getBuyerDataList()
    },
    onShow() {
      this.getBuyerDataList()
    },
    computed: {
      // 可以选择关联的买家
      buyerShowList() {
        let linklist = this.buyerList.map(item => item.linkedBuyerList).flat(Infinity)
        this.buyerList.forEach(item => {
          item.isMainBuyer = !linklist.includes(item.id)
        })
        console.log('this.buyerList', this.buyerList)
        this.showlist = this.buyerList.filter(item => item.state !== false && item.isMainBuyer)
        return this.showlist.filter(item => item.linkedBuyerList.length < 1)
      },
    },
    methods: {
      // 获取数据
      async getBuyerDataList() {
        // 获取所有买家数据
        const {
          data: res
        } = await uni.$http.get('api/buyers')
        this.buyerList = res.data.map(item => {
          return {
            id: item.id,
            ...item.attributes
          }
        })
        // 获取当前买家的详情
        const {
          data: res1
        } = await uni.$http.get(`api/buyers/${this.buyerId}`)
        this.buyerDetail = res1.data
        this.linkedBuyerList = this.buyerDetail.attributes.linkedBuyerList
        // 找到有关联的买家
        let map = new Map()
        for (let item of this.buyerList) {
          if (!map.has(item.id)) {
            map.set(item.id, item)
          }
        }
        this.relecancyBuyerList = [...map.values().filter(item => this.linkedBuyerList.includes(item.id))]
      },
      // 点击选择按钮
      choose(buyerId) {
        /*
        Args:
          buyerId: 当前选择的买家的Id
        */
        this.relecancyBuyerId = buyerId
        this.$refs.popup.open()
      },
       // 选择弹出框的关闭按钮
      close() {
        this.$refs.popup.close()
      },
        // 选择弹出框的确认按钮
      async confirm() {
        // TODO 做一些其他的事情，手动执行 close 才会关闭对话框
        // 1.条件判断 如果是当前买家,不可关联
        if (this.relecancyBuyerId === +this.buyerId) {
          uni.showToast({
            title: '不能合并同一个买家',
            icon: 'none', //如果要纯文本，不要icon，将值设为'none'
            duration: 2000 //持续时间为 2秒
          })
        } else {
          // 2.不同的话就开始操作
          console.log('不同的话就开始操作')
          // 2.1.更新linkedBuyerList的数据
          this.linkedBuyerList.push(this.relecancyBuyerId)
          console.log('this.linkedBuyerList', this.linkedBuyerList)
          // 2.2.发送请求
          let data = {
            "data": {
              linkedBuyerList: this.linkedBuyerList
            }
          }
          const {
            data: res
          } = await uni.$http.put(`api/buyers/${this.buyerId}`, data)
          // 2.3.关闭popup窗口
          this.$refs.popup.close()
          // 2.4.轻提示
          uni.showToast({
            title: '关联成功',
            icon: 'none', //如果要纯文本，不要icon，将值设为'none'
            duration: 2000 //持续时间为 2秒
          })
          // 2.5.刷新页面
          uni.reLaunch({
            url: `/subpkg-buyer/buyer-relevancy/buyer-relevancy?buyerId=${this.buyerId}`
          });
        }

      },
      // 点击取消关联的 x(叉叉)
      disassociate(buyerId) {
        /*
        Args:
          buyerId: 当前选中的关联的买家的Id
        */
        this.delBuyerId = buyerId
        this.$refs.popupDel.open()
      },
      // 删除弹出框的关闭按钮
      closeDel() {
        this.$refs.popupDel.close()
      },
     // 删除弹出框的确认按钮
      async confirmDel() {
        // 1.更新linkedBuyerList的数据
        this.linkedBuyerList = this.linkedBuyerList.filter(item => item !== this.delBuyerId)
        console.log('this.linkedBuyerList', this.linkedBuyerList)
        // 2.发送请求
        let data = {
          "data": {
            linkedBuyerList: this.linkedBuyerList
          }
        }
        const {
          data: res
        } = await uni.$http.put(`api/buyers/${this.buyerId}`, data)
        // 3.关闭popup窗口
        this.$refs.popupDel.close()
        // 4.轻提示
        uni.showToast({
          title: '取消成功',
          icon: 'none', //如果要纯文本，不要icon，将值设为'none'
          duration: 2000 //持续时间为 2秒
        })
        // 5.刷新页面
        uni.reLaunch({
          url: `/subpkg-buyer/buyer-relevancy/buyer-relevancy?buyerId=${this.buyerId}`
        });
      }
    }


  }
</script>

<style lang="scss">
  .page {
    width: 100%;
    height: 600px;
    background-color: #f4f5f7;

    .buyer {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 30px;
      width: 100%;
      border-top: 1px solid #e2e2e2;
      border-bottom: 1px solid #e2e2e2;
      background-color: #fff;
      margin-bottom: 15px;
    }

    .relecancy-select {
      height: 70px;
      width: 100%;
      background-color: #fff;
      border-top: 1px solid #e2e2e2;
      border-bottom: 1px solid #e2e2e2;
      margin-bottom: 15px;
      padding: 10px 30px;
      display: flex;

      .text {
        margin-top: 5px;
        font-size: 12px;
        margin-right: 10px;
      }

      .select {
        background-color: #ededed;
        font-size: 12px;
        padding: 3px 8px;
        height: 15px;
        border-radius: 15px;
        margin-right: 10px;
      }
    }

    .need {
      height: 50px;
      width: 100%;
      line-height: 50px;
      padding-left: 20px;
      border-top: 1px solid #e2e2e2;
      border-bottom: 1px solid #e2e2e2;
      background-color: #fff;
      font-size: 20px;
      font-weight: 700;
    }

    .item {
      height: 50px;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #e2e2e2;
      background-color: #fff;

      .name {
        margin-left: 20px;
        font-size: 20px;
      }

      .xz {
        margin-right: 20px;
        font-size: 16px;
        color: #41a863;
      }
    }
  }
</style>