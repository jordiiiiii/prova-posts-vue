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
    path: "/about",
    name: "About",
    component: () => import("@/views/About")
  },
  {
    path: "/admin/posts",
    name: "admin-post-list",
    component: () => import("@/views/AdminPostList")
  },
  {
    path: "/admin/posts/:id/edit",
    name: "admin-post-edit",
    component: () => import("@/views/AdminPostEdit"),
    params: true
  },
  {
    path: "/post/new",
    name: "post-create",
    component: () => import("@/views/PostCreate")
  },
  {
    path: "/post/:id",
    name: "single-post",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/SinglePost")
  },
  {
    path: "/tag/new",
    name: "tag-create",
    component: () => import("@/views/TagCreate")
  },
  {
    path: "/tag/:id",
    name: "tag",
    component: () => import("@/views/TagPostList"),
    params: true
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
