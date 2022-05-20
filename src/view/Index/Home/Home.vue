<template>
  <div>
    <Achievement />
    <DataGraph />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import Achievement from "./compoment/Achievement/index.vue";
import DataGraph from "./compoment/DataGraph/index.vue";
export default defineComponent({
  name: "Home",
  components: {
    Achievement,
    DataGraph,
  },
  setup() {
    onMounted(() => {});
  },
});
</script>

<style></style>
