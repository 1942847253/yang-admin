import { RouteRecordRaw } from "vue-router";
import Layout from "../layout/index.vue";
const Routers: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/index/home",
  },
  {
    path: "/:pathMatch(.*)*",
    name: "404",
    component: () =>
      import(/* chunkName: 404 */ "../components/NotFound/NotFound.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import(/* chunkName: login */ "src/view/login/login.vue"),
  },
  {
    path: "/",
    name: "Layout",
    redirect: "/home",
    component: Layout,
    children: [
      {
        path: "/index",
        name: "Index",
        redirect: "/index/home",
        component: () =>
          import(/* chunkName: Index */ "../components/ParentView/ParentView.vue"),
        children: [
          {
            path: "home",
            name: "Home",
            component: () =>
              import(/* chunkName: Home */ "../view/Index/Home/Home.vue"),
          },
        ],
      },
    ],
  },
];

export default Routers;
