import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router';

import store from 'src/store';

import main from "./main";
import security from './security';

const routes = [{
  path: '/',
  component: () => import('layouts/MainLayout.vue'),
  children: main
}, {
  path: '/',
  component: () => import('layouts/SecurityLayout.vue'),
  children: security
}, {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

const createHistory = process.env.SERVER
  ? createMemoryHistory
  : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

const router = createRouter({
  scrollBehavior: () => ({ left: 0, top: 0 }),
  routes,
  history: createHistory(process.env.MODE === 'ssr' ? void 0 : process.env.VUE_ROUTER_BASE)
});

router.beforeEach((to, from) => {
  const urls = [
    "/forgotpassword",
    "/login",
    "/register",
    "/register",
  ];

  if(urls.includes(to.path) || to.path.startsWith("/resetpassword")) {
    return true;
  }

  const changePasswordUrl = "/changepassword";

  const isLoggedIn = store.getters["security/isLoggedIn"];
  const requiresPasswordChange = store.getters["security/requiresPasswordChange"];

  if(isLoggedIn) {
    if(requiresPasswordChange && to.path !== changePasswordUrl) {
      return changePasswordUrl;
    }

    return true;
  }

  return "/login";
});

export default router;
