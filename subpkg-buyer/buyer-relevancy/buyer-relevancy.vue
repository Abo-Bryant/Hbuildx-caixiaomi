<template>
  <view class="page">

    <view class="relecancy-select" v-if="linkedBuyerList.length>0">
      <view class="text">已关联买家:</view>
      <view class="select" v-for="item in relecancyBuyerList">
        {{item.buyerName}}<uni-icons @click="disassociate(item.buyerId)" style="margin-left: 8px;" color="#fe4938"
          type="clear" size="16"></uni-icons>
      </view>

    </view>
    <view class="buyer" v-if="linkedBuyerList.length===0">
      暂无关联买家
    </view>
    <view class="need">
      选择需要关联的买家
    </view>
    <view class="item" v-for="item in buyerShowList">
      <view class="name">
        {{item.buyerName}}
      </view>
      <view class="xz" @click="choose(item.buyerId)">
        选择
      </view>
    </view>
    <uni-popup ref="popup" type="dialog">
      <uni-popup-dialog mode="base" title="温馨提示" content="确定与主买家关联吗?" @close="close"
        @confirm="confirm"></uni-popup-dialog>
    </uni-popup>
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
        delBuyerId:'',
        buyerId: '',
        buyerList: [],
        buyerDetail: {},
        linkedBuyerList: [],
        buyerShowList: [],
        relecancyBuyerId: '',
        showlist: []
      };
    },
    onLoad(option) {
      this.buyerId = option.buyerId
      this.getbuyerList()
      this.getBuyerDetail()
      this.getbuyerShowList()
    },
    onShow() {
      this.getbuyerList()
      this.getBuyerDetail()
      this.getbuyerShowList()
    },
    computed: {
      relecancyBuyerList() {
        let map = new Map()
        for (let item of this.buyerList) {
          if (!map.has(item.buyerId)) {
            map.set(item.buyerId, item)
          }
        }
        return [...map.values().filter(item => this.linkedBuyerList.includes(item.buyerId))]
      }
    },
    mounted() {
      // console.log('this.linklist',this.linklist.flat(Infinity))
      // console.log('this.relecancyBuyerList',this.relecancyBuyerList)
    },
    methods: {
      getbuyerList() {
        this.buyerList = uni.getStorageSync('buyerList')
        // console.log('this.buyerList',this.buyerList)
      },
      getBuyerDetail() {
        this.buyerDetail = this.buyerList.filter(item => item.buyerId === this.buyerId)[0]
        this.linkedBuyerList = this.buyerDetail.linkedBuyerList
        // console.log('this.buyerDetail',this.buyerDetail.linkedBuyerList)
        // this.valueName=this.buyerDetail.buyerName
      },
      getbuyerShowList() {
        this.showlist = uni.getStorageSync('showlist')
        this.buyerShowList = this.showlist.filter(item => item.linkedBuyerList.length < 1)
        console.log('this.buyerShowList', this.buyerShowList)
      },
      choose(buyerId) {
        this.relecancyBuyerId = buyerId
        console.log('buyerId', buyerId)
        this.$refs.popup.open()
      },
      close() {
        this.$refs.popup.close()
      },
      confirm() {

        // TODO 做一些其他的事情，手动执行 close 才会关闭对话框
        console.log('this.buyerId', this.buyerId, 'this.relecancyBuyerId', this.relecancyBuyerId)
        if (this.relecancyBuyerId === this.buyerId) {
          uni.showToast({
            title: '不能合并同一个买家',
            icon: 'none', //如果要纯文本，不要icon，将值设为'none'
            duration: 2000 //持续时间为 2秒
          })
        } else {
          // 不同的话就开始操作
          console.log('不同的话就开始操作')
          this.linkedBuyerList.push(this.relecancyBuyerId)
          console.log('this.buyerList', this.buyerList)
          uni.setStorageSync('buyerList', this.buyerList)
          this.showlist = this.showlist.filter(item => item.buyerId !== this.relecancyBuyerId)
          console.log('this.showlist123321', this.showlist)
          uni.setStorageSync('showlist', this.showlist)
          this.$refs.popup.close()
          uni.showToast({
            title: '关联成功',
            icon: 'none', //如果要纯文本，不要icon，将值设为'none'
            duration: 2000 //持续时间为 2秒
          })
          uni.reLaunch({
            url: `/subpkg-buyer/buyer-relevancy/buyer-relevancy?buyerId=${this.buyerId}`
          });
        }

      },
      disassociate(buyerId) {
        this.delBuyerId = buyerId
         console.log('buyerId', buyerId)
         this.$refs.popupDel.open()
      },
      closeDel() {
        this.$refs.popupDel.close()
      },
      confirmDel(){
        this.linkedBuyerList=this.linkedBuyerList.filter(item=>item!==this.delBuyerId )
        console.log('this.linkedBuyerList',this.linkedBuyerList)
        this.buyerList.forEach(item=>{
          if(item.buyerId===this.buyerId){
            item.linkedBuyerList=this.linkedBuyerList
          }
        })
        console.log('this.buyerList',this.buyerList)
        uni.setStorageSync('buyerList', this.buyerList)
        let arr = this.buyerList.filter(item=>item.buyerId===this.delBuyerId)
        console.log('确定',arr)
        this.showlist = [...this.showlist ,...arr]
         uni.setStorageSync('showlist', this.showlist)
         this.$refs.popupDel.close()
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