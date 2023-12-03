<template>
  <view class="page">
    <!-- 搜索框 -->
    <view class="search w">
      <uni-easyinput prefixIcon="search" :inputBorder="false" v-model="value" placeholder="搜索员工姓名或手机号"
        :placeholderStyle="placeholderStyle" @iconClick="iconClick"></uni-easyinput>
    </view>
    <!-- 过滤筛选 -->
    <view class="condition">
      全部员工<uni-icons type="bottom" size="20"></uni-icons>
    </view>
    <!-- 档主 -->
    <view class="employee">
      <view class="employee-num w">
        员工数 <text class="num">{{userList.length}}</text>
      </view>
      <view class="employee-item w" v-for="item in bossDetail" :key="item.id">
        <view class="left">
          <view class="top">{{item.name}}</view>
          <view class="bottom">{{item.duty}}</view>
        </view>
        <view class="right">{{item.mobile}}</view>
      </view>
    </view>
    <!-- 管理员 -->
    <view class="employee" v-for="item in showlist" :key="item.value">
      <view class="employee-num w">
        {{item.value}}
      </view>
      <navigator v-for="i in item.children" :key="i.id"
        :url="`/subpkg-user/employee-detail/employee-detail?userId=${i.id}`" class="employee-item w">
        <view class="left">
          <view class="top">{{i.name}}</view>
          <view class="bottom">{{i.duty}}</view>
        </view>
        <view class="right">{{i.mobile}}</view>
      </navigator>
    </view>
    <!-- 停用的管理员 -->
    <view class="employee" style="margin-bottom: 80px;">
      <view class="employee-num w">
        已停用
      </view>
      <navigator v-for="item in stoplist" :key="item.value"
        :url="`/subpkg-user/employee-detail/employee-detail?userId=${item.id}`" class="employee-item w">
        <view class="left">
          <view class="top" :class="{stop:item.state===false}">{{item.name}}<text
              style="margin-left: 10px;font-weight: 500;">已停用</text></view>
          <view class="bottom">{{item.duty}}</view>
        </view>
        <view class="right">{{item.mobile}}</view>
      </navigator>
    </view>
    <!-- 占位 -->
    <view class="kong"></view>
    <!-- 添加员工 -->
    <view class="add">
      <navigator class="btn" :url="'/subpkg-user/employee-add/employee-add'">
        添加员工
      </navigator>
    </view>
  </view>
</template>

<script>
  // 导入平铺转二维数组的函数
  import {
    transformListToTree
  } from '../../utils/index.js'
  // 导入字典
  import dictionariesList from '../../utils/dictionaries.js'
  // 引入插件
  import {
    pinyin
  } from 'pinyin-pro';
  export default {
    data() {
      return {
        placeholderStyle: "color:#96979b;font-size:16px;background-color:#f6f7fb;padding-left:10px;",
        // 导入的字典
        list: [],
        // 用户数据
        userList: [],
        // 档主的详情
        bossDetail: []
      };
    },

    onLoad() {
      this.list = dictionariesList
      // console.log('哈喽',this.list)
      this.getUserList()
    },
    onShow() {
      this.getUserList()
    },
    computed: {
      // 展示启用的管理员
      showlist() {
        // 过滤掉档主和停用的
        let arr = this.userList.filter(item => item.id !== 1 && item.state !== false)
        console.log('arr1', arr)
        // 给每一个员工信息添加一个字段:第一个字的首字母
        arr = arr.map(item => {
          return {
            pid: pinyin(item.name.charAt(0), {
              pattern: 'first'
            }),
            ...item
          }
        })
        arr = [...this.list, ...arr]
        const abb = transformListToTree(arr, '')
        console.log('abb', abb)
        return abb.filter(item => item.children)
      },
      // 展示停用的管理员
      stoplist() {
        return this.userList.filter(item => item.state === false)
      }
    },
    methods: {
      // 获取全部员工
      async getUserList() {
        const {
          data: res
        } = await uni.$http.get('api/employees')
  // 请求出错的提示
        if(res.data===null) return uni.$showMsg(res.error.message)
        this.userList = res.data.map(item => {
          return {
            id: item.id,
            ...item.attributes
          }
        })
        // 获取档主的信息
        this.bossDetail = this.userList.filter(item => item.duty === "档主")

      },
    }
  }
</script>

<style lang="scss">
  .page {
    height: 100%;

    .w {
      padding: 0px 20px;
    }
    .search {}
    .condition {
      margin-top: 10px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      border-top: 1px solid #e1e1e1;
      border-bottom: 1px solid #e1e1e1;
      font-size: 20px;
    }
    .employee {
      height: 120px;
      .employee-num {
        line-height: 40px;
        height: 40px;
        background-color: #f4f5f7;
        .num {
          margin-left: 5px;
          font-weight: 700;
          color: #fa8f4c;
        }
      }
      .employee-item {
        height: 80px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .left {
          .top {
            font-weight: 700;
            font-size: 20px;
            color: #333333;
          }
          .stop {
            color: #cccccc;
          }
          .bottom {
            font-size: 14px;
            margin-top: 10px;
            color: #696969;
          }
        }
      }
    }
    .kong {
      width: 100%;
      height: 60px;
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