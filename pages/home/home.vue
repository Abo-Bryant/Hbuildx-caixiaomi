<template>
  <view>
    <view @click="test">
      点击
    </view>
    <view v-for="item in showlist">
      <view class="">
        {{item.value}}
        <view v-for="i in item.children">
          {{i.userName}}
        </view>
      </view>
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
        // showlist:[],
        list:[],
        userList: [ ]
      };
    },
    onLoad() {
      this.list = dictionariesList
      // console.log('哈喽',this.list)
      this.getUserList()
    },
    computed:{
      showlist(){
        this.userList=this.userList.filter(item=>item.userName!=='档主'&&item.state!=='未启用')
      
            let arr = this.userList.map(item => {
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
      }
    },
    methods: {
      async getUserList(){
        if(uni.getStorageSync('userList')){
          this.userList = uni.getStorageSync('userList')
        }else{
          const {data: res} = await uni.$http.get('api/userList')
          this.userList = res.data
          // console.log(' this.userList', this.userList)
           uni.setStorageSync('userList', this.userList)
        }
      },
      
//       test() {
//         let arr = this.userList.map(item => {
//           return {
//             pid: pinyin(item.userName.charAt(0), {
//               pattern: 'first'
//             }),
//             mobile: item.mobile,
//             role: item.role,
//             shopId:item.shopId,
//             shopName:item.shopName,
//             state:item.state,
//             userId:item.userId,
//             userName:item.userName
//           }
//         })
//         console.log('arr',arr)
//         arr = [...this.list, ...arr]
//       const abb = transformListToTree(arr,'')
//         this.showlist = abb.filter(item=> item.children)
// console.log('哈喽', this.showlist)
//       },
 
    }
  }
</script>

<style lang="scss">

</style>