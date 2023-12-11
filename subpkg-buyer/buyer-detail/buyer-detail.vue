<template>
  <view class="page">
    <!-- 个人信息 -->
    <view class="info">
      <view class="top">
        <!-- 头像 -->
        <view class="left">
          <!-- <image src="../../static/img/touxiang.jpg" mode=""></image> -->
        </view>
        <view class="right">
          <!-- 名字 -->
          <view class="name">
            刘娜
          </view>
          <!-- 手机号 -->
          <view class="mobile">
            <view class="icon">
               <uni-icons type="phone" size="24"></uni-icons>
            </view>
           <view class="text">
             13554250247
           </view>
          </view>
        </view>
      </view>
      <view class="bottomone">
        <!-- 未还款天数 -->
        <view class="unpaidMoneyDays">
          <view class="day">
            -
          </view>
          <view class="text">
            未还款天数
          </view>
        </view>
        <!-- 未采购天数 -->
        <view class="noPurchaseDays">
          <view class="day">
            0
          </view>
          <view class="text">
            未采购天数
          </view>
        </view>
        <!-- 最长赊欠天数 -->
        <view class="oweLongestDays">
          <view class="day">
            -
          </view>
          <view class="text">
            最长赊欠天数
          </view>
        </view>
      </view>
    </view>
     <!-- 赊欠详情 -->
     <view class="oweDetail">
       <!-- 第一行 -->
       <view class="owe">
         <!-- 当前赊欠text -->
         <view class="present">
           当前赊欠(元)
         </view>
        <!-- 历史赊欠 -->
         <view class="history">
           + 历史赊欠
         </view>
       </view>
       <!-- 第二行 -->
       <view class="particulars">
         <!-- 数量 -->
         <view class="num">
           <!-- 欠款总金额 -->
           <view class="oweTotal">
             0
           </view>
           <!-- 所有订单 -->
           <view class="billTotal">
             0单
           </view>
         </view>
         <!-- 明细 -->
         <view class="oweParticulars">
           <view class="text">
              明细
           </view>
           <view class="icon">
             <uni-icons color="#d6d6d6" type="right" size="16"></uni-icons>
           </view>
         </view>
       </view>
       <!-- 第三行 -->
       <view class="sharebill">
         <!-- 分享账单 -->
         <view class="share">
           <view class="icon">
             <uni-icons color="#f8811e" type="redo" size="40"></uni-icons>
           </view>
           <view class="text">
             分享账单
           </view>
         </view>
       </view>
       <!-- 第四行 -->
       <view class="repayDetail">
         <!-- 还款详情 -->
         <view class="left">
           还款详情
         </view>
         <!-- 更多 -->
         <view class="right">
           <view class="text">
              更多
           </view>
           <view class="icon">
             <uni-icons color="#d6d6d6" type="right" size="16"></uni-icons>
           </view>
         </view>
       </view>
    
     </view>
     <!-- 采购详情 -->
     <view class="purchaseDetail">
       <view class="purchaseTotal">
         <!-- 采购总额 -->
         <view class="left">
           采购总额(元)
         </view>
         <!-- 统计 -->
         <view class="right">
           <view class="text">
              统计
           </view>
           <view class="icon">
             <uni-icons color="#d6d6d6" type="right" size="16"></uni-icons>
           </view>
         </view>
       </view>
       <view class="purchaseParticulars">
         <!-- 数量 -->
           <view class="num">
             <!-- 采购总金额 -->
             <view class="oweTotal">
               0
             </view>
             <!-- 所有订单 -->
             <view class="billTotal">
               0单
             </view>
           </view>
           <!-- 明细 -->
           <view class="oweParticulars">
             <view class="text">
                明细
             </view>
             <view class="icon">
               <uni-icons color="#d6d6d6" type="right" size="16"></uni-icons>
             </view>
           </view>
         
       </view>
     </view>
     
    <view class="bottom">
      <navigator style="background-color: #bfbfbf;color: #ffffff;" :url="''" class="btn">
        还款
      </navigator>
      <navigator :url="`/subpkg-buyer/buyer-edit/buyer-edit?buyerId=${buyerId}`" class="btn">
        修改
      </navigator>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        buyerId:''
      };
    },
    onLoad(option) {
      this.buyerId=option.buyerId
      console.log(typeof this.buyerId)
    }
  }
