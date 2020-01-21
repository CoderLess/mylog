import Vue from "vue"
import VueRouter from "vue-router"
import Login from "../components/login/Login.vue"
import UserLogin from "../components/login/UserLogin.vue"
import UserRegister from "../components/login/UserRegister.vue"
import Index from "../components/main/Index.vue"
Vue.use(VueRouter)
const routes = [
  {
    path: "/",
    component: Login,
    redirect: "/login",
    children: [
      {
        path: "/login",
        component: UserLogin
      },
      {
        path: "/register",
        component: UserRegister
      }
    ]
  },
  {
    path: "/index",
    component: Index
  }
]

const router = new VueRouter({
  mode: "history",
  routes
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
  if (to.path === "/login" || to.path === "/register") return next()
  // 检查用户是否登入
  const tokenStr = window.sessionStorage.getItem("token")
  // 没有token则跳转到登入页面
  if (!tokenStr) return next("/login")
  return next();
})

export default router
