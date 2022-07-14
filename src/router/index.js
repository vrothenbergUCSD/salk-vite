import { createRouter, createWebHistory } from 'vue-router'
//import firebase from "firebase/app";
//import "firebase/auth";

const routes = [
  
  {
    path: "/",
    name: "Home",
    component: () => import('@/views/Home.vue'),
    meta: {
      title: "Home",
      requiresAuth: false,
    },
  },
  {
    path: "/main",
    name: "Main",
    component: () => import('@/views/Main.vue'),
    meta: {
      title: "Main",
      requiresAuth: false,
    },
  },
  {
    path: "/graph",
    name: "Graph",
    component: () => import('@/views/Graph.vue'),
    meta: {
      title: "Graph",
      requiresAuth: false,
    },
  },
  {
    path: "/test",
    name: "Test",
    component: () => import('@/views/Test.vue'),
    meta: {
      title: "Test",
      requiresAuth: false,
    },
  },
  
  
];


const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory('/'),
  routes, // short for `routes: routes`
  linkActiveClass: 'text-white bg-gray-900'
})


router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | Panda Data Viz`;
  next();
});

export {
  router,
}

