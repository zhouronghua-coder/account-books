import { createRouter, createWebHistory } from "vue-router";
const routes = [
  {
    path: "/",
    component: () => import("@/layout/normal.vue"),
    children: [
      {
        path: "home",
        name: "home",
        component: () => import("@views/Home/index.vue"),
      },
      {
        path: "me",
        name: "me",
        component: () => import("@views/Me/index.vue"),
      },
    ],
  },
  {
    path: "/auth",
    component: () => import("@/layout/auth.vue"),
    children: [
      {
        path: "login",
        name: "login",
        component: () => import("@views/Login/index.vue"),
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/home",
  },
];

export default createRouter({
  routes,
  history: createWebHistory(),
});
