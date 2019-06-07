import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import firebase from "firebase/app";
import { Location } from "vue-router";

Vue.config.productionTip = false;

const firebaseConfig = {
  apiKey: "AIzaSyAStWFLq9nnbXGIcaZxbNIYNXSTHLfOTbA",
  authDomain: "monoment-ada0c.firebaseapp.com",
  databaseURL: "https://monoment-ada0c.firebaseio.com",
  projectId: "monoment-ada0c",
  storageBucket: "monoment-ada0c.appspot.com",
  messagingSenderId: "804327133994",
  appId: "1:804327133994:web:aeb40d35394cdecb"
};

firebase.initializeApp(firebaseConfig);

store.dispatch("initialize");

type NextType = (
  to?: string | false | void | Location | ((vm: Vue) => any) | undefined
) => void;

const requiresAuthGuard = (next: NextType): void => {
  if (store.getters.isAuthenticated) {
    next();
  } else {
    next({ path: "signin" });
  }
};

const signinGuard = (next: NextType): void => {
  if (store.getters.isAuthenticated) {
    next({ path: "/" });
  } else {
    next();
  }
};

const routerGuard = (next: NextType, guard: (next: NextType) => void) => {
  if (!store.getters.isInitialized) {
    const unwatch = store.watch(
      state => state.initialized,
      () => {
        guard(next);
        unwatch();
      }
    );
  } else {
    guard(next);
  }
};

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    routerGuard(next, requiresAuthGuard);
  } else if (to.path === "/signin") {
    routerGuard(next, signinGuard);
  } else {
    next();
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
