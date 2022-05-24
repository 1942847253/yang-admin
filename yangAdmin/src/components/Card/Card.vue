<template>
  <el-card class="box-card" shadow="never">
    <slot></slot>
  </el-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "Card",
  setup() {},
});
</script>

<style scoped>
.box-card {
  margin-bottom: 4px;
}
</style>
