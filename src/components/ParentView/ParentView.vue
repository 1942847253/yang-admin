<template>
  <router-view v-slot="{ Component }">
    <keep-alive exclude="Home">
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>
