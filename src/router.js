import Cookies from 'js-cookie';
import { createWebHistory, createRouter } from "vue-router";
import Home from "./components/Home.vue";
import Login from "./components/Login.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/home",
    component: Home,
  },
  {
    path: "/login",
    component: Login,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {

  const publicPages = ['/login'];
  const authRequired = !publicPages.includes(to.path);
  const res = handleMissingCookieToken();

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && res === '/login') {
    next('/login');
  } else {
    if (!res && to.path === '/login') {
      window.location = '/home';
      return;
    }

    next();
  }
});


function handleMissingCookieToken() {
  const jwtToken = Cookies.get('token') || '';
  if (jwtToken === '') {
      return '/login';
  }

  return null;
}

export default router;