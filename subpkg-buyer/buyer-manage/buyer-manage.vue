<template>
  <view class="page">
    <!-- 搜索框 -->
    <view class="search">
      <uni-search-bar @confirm="search" @input="input" placeholder="请输入买家姓名或电话"></uni-search-bar>
    </view>
    <!-- 统计多少买家 -->
    <view class="all-buyer">
      <view class="text">
        共{{stoplist.length+showlist.length}}个买家
      </view>
    </view>
    <!-- 展示列表 -->
    <navigator :url="`/subpkg-buyer/buyer-detail/buyer-detail?buyerId=${item.id}`" class="buyer-item"
      v-for="item in showlist" :key="item.id">
      <view class="name">{{item.name}}</view>
      <view class="mobile">{{item.mobile}}</view>
    </navigator>
    <!-- 停用列表 -->
    <navigator style="color:#bfbfbf ;" class="buyer-item"
      :url="`/subpkg-buyer/buyer-detail/buyer-detail?buyerId=${item.id}`" v-for="item in stoplist" :key="item.id">
      <view class="name">{{item.name}} <text style="font-weight: normal;margin-left: 10px;">已停用</text></view>
      <view class="mobile">{{item.name}}</view>
    </navigator>

    <view class="add">
      <navigator :url="'/subpkg-buyer/buyer-add/buyer-add'" class="btn">
        添加买家
      </navigator>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        // 全部买家数据列表
        buyerList: []
      };
    },
    onLoad() {
      this.getBuyerList()
    },
    onShow() {
      this.getBuyerList()
    },
    computed: {
      // 展示的停用的买家列表
      stoplist() {
        return this.buyerList.filter(item => item.state === false)
      },
      // 展示的开启的买家列表
      showlist() {
        let linklist = this.buyerList.map(item => item.linkedBuyerList).flat(Infinity)
        this.buyerList.forEach(item => {
          item.isMainBuyer = !linklist.includes(item.id)
        })
        return this.buyerList.filter(item => item.state !== false && item.isMainBuyer)

      },
    },
    methods: {
      // 获取全部买家数据列表
      async getBuyerList() {
        const {
          data: res
        } = await uni.$http.get('api/buyers')
        console.log('res ', res)
        this.buyerList = res.data.map(item => {
          return {
            id: item.id,
            ...item.attributes
          }
        })
        // console.log('this.buyerList ', this.buyerList)
      },
      // 搜索栏的input事件
      input(v) {
        console.log(v)
      }
    },
  }
</script>

<style lang="scss">
  .page {
    .all-buyer {
      background-color: #fff1e6;
      color: #e09159;
      padding: 8px 0px;
      border-top: 1px solid #e5e4e1;
      border-bottom: 1px solid #e5e4e1;

      .text {
        margin-left: 20px;
      }
    }

    .buyer-item {
      height: 80px;
      width: 100%;
      background-color: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #e5e4e1;

      .name {
        font-size: 18px;
        font-weight: 700;
        margin-left: 20px;
      }

      .mobile {
        margin-right: 30px;
      }
    }

    .add {
      position: fixed;
      bottom: 0px;
      left: 0px;
      width: 100%;
      height: 60px;
      background-color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      border-top: 1px solid #e5e4e1;

      .btn {
        width: 90%;
        height: 40px;
        line-height: 40px;
        text-align: center;
        background-color: #1d9d60;
        border-radius: 20px;
        color: #fff;

      }
    }
  }
</style>