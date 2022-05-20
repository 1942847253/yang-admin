<template>
  <div class="side-bar">
    <el-menu
      router
      :collapse="store.collapse"
      :default-active="current"
      active-text-color="#fff"
      background-color="#001529"
      @select="selectMenu"
      :class="`el-menu-vertical-demo ${store.collapse && 'hideIcon'}`"
      style="height: 100vh"
      text-color="#ffffffa6"
    >
      <div class="logo">
        <el-avatar :size="35" :src="Logo" />
        <span v-if="!store.collapse">&nbsp;YangAdmin</span>
      </div>
      <el-menu-item index="/index/home">
        <el-icon><List /></el-icon>
        <template #title>首页</template>
      </el-menu-item>
      <div v-for="(item, index) of store.userRouters" :key="index">
        <MenuItem
          :index="(index + 1).toString()"
          :collapse="store.collapse"
          :item="item"
        />
      </div>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { useRouter } from "vue-router";
import MenuItem from "../MenuItem/MenuItem.vue";
import { defineComponent, computed, ref } from "vue";
import { useUserStore } from "../../../store/userStore";
export default defineComponent({
  name: "SideBar",
  components: {
    MenuItem,
  },
  setup() {
    const store = useUserStore();
    const router = useRouter();
    const activatedStyle = ref<string>(router.currentRoute.value.path);
    const Logo: string = "https://q1.qlogo.cn/g?b=qq&nk=1942847253&s=100";
    const selectMenu = (index: string) => {
      activatedStyle.value = index;
    };
    return {
      store,
      current: computed(() => router.currentRoute.value.path),
      selectMenu,
      activatedStyle,
      Logo,
    };
  },
});
</script>

<style scoped lang="scss">
.side-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 10px;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu--collapse {
  width: 60px;
  overflow: hidden;
}
.hideIcon:deep(.el-sub-menu .el-sub-menu__icon-arrow) {
  display: none;
}
.logo {
  display: flex;
  align-items: center;
  cursor: pointer;
  height: 48px;
  padding: 10px 4px 10px 5px;
  span {
    margin-left: 10px;
    font-size: 16px;
    font-weight: 700;
    line-height: normal;
    color: rgb(229, 229, 229);
    transition: all 0.5s ease;
  }
}
.avatar-logo {
  padding: 10px 0 5px 10px;
}
.el-menu-item.is-active {
  background-color: #0960bd !important;
}
</style>
