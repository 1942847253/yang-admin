<template>
  <div class="achievement-box" :style="getDarkStyle()">

    <el-card v-for="(item, index) in analogData" :key="index" class="box-card" shadow="never">
      <template #header>
        <div class="card-header">
          <span>{{ item.type }}</span>
          <el-tag :type="item.nums > 4000 ? 'success' : ''">{{
              item.timer
          }}</el-tag>
        </div>
      </template>
      <div class="card-body">
        <div class="one">
          <div>
            $
            <count-to uid="1" :startVal="0" :endVal="item.nums" :count-class="'count-style'"
              :style="`${store.dark && 'color:#fff'}`" class="selfStyleNo" :duration="3000" />
          </div>
          <img :src="item.img" alt="" width="50" height="50" />
        </div>
        <div class="two">
          <span>总{{ item.type }}</span>
          <div class="totle">
            $
            <count-to uid="1" :startVal="0" :endVal="item.totleNum" :count-class="'count-style'" class="selfStyleNo"
              :duration="3000" />
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { useUserStore } from 'src/store/userStore'
import { CountTo } from "vue3-count-to";
import actived from "./images/actived.png";
import ok from "./images/ok.png";
import overUser from "./images/overUser.png";
import upload from "./images/upload.png";
export default defineComponent({
  name: "Home",
  components: {
    CountTo,
  },
  setup() {
    const store = useUserStore();
    const analogData = [
      {
        type: "访问数",
        timer: "月",
        nums: 2000,
        totleNum: 12000,
        img: actived,
      },
      {
        type: "成交额",
        timer: "月",
        nums: 5000,
        totleNum: 8330000,
        img: ok,
      },
      {
        type: "访问数",
        timer: "周",
        nums: 4000,
        totleNum: 22000,
        img: overUser,
      },
      {
        type: "下载数",
        timer: "年",
        nums: 6000,
        totleNum: 19000,
        img: upload,
      },
    ];

    const getDarkStyle = () => {
      return `transition: background-color .4s ease;background-color:${store.dark ? '#1d1e1f' : '#fff'}`
    }
    onMounted(() => { });

    return {
      store,
      analogData,
      getDarkStyle,
    };
  },
});
</script>

<style lang="scss" scoped>
.achievement-box {
  display: flex;
  padding: 5px 0px 10px 5px;

  .card-header {
    display: flex;
    height: 0px;
    font-size: 13px;
    justify-content: space-between;

    align-items: center;

    a {
      color: red($color: #000000);
    }
  }

  .box-card {
    width: 25%;
    margin-right: 5px;

    .card-body {
      .one {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 0px;

        div {
          flex-grow: 1;

          font-size: 23px;
        }

        .selfStyleNo {
          font-size: 23px;
        }

        span {
          color: #000000d9;
          font-size: 16px;
          font-variant: tabular-nums;
          line-height: 1.5715;
        }
      }

      .two {
        display: flex;
        justify-content: space-between;
        margin-top: 20px;

        span {
          font-size: 14px;
          flex-grow: 1;
        }
      }
    }
  }
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}
</style>
