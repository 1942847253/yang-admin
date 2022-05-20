<template>
  <div class="content">
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Content",
  setup() {},
});
</script>

<style scoped lang="scss"></style>
