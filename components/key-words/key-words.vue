<template>
  <view class="component">

    <view class="keys">
      <view class="num-item">
        <view class="outside" v-for="item in keyboardList" :key="item.value" @click="clickKeyboard(item.value)">
          <view class="item">
            {{ item.label }}
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  
  const KeyboardActions = {
    Backspace: -1
  }
  export default {
    name: "key-words",
    props: {
    },
    data() {
      return {
        // keyboardValue: this.weightValue,
        keyboardList: [{
            label: "7",
            value: "7"
          },
          {
            label: "8",
            value: "8"
          },
          {
            label: "9",
            value: "9"
          },
          {
            label: "4",
            value: "4"
          },
          {
            label: "5",
            value: "5"
          },
          {
            label: "6",
            value: "6"
          },
          {
            label: "1",
            value: "1"
          },
          {
            label: "2",
            value: "2"
          },
          {
            label: "3",
            value: "3"
          },
          {
            label: "0",
            value: "0"
          },
          {
            label: ".",
            value: "."
          },
          {
            label: "退格",
            value: '-1'
          },
        ]

      };
    },
   
    methods: {
      clickKeyboard(value){
        console.log(value)
        this.$emit('change', value)
      }
    }
  }
</script>

<style lang="scss">
  .component {
    width: 100%;
    height: 250px;
    background-color: #e4e8f1;

    // .lastprice {
    //   height: 50px;
    // }

    .keys {
      display: flex;

      .num-item {
        display: flex;
        flex-wrap: wrap;
        width: 270px;
        margin-right: 10px;

        .outside {
          width: 80px;
          height: 50px;
          margin-left: 10px;
          margin-bottom: 10px;
          background-color: black;
          border-radius: 8px;
          box-shadow: 0px 5px 5px #888888;

          .item {
            margin-top: 1px;
            border-top: 1px solid #788eba;
            border-radius: 5px;
            width: 79px;
            height: 44px;
            line-height: 44px;
            text-align: center;
            font-size: 32px;
            font-weight: 700;
            color: #fff;
            background: linear-gradient(#364564, #6f80a6);

          }
        }

      }

     
    }

  }
</style>