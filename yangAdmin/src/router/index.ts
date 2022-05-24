import {
  createRouter,
  createWebHistory,
  RouteRecordRaw,
} from "vue-router";
import routes from "./routers";
import { generateRouter } from "../utils/index";
import Routers from "./generator-routers";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useUserStore } from '../store/userStore'


enum ELOGINSTATE {
  ISLOGIN = 'Login'
}

const router = createRouter({
  history: createWebHistory("/"),
  routes,
});

const { getLocalStorage } = useLocalStorage();

router.beforeEach(async (to, from, next) => {
  const store = useUserStore();
  const token = getLocalStorage("token") || false;
  const userRouters = store.userRouters;
  const uid = getLocalStorage("uid");

  if (!token && to.name === ELOGINSTATE.ISLOGIN) {
    store.userRouters = [];
    // 未登录 去的是登录页面
    next();
  } else if (!token && to.name !== ELOGINSTATE.ISLOGIN) {
    // 未登录 去的不是登录页面
    next({ name: ELOGINSTATE.ISLOGIN });
  } else if (token && to.name === ELOGINSTATE.ISLOGIN) {
    // 已登录 去的是登录页面
    if (!uid) {
      next();
    } else {
      next({ path: "/" });
    }
  } else if (token && uid && to.name !== ELOGINSTATE.ISLOGIN) {
    // 已登录但是没有用户菜单
    if (userRouters.length === 0) {
      await store.setUserRouters(uid);
      let newRoutes = generateRouter(store.userRouters);
      const layout = routes.find((item: RouteRecordRaw) => item.name == "Layout")!;
      layout.children = [...Routers, ...newRoutes];
      router.addRoute(layout);
      router.replace(to.path);
    }
    store.setNavList(to.fullPath);
    next();
  } else if (!uid) {
    next({ name: ELOGINSTATE.ISLOGIN });
  }
});

export default router;
