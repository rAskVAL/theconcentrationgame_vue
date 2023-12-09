import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      component: () => import("../layouts/MainLayout.vue"),
      name: "Layout",
      path: "/",
      children: [
        {
          path: "/",
          name: "home",
          component: () => import("../views/HomeView.vue"),
        },
        {
          path: "/about",
          name: "about",
          component: () => import("../views/AboutView.vue"),
        },
        {
          path: "/instructions",
          name: "instructions",
          component: () => import("../views/InstructionsView.vue"),
        },
        {
          path: "/play",
          name: "play",
          component: () => import("../views/PlayView.vue"),
        },
      ],
    },
  ],
});

export default router;
