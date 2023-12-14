<template>
  <view class="page">
    <view class="top">
      <view class="one">
        <view class="phone">
          手机极简版
        </view>
        <view class="my">
          我的商行
        </view>
      </view>
      <view class="two">
        <view class="left">
          月销售额 <text style="margin-left: 10px; font-weight: 700; font-size: 20px;">6100</text>
        </view>
        <view class="icon">
          <uni-icons color="#fff" type="right" size="15"></uni-icons>
        </view>
      </view>
      <view class="three">
        <view class="left">
          赊欠总额 <text style="margin-left: 10px; font-weight: 700; font-size: 20px;">1100</text>
        </view>
        <view class="icon">
          赊欠分享
        </view>
      </view>
      <view class="kong"></view>
      <view class="box">
        <view class="record-owe">
          <view class="icon">
            <uni-icons color="#fff"  custom-prefix="iconfont" type="icon-kaohejilu"
              size="20"></uni-icons>
          </view>
          <view class="text">
            录赊欠
          </view>
        </view>
        <view class="record-incomeAndExpenses">
          <view class="icon">
            <uni-icons color="#fff"  custom-prefix="iconfont" type="icon-yinxingqia1"
              size="20"></uni-icons>
          </view>
          <view class="text">
            录收支
          </view>
        </view>
        <view class="repay">
          <view class="icon">
            <uni-icons color="#fff"  custom-prefix="iconfont" type="icon-yinxingqia"
              size="20"></uni-icons>
          </view>
          <view class="text">
            快速还款
          </view>
        </view>
      </view>
    </view>
    <view class="middle">
      <view class="title">
        <view class="icon">
          <uni-icons color="#fff"  custom-prefix="iconfont" type="icon-shouzhiliushui"
            size="20"></uni-icons>
        </view>
        <view class="text">
          今日营业状况
        </view>
      </view>
      <view class="nav">
        <!-- 票面总额 -->
        <view class="left">
          <view class="left-text">
            <view class="num">6100</view>
            <view class="text">票面总额(4单)</view>
          </view>
          <view class="icon">
            <uni-icons color="#b7bbba" type="right" size="20"></uni-icons>
          </view>
        </view>
        <!-- 赊欠 -->
        <view class="right">
          <view class="left-text">
            <view class="num">1100</view>
            <view class="text">赊欠(1人)</view>
          </view>
          <view class="icon">
            <uni-icons color="#b7bbba" type="right" size="20"></uni-icons>
          </view>
        </view>
      </view>
      <view class="navone">
        <view class="left">
          <view class="left-text">
            <view class="num">5000</view>
            <view class="text">实收汇总</view>
          </view>
          <view class="icon">
            <uni-icons color="#b7bbba" type="right" size="20"></uni-icons>
          </view>
        </view>
        <view class="right">
          <view class="left-text">
            <view class="num">0</view>
            <view class="text">历史还款(0人)</view>
          </view>
          <view class="icon">
            <uni-icons color="#b7bbba" type="right" size="20"></uni-icons>
          </view>
        </view>
      </view>
      <view class="navtwo">
        <view class="left">
          <view class="left-text">
            <view class="num">1种</view>
            <view class="text">已售货品</view>
          </view>
          <view class="icon">
            <uni-icons color="#b7bbba" type="right" size="20"></uni-icons>
          </view>
        </view>
        <view class="right">
          
        </view>
      </view>
    </view>
    <view class="bottom">
      <view class="title">
        <view class="icon">
          <uni-icons color="#fff"  custom-prefix="iconfont" type="icon-qushitu"
            size="20"></uni-icons>
        </view>
        <view class="text">
          七日收入趋势
        </view>
      </view>
      <view class="echarts">
        <canvas canvas-id="columnCanvas" disable-scroll="true" class="canvas"></canvas>
      </view>
    </view>
    
    <navigator :url="'/subpkg-order/order-provisional/order-provisional'" class="billing">
      开单
    </navigator>
  </view>
