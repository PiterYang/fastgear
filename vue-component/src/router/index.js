import Router from "vue-router";
import Vue from "vue";

Vue.use(Router);

const myRoutes = [
  {
    path: "/",
    name: "app",
    redirect: "/component",
    component: () => import(/* webpackChunkName: "season" */ "../pages/header"),
    children: [
      {
        name: "home",
        path: "home",
        component: () =>
          import(/* webpackChunkName: "season" */ "../pages/home")
      },
      {
        path: "/component",
        name: "component",
        redirect: "/component/season",
        component: () =>
          import(/* webpackChunkName: "season" */ "../pages/component"),

        children: [
          {
            path: "season",
            name: "season",
            component: () =>
              import(
                /* webpackChunkName: "season" */ "../pages/components/season"
              )
          },
          {
            path: "todo",
            name: "todo",
            component: () =>
              import(
                /* webpackChunkName: "season" */ "../pages/components/todo"
              )
          },
          {
            path: "guard",
            name: "guard",
            component: () =>
              import(
                /* webpackChunkName: "season" */ "../pages/components/guard"
              )
          }
        ]
      },
      {
        path: "/guard",
        name: "guard",
        component: () =>
          import(/* webpackChunkName: "season" */ "../pages/guard")
      },
      {
        path: "/resource",
        name: "resource",
        component: () =>
          import(/* webpackChunkName: "season" */ "../pages/resource")
      }
    ]
  },

  {
    path: "/404",
    name: "404",
    component: () => import(/* webpackChunkName: "season" */ "../pages/404")
  }
];

const router = new Router({
  mode: "history",
  routes: myRoutes,
  scrollBehavior() {
    // 每次切换路由页面回到顶部
    return { x: 0, y: 0 };
  }
});
export default router;
