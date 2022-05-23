<template>
  <div>
    <Achievement />
    <DataGraph />
    <DataMap />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import Achievement from "./compoment/Achievement/index.vue";
import DataGraph from "./compoment/DataGraph/index.vue";
import DataMap from "./compoment/DataMap/index.vue";
export default defineComponent({
  name: "Home",
  components: {
    Achievement,
    DataGraph,
    DataMap,
  },
  setup() {
    onMounted(() => {});
  },
});
</script>

<style></style>
