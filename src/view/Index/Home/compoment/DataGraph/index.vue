<template>
  <div class="box-card" shadow="never">
    <el-card>
      <el-tabs v-model="activeName" class="demo-tabs" style="margin-top: -10px">
        <el-tab-pane name="first">
          <template #label>
            <span class="custom-tabs-label">
              <span style="font-size: 16px">销售业绩</span>
            </span>
          </template>
          <div class="development" id="development-map2"></div>
        </el-tab-pane>
        <el-tab-pane name="second">
          <template #label>
            <span class="custom-tabs-label">
              <span style="font-size: 16px">访问量</span>
            </span>
          </template>
          <div class="development" id="development-map"></div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, nextTick, onActivated } from "vue";
import * as echarts from "echarts";
import { option1, option2 } from "./baseData";
export default defineComponent({
  setup() {
    const activeName = ref("first");
    let chart1: echarts.ECharts = {} as echarts.ECharts;
    let chart2: echarts.ECharts = {} as echarts.ECharts;
    onMounted(() => {
      initCharts();
    });

    onActivated(() => {});

    const initCharts = (): void => {
      nextTick(() => {
        chart1 = echarts.init(document.getElementById("development-map")!);
        chart2 = echarts.init(document.getElementById("development-map2")!);
        chart1.setOption(option2);
        chart2.setOption(option1);
        window.onresize = function () {
          chart1.resize();
          chart2.resize();
        };
      });
    };

    return {
      activeName,
    };
  },
});
</script>

<style lang="scss" scoped>
.box-card {
  padding: 0 5px;
  .development {
    width: 100vw;
    height: 390px;
  }
}
</style>
