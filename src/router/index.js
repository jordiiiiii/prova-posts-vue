import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/proves",
    name: "proves",
    component: () => import("@/views/Xproves")
  },
  {
    path: "/admin",
    name: "admin",
    component: () => import("@/views/Admin"),
    beforeEnter(to, from, next) {
      let currentUser = JSON.parse(window.localStorage.currentUser);
      if (currentUser && currentUser.admin) {
        next();
      } else {
        next("/");
      }
    },
    children: [
      {
        path: "users",
        name: "admin-user-list",
        component: () => import("@/views/AdminUserList")
      },
      {
        path: "posts",
        name: "admin-post-list",
        component: () => import("@/views/AdminPostList")
      },
      {
        path: "post/new",
        name: "admin-post-create",
        component: () => import("@/views/AdminPostCreate")
      },
      {
        path: "posts/:id/edit",
        name: "admin-post-edit",
        component: () => import("@/views/AdminPostEdit"),
        params: true
      },
      {
        path: "posts/:id/show",
        name: "admin-post-show",
        component: () => import("@/views/AdminPostShow"),
        params: true
      },
      {
        path: "tag/new",
        name: "admin-tag-create",
        component: () => import("@/views/AdminTagCreate")
      }
    ]
  },
  {
    path: "/login",
    name: "user-login",
    component: () => import("@/views/UserLogin")
  },
  {
    path: "/registration",
    name: "user-registration",
    component: () => import("@/views/UserRegistration")
  },
  {
    path: "/post/:id",
    name: "post-view",
    component: () => import("@/views/PostView")
  },
  {
    path: "/tag/:id",
    name: "tag",
    component: () => import("@/views/TagList"),
    params: true
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "@/views/About")
  }
  // {
  //   path: "/dashboard",
  //   name: "dashboard",
  //   component: () => import("@/views/Dashboard"),
  //   meta: { requiresAuth: true }
  // }
];

// router.beforeEach((to, from, next) => {
//   const loggedIn = localStorage.getItem("currentUser");
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     if (!loggedIn) {
//       next("/");
//     } else {
//       next();
//     }
//   } else {
//     next();
//   }
// });

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
