<template>
  <view class="page">
    <view class="search w">
      <uni-easyinput prefixIcon="search" :inputBorder="false" v-model="value" placeholder="搜索员工姓名或手机号"
        :placeholderStyle="placeholderStyle" @iconClick="iconClick"></uni-easyinput>
    </view>
    
    <view class="condition">
      全部员工<uni-icons type="bottom" size="20"></uni-icons>
    </view>
    <!-- 档主 -->
    <view class="employee">
     <view class="employee-num w">
        员工数 <text class="num">{{userList.length}}</text>
     </view>
     <view class="employee-item w">
       <view class="left">
         <view class="top">{{bossDetail.userName}}</view>
         <view class="bottom">{{bossDetail.role}}</view>
       </view>
       <view class="right">{{bossDetail.mobile}}</view>
     </view>
    </view>
    <!-- 管理员 -->
    <view  class="employee" v-for="item in showlist" :key="item.value">
     <view class="employee-num w">
        {{item.value}}
     </view>
     <navigator v-for="i in item.children" :key="i.userId" :url="`/subpkg-user/employee-detail/employee-detail?userId=${i.userId}`" class="employee-item w" >
       <view class="left">
         <view class="top">{{i.userName}}</view>
         <view class="bottom">{{i.role}}</view>
       </view>
       <view class="right">{{i.mobile}}</view>
     </navigator>
    </view>
    <!-- 停用的管理员 -->
   <view  class="employee"  style="margin-bottom: 80px;">
     <view class="employee-num w">
        已停用
     </view>
     <navigator v-for="item in stoplist" :key="item.value"  :url="`/subpkg-user/employee-detail/employee-detail?userId=${item.userId}`" class="employee-item w" >
       <view class="left">
         <view class="top" :class="{stop:item.state==='未启用'}">{{item.userName}}<text style="margin-left: 10px;font-weight: 500;">已停用</text></view>
         <view class="bottom">{{item.role}}</view>
       </view>
       <view class="right">{{item.mobile}}</view>
     </navigator>
    </view>
    
    <view class="kong">
      
    </view>
    <!-- 添加员工 -->
    <view class="add">
      <navigator class="btn" :url="'/subpkg-user/employee-add/employee-add'">
        添加员工
      </navigator>
    </view>
  </view>
</template>

<script>
  import { transformListToTree} from '../../utils/index.js'
  import  dictionariesList from '../../utils/dictionaries.js'
  import { pinyin } from 'pinyin-pro';
  export default {
    data() {
      return {
        placeholderStyle: "color:#96979b;font-size:16px;background-color:#f6f7fb;padding-left:10px;",
        // showlist:[],
        list:[],
        userList: [ ],
        bossDetail:{}
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
    computed:{
      showlist(){
         let arr =this.userList.filter(item=>item.userName!=='档主'&&item.state!=='未启用')
             arr = arr.map(item => {
          return {
            pid: pinyin(item.userName.charAt(0), {
              pattern: 'first'
            }),
            mobile: item.mobile,
            role: item.role,
            shopId:item.shopId,
            shopName:item.shopName,
            state:item.state,
            userId:item.userId,
            userName:item.userName
          }
        })
        arr = [...this.list, ...arr]
        const abb = transformListToTree(arr,'')
         return abb.filter(item=> item.children)
      },
    stoplist(){
      return this.userList.filter(item=>item.state==='未启用')     
    }
    },
    methods: {
      async getUserList(){
        if(uni.getStorageSync('userList')){
          this.userList = uni.getStorageSync('userList')
          this.bossDetail = this.userList[0]
        }else{
          const {data: res} = await uni.$http.get('api/userList')
          this.userList = res.data
           this.bossDetail = this.userList[0]
          // console.log(' this.userList', this.userList)
           uni.setStorageSync('userList', this.userList)
        }
      },
      // add(){
      //   console.log('新增')
      //   uni.navigateTo({
      //     url:''
      //   })
      // }
  }
  }
</script>

<style lang="scss">
  .page {
    height: 100%;
    // background-color: antiquewhite;
    // position: relative;
    .w{
      padding: 0px 20px;
    }
    .search{}
    .condition{
      margin-top: 10px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      // background-color: red;
      border-top: 1px solid #e1e1e1;
      border-bottom: 1px solid #e1e1e1;
      font-size: 20px;
    }
    .employee{
      // margin-left: 20px;
      height: 120px;
      // margin-bottom: 60px;
      // background-color: #f4f5f7;
      .employee-num{
        line-height: 40px;
        height: 40px;
        
        background-color: #f4f5f7;
        .num{
          margin-left: 5px;
          font-weight: 700;
          color: #fa8f4c;
        }
      }
      .employee-item{
          height: 80px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .left{
            .top{
              font-weight: 700;
              font-size: 20px;
              color: #333333;
            }
            .stop{
              color: #cccccc;
            }
            .bottom{
              font-size: 14px;
              margin-top: 10px;
              color: #696969;
            }
          }
        }
      
    }
    .kong{
      width: 100%;
      height: 60px;
    }
    .add{
      position: fixed;
      bottom: 0px;
      left: 0px;
      width: 100%;
      height: 60px;
      background-color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      .btn{
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