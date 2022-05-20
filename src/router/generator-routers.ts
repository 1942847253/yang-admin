const Routes = [
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
];

export default Routes;