</script>

<style lang="scss">
.page{
  width: 100%;
  height: 600px;
  background-color: #f7f7f7;
  padding: 10px 0 10px 0;
  .info{
    width: 100%;
    // height: 120px;
    background-color: #fff;
    .top{
      width: 100%;
      padding-top: 10px;
      display: flex;
      .left{
        // margin-top: 10px;
        margin-left: 20px;
        width: 80px;
        height: 80px;
        background-color: #1d9d60;
        border-radius: 50%;
      }
      .right{
        margin-left: 20px;
        .name{
          font-size: 24px;
          font-weight: 700;
          color: #000;
          margin-bottom: 10px;
        }
        .mobile{
          padding: 5px 10px;
          border: 1px solid #f2f2f2;
          border-radius: 5px;
          color: #686868;
         display: flex;
         justify-content: center;
         align-items: center;
        }
      }
    }
    .bottomone{
      margin-top: 20px;
      display: flex;
      justify-content: space-around;
      padding-bottom: 20px;
      .unpaidMoneyDays{
        padding:5px 10px;
        // background-color: red;
        .day{
          width: 100%;
          // background-color: #1d9d60;
          display: flex;
          justify-content: center;
          align-items: center;
          font-weight: 700;
          margin-bottom: 10px;
        }
        .text{
          font-size: 14px;
          color: #979797;
        }
      }
      .noPurchaseDays{
        padding:5px 10px;
        // background-color: red;
        .day{
          width: 100%;
          // background-color: #1d9d60;
          display: flex;
          justify-content: center;
          align-items: center;
          font-weight: 700;
          margin-bottom: 10px;
        }
        .text{
          font-size: 14px;
          color: #979797;
        }
      }
      .oweLongestDays{
        padding:5px 10px;
        // background-color: red;
        .day{
          width: 100%;
          // background-color: #1d9d60;
          display: flex;
          justify-content: center;
          align-items: center;
          font-weight: 700;
          margin-bottom: 10px;
        }
        .text{
          font-size: 14px;
          color: #979797;
        }
      }
    }
  }
 
  .oweDetail{
    margin-top: 10px;
    width: 100%;
    // height: 120px;
    background-color: #fff;
    .owe{
      width: 100%;
      height: 50px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #969696;
      .present{
        margin-left: 20px;
      }
      .history{
        margin-right: 20px;
      }
    }
    .particulars{
      width: 100%;
      height: 50px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #969696;
      .num{
        margin-left: 20px;
        .oweTotal{
          font-weight: 700;
          color: #fb8f22;
          font-size: 24px;
        }
        .billTotal{
          font-size: 14px;
          color: #989896;
        }
      }
      .oweParticulars{
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 20px;
      }
    }
    .sharebill{
      width: 100%;
      height: 80px;
      display: flex;
      justify-content: center;
      align-items: center;
      .share{
        width: 90%;
        height: 50px;
        border: 2px solid #f8811e;
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #f8811e;
        .text{
          margin-left: 10px;
          font-weight: 700;
          font-size: 20px;
        }
      }
    }
    .repayDetail{
      width: 100%;
      height: 50px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #969696;
      .left{
        margin-left: 20px;
      }
      .right{
        margin-right: 20px;
        display: flex;
      }
    }
 }
 
  .purchaseDetail{
    margin-top: 10px;
    width: 100%;
    // height: 120px;
    background-color: #fff;
    .purchaseTotal{
      width: 100%;
      height: 50px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #969696;
      .left{
        margin-left: 20px;
      }
      .right{
        margin-right: 20px;
        display: flex;
      }
    }
    .purchaseParticulars{
      width: 100%;
      height: 50px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #969696;
      .num{
        margin-left: 20px;
        .oweTotal{
          font-weight: 700;
          color: #3661ec;
          font-size: 24px;
        }
        .billTotal{
          font-size: 14px;
          color: #989896;
        }
      }
      .oweParticulars{
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 20px;
      }
    }
  }
 
  .bottom{
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
      .btn{
        width: 50%;
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