</template>

<script>
  let Charts = require('../../utils/wxcharts-min.js');   //引入wxChart文件
  export default {
    data() {
      return {};
    },
    onLoad() {
      
  
  new Charts({
      canvasId: 'columnCanvas',
      type: 'column',
      categories: ['2016-08', '2016-09', '2016-10', '2016-11', '2016-12', '2017'],
      series: [{
          name: '成交量1',
          data: [15, 20, 45, 37, 4, 80]
      }, {
          name: '成交量2',
          data: [70, 40, 65, 100, 34, 18]
      }, {
          name: '成交量3',
          data: [70, 40, 65, 100, 34, 18]
      }, {
          name: '成交量4',
          data: [70, 40, 65, 100, 34, 18]
      }],
      yAxis: {
          format: function (val) {
              return val + '万';
          }
      },
      width: 375,
      height: 200,
      dataLabel: false
  });
  // new Charts({
  //     canvasId: 'columnCanvas',
  //     type: 'column',
  //     categories: ['2016-08', '2016-09', '2016-10', '2016-11', '2016-12', '2017'],
  //     series: [ {
  //         name: '每日票面总额',
  //         data: [0, 0, 0, 0, 6100, 0]
  //     }],
  //     // yAxis: {
  //     //     format: function (val) {
  //     //         return val + '万';
  //     //     }
  //     // },
  //     width: 375,
  //     height: 200,
  //     dataLabel: false
  // });
    },
    computed: {

    },
    methods: {

    }
  }
</script>

