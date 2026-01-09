import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Pegawai from "../views/Pegawai.vue";
import Login from "../views/Login.vue";
import Beranda from "../views/Magang/Beranda.vue";
import DaftarMagang from "../views/Magang/DaftarMagang.vue";
import Pengumuman from "../views/Magang/Pengumuman.vue";
import PesertaMagang from "../views/PesertaMagang.vue";
import CalonMagang from "../views/CalonMagang.vue";

const routes = [
  {
    path: "/",
    name: "Beranda",
    component: Beranda,
    meta: { hideSidebar: true },
  },
  {
    path: "/admin",
    name: "Login",
    component: Login,
    meta: { hideSidebar: true },
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
  {
    path: "/peserta-magang",
    name: "PesertaMagang",
    component: PesertaMagang,
  },
  {
    path: "/calon-magang",
    name: "CalonMagang",
    component: CalonMagang,
  },
  {
    path: "/daftar-magang",
    name: "DaftarMagang",
    component: DaftarMagang,
    meta: { hideSidebar: true },
  },
  {
    path: "/pengumuman",
    name: "Pengumuman",
    component: Pengumuman,
    meta: { hideSidebar: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
