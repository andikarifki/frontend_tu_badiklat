<template>
  <div v-if="isLoginPage" class="bg-slate-50">
    <router-view></router-view>
  </div>

  <div v-else class="flex min-h-screen bg-slate-50 transition-all duration-300">
    <aside
      :class="[isCollapsed ? 'w-20' : 'w-72']"
      class="bg-slate-900 text-white flex flex-col fixed h-full z-40 transition-all duration-300 ease-in-out border-r border-slate-800"
    >
      <div
        class="p-6 flex items-center h-20 border-b border-slate-800 overflow-hidden whitespace-nowrap"
      >
        <div
          class="h-10 w-10 shrink-0 shadow-lg shadow-indigo-500/20 overflow-hidden rounded-xl border border-slate-700"
        >
          <img
            src="/logo-menkum.svg"
            alt="Profile"
            class="h-full w-full object-cover bg-white p-1"
          />
        </div>
        <div v-show="!isCollapsed" class="ml-3 transition-opacity duration-300">
          <h2
            class="font-bold text-sm tracking-tight leading-none text-white uppercase"
          >
            SEHATI Tata Usaha
          </h2>
          <p class="text-[10px] text-slate-400 font-medium uppercase mt-1">
            BADIKLAT JATENG
          </p>
        </div>
      </div>

      <nav class="flex-1 p-4 space-y-2 mt-4 overflow-hidden">
        <router-link
          to="/dashboard"
          class="flex items-center gap-4 px-4 py-3 rounded-xl transition-all group overflow-hidden whitespace-nowrap"
          active-class="bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
          :class="[
            $route.path !== '/dashboard'
              ? 'text-slate-400 hover:bg-slate-800 hover:text-white'
              : '',
          ]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          <span v-show="!isCollapsed" class="font-semibold text-sm"
            >Dashboard</span
          >
        </router-link>

        <router-link
          to="/pegawai"
          class="flex items-center gap-4 px-4 py-3 rounded-xl transition-all group overflow-hidden whitespace-nowrap"
          active-class="bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
          :class="[
            $route.path !== '/pegawai'
              ? 'text-slate-400 hover:bg-slate-800 hover:text-white'
              : '',
          ]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
          <span v-show="!isCollapsed" class="font-semibold text-sm"
            >Data Pegawai</span
          >
        </router-link>
      </nav>

      <div class="p-4 border-t border-slate-800 space-y-2">
        <button
          @click="handleLogout"
          class="w-full flex items-center gap-4 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-all overflow-hidden whitespace-nowrap"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          <span v-show="!isCollapsed" class="font-semibold text-sm"
            >Logout</span
          >
        </button>

        <button
          @click="isCollapsed = !isCollapsed"
          class="w-full flex items-center justify-center p-2 rounded-xl bg-slate-800 hover:bg-slate-700 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 transition-transform duration-500"
            :class="{ 'rotate-180': isCollapsed }"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
            />
          </svg>
        </button>
      </div>
    </aside>

    <main
      :class="[isCollapsed ? 'ml-20' : 'ml-72']"
      class="flex-1 p-4 md:p-8 transition-all duration-300"
    >
      <router-view></router-view>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "./axios"; // Pastikan path axios benar

const $route = useRoute();
const $router = useRouter();

const isCollapsed = ref(false);

// LOGIKA PENTING: Cek apakah halaman saat ini adalah login (/)
const isLoginPage = computed(() => $route.path === "/");

const handleLogout = async () => {
  if (confirm("Apakah anda yakin ingin logout?")) {
    try {
      await axios.post("/logout");
      localStorage.removeItem("token");
      $router.push("/");
    } catch (error) {
      console.error(error);
      localStorage.removeItem("token"); // Paksa hapus jika error
      $router.push("/");
    }
  }
};
</script>
