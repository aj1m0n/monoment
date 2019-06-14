import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import about from "./views/About.vue";

import top from "./views/top.vue";
Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/SignIn",
      name: "login",
      component: () => import("./views/SignIn.vue")
    },
    {
      path: "/home",
      name: "home",
      component: () => import("./views/Home.vue"),
      meta: { requiresAuth: true }
    },
    {
      path: "/inworkspace",
      name: "inworkspace",
      component: () => import("./views/InWorkSpace.vue"),
      meta: { requiresAuth: true }
    },
    {
      path: "/crateworkspace",
      name: "crateworkspace",
      component: () => import("./views/CrateWorkSpace.vue"),
      meta: { requiresAuth: true }
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: about
    }
  ]
});
