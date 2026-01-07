import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Pegawai from "../views/Pegawai.vue";
import Login from "../views/Login.vue";

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/pegawai",
    name: "Pegawai",
    component: Pegawai,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
