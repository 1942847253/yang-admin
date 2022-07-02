<template>
  <div class="content" :style="`background-color:${store.dark ? '#1d1e1f' : '#fff'}`">
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useUserStore } from 'src/store/userStore'

export default defineComponent({
  name: "Content",
  setup() {
    const store = useUserStore();

    return {
      store
    }
  },
});
</script>

<style scoped lang="scss">
</style>
