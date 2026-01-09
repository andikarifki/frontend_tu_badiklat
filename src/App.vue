<template>
  <div v-if="$route.meta.hideSidebar" class="bg-slate-50 min-h-screen">
    <router-view></router-view>
  </div>

  <div v-else class="flex min-h-screen bg-slate-50 transition-all duration-300">
    <Sidebar v-model="isCollapsed" @logout="handleLogout" />

    <main
      :class="[isCollapsed ? 'ml-20' : 'ml-72']"
      class="flex-1 p-4 md:p-8 transition-all duration-300"
    >
      <router-view></router-view>
    </main>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "./axios";
import Sidebar from "./components/Sidebar.vue"; // Import komponen

const $router = useRouter();
const isCollapsed = ref(false);

const handleLogout = async () => {
  if (confirm("Apakah anda yakin ingin logout?")) {
    try {
      await axios.post("/logout");
      localStorage.removeItem("token");
      $router.push("/admin");
    } catch (error) {
      console.error(error);
      localStorage.removeItem("token");
      $router.push("/admin");
    }
  }
};
</script>