<style lang="scss">
  @import "@/static/iconfont.css";
  .page {
    width: 100%;
    // height: 600px;
    background-color: #f4f5f7;

    .top {
      position: relative;
      width: 100%;
      // height: 150px;
      padding-top: 60px;
      background: linear-gradient(to right, #484e66, #313246);

      .one {
        width: 100%;
        // height: 60px;
        display: flex;

        .phone {
          padding: 5px 10px;
          border-radius: 5px;
          background: linear-gradient(to right, #34c17d, #10a65e);
          color: #fff;
          margin-right: 10px;
        }

        .my {
          color: #fff;
          font-weight: 700;
          font-size: 20px;
        }
      }

      .two {
        width: 100%;
        height: 60px;
        border-bottom: 2px solid #1c1f2f;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .left {
          margin-left: 20px;
          color: #fff;
        }

        .icon {
          margin-right: 20px;

        }
      }

      .three {
        width: 100%;
        height: 60px;
        border-top: 2px solid #62657f;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .left {
          margin-left: 20px;
          color: #fff;
        }

        .icon {
          margin-right: 20px;
          padding: 5px 10px;
          background-color: #33cb82;
          color: #fff;
          border-radius: 26px;
        }
      }
      .kong{
        width: 100%;
        height: 30px;
      }
      .box{
        position: absolute;
        bottom: -70px;
        left: 9px;
        width: 95%;
        height: 100px;
        background-color: #fff;
        border-radius: 10px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        .record-owe{
          width: 60px;
          // background-color: aqua;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .icon{
            width: 40px;
            height: 40px;
            background-color: #28b777;
            border-radius: 50%;
            margin-bottom: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .text{
            font-size: 14px;
            
          }
        }
        .record-incomeAndExpenses{
          width: 60px;
          // background-color: aqua;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .icon{
            width: 40px;
            height: 40px;
            background-color: #fd564e;
            border-radius: 50%;
            margin-bottom: 10px;
            display: flex;
            justify-content: space-around;
            align-items: center;
          }
          .text{
            font-size: 14px;
            
          }
        }
        .repay{
          width: 60px;
          // background-color: aqua;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .icon{
            width: 40px;
            height: 40px;
            background-color: #fbb651;
            border-radius: 50%;
             margin-bottom: 10px;
             display: flex;
             justify-content: space-around;
             align-items: center;
          }
          .text{
            font-size: 14px;
            
          }
        }
      }
    }
    .middle{
      margin-top: 90px;
     .title{
       display: flex;
       align-items: center;
       .icon{
         margin-left: 20px;
         margin-right: 10px;
         width: 30px;
         height: 30px;
         background-color: #33cb82;
         border-radius: 10px;
         display: flex;
         justify-content: center;
         align-items: center;
       }
       .text{
         font-weight: 700;
         font-size: 20px;
       }
     }
     .nav{
       margin-top: 20px;
       width: 100%;
       height: 80px;
       background-color: #fff;
       border-bottom: 1px solid #e3e3e3;
       display: flex;
       .left{
         width: 50%;
         height: 80px;
         // background-color: red;
         display: flex;
         align-items: center;
         justify-content: space-between;
         .left-text{
           margin-left: 20px;
           .num{
             color: #279764;
             font-weight: 700;
             font-size: 20px;
           }
           .text{
             
           }
         }
         .icon{
           margin-right: 10px;
         }
       }
       .right{
         flex: 1;
         height: 80px;
         // background-color: red;
         border-left: 1px solid #e3e3e3;
         display: flex;
         align-items: center;
         justify-content: space-between;
         .left-text{
           margin-left: 20px;
           .num{
             color: #279764;
             font-weight: 700;
             font-size: 20px;
           }
           .text{
             
           }
         }
         .icon{
           margin-right: 10px;
         }
       }
     }
     .navone{
       width: 100%;
       height: 80px;
       background-color: #fff;
       border-bottom: 1px solid #e3e3e3;
       display: flex;
       .left{
         width: 50%;
         height: 80px;
         // background-color: red;
         display: flex;
         align-items: center;
         justify-content: space-between;
         .left-text{
           margin-left: 20px;
           .num{
             color: #279764;
             font-weight: 700;
             font-size: 20px;
           }
           .text{
             
           }
         }
         .icon{
           margin-right: 10px;
         }
       }
       .right{
         flex: 1;
         height: 80px;
         // background-color: red;
         border-left: 1px solid #e3e3e3;
         display: flex;
         align-items: center;
         justify-content: space-between;
         .left-text{
           margin-left: 20px;
           .num{
             color: #279764;
             font-weight: 700;
             font-size: 20px;
           }
           .text{
             
           }
         }
         .icon{
           margin-right: 10px;
         }
       }
     }
     .navtwo{
       width: 100%;
       height: 80px;
       background-color: #fff;
       // border-bottom: 1px solid #e3e3e3;
       display: flex;
       .left{
         width: 50%;
         height: 80px;
         // background-color: red;
         display: flex;
         align-items: center;
         justify-content: space-between;
         .left-text{
           margin-left: 20px;
           .num{
             color: #279764;
             font-weight: 700;
             font-size: 20px;
           }
           .text{
             
           }
         }
         .icon{
           margin-right: 10px;
         }
       }
       .right{
         flex: 1;
         height: 80px;
         // background-color: red;
         border-left: 1px solid #e3e3e3;
       }
     }
    }
    .bottom{
      margin-top: 20px;
      width: 100%;
      // height: 350px;
      background-color: #f4f5f7;
      .title{
        display: flex;
        align-items: center;
        .icon{
          margin-left: 20px;
          margin-right: 10px;
          width: 30px;
          height: 30px;
          background-color: #f5a625;
          border-radius: 10px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .text{
          font-weight: 700;
          font-size: 20px;
        }
      }
      .echarts{
        margin-top: 20px;
        width: 100%;
        height: 350px;
        background-color: #fff;
        .canvas{
          width: 100%;
          height: 350px;
        }
      }
    }
    .billing {
      position: fixed;
      bottom: 40px;
      right: 112px;
      width: 150px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      background-color: #1d9d80;
      color: #fff;
      font-size: 25px;
      border-radius: 50px;
    }
  }
</style>