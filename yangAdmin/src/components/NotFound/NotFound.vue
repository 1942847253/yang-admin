<template>
  <div class="wscn-http404-container">
    <div class="wscn-http404">
      <div class="pic-404">
        <img
          class="pic-404__parent"
          src="src/assets/404_images/404.png"
          alt="404"
        />
        <img
          class="pic-404__child left"
          src="src/assets/404_images/404_cloud.png"
          alt="404"
        />
        <img
          class="pic-404__child mid"
          src="src/assets/404_images/404_cloud.png"
          alt="404"
        />
        <img
          class="pic-404__child right"
          src="src/assets/404_images/404_cloud.png"
          alt="404"
        />
      </div>
      <div class="bullshit">
        <div class="bullshit__oops">Sorry!</div>

        <div class="bullshit__headline">{{ message }}</div>
        <div class="bullshit__info">
          请检查您输入的网址是否正确，或点击下方按钮返回首页。
        </div>
        <a @click="routeBack" class="bullshit__return-home">返回首页</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "404",
  computed: {
    message() {
      return "无法进入此页面...";
    },
  },

  setup() {
    const router = useRouter();
    const routeBack = () => {
      router.push("/index");
    };

    return {
      routeBack,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
