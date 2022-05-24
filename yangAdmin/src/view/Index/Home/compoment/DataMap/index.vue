<template>
  <div style="padding: 5px">
    <Card>
      <div id="main-content" class="development"></div>
    </Card>
  </div>
</template>

<script lang="ts">
import * as echarts from "echarts/core";
import { TitleComponent, TooltipComponent } from "echarts/components";
import { ScatterChart, EffectScatterChart } from "echarts/charts";
import "src/libs/bmap/bmap";
import { UniversalTransition } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";
import { defineComponent, onMounted, nextTick, onActivated } from "vue";
import Card from "src/components/Card/Card.vue";
import option from "./baseData";

echarts.use([
  TitleComponent,
  TooltipComponent,
  ScatterChart,
  EffectScatterChart,
  CanvasRenderer,
  UniversalTransition,
]);

export default defineComponent({
  name: "DateMap",
  components: {
    Card,
  },
  setup() {
    let myChart = {} as echarts.ECharts;

    onMounted(() => {
      initCharts();
    });

    onActivated(() => {
      setTimeout(() => {
        myChart.resize();
      }, 200);
    });

    const initCharts = () => {
      let chartDom = document.getElementById("main-content")!;
      myChart = echarts.init(chartDom);
      option && myChart.setOption(option);
      window.addEventListener("resize", () => {
        setTimeout(() => {
          myChart.resize();
        }, 200);
      });
    };
  },
});
</script>

<style lang="scss" scoped>
:deep(.el-card__body) {
  padding: 10px;
}
.development {
  width: 100%;
  height: 700px;
}
</style>
