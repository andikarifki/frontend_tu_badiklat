<template>
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

    <nav class="flex-1 p-4 space-y-2 mt-4 overflow-y-auto custom-scrollbar">
      <router-link
        to="/dashboard"
        class="flex items-center gap-4 px-4 py-3 rounded-xl transition-all group overflow-hidden whitespace-nowrap text-slate-400 hover:text-white hover:bg-slate-800"
        active-class="bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
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
        class="flex items-center gap-4 px-4 py-3 rounded-xl transition-all group overflow-hidden whitespace-nowrap text-slate-400 hover:text-white hover:bg-slate-800"
        active-class="bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
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

      <div class="space-y-1">
        <button
          @click="toggleMagang"
          class="w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all group overflow-hidden whitespace-nowrap text-slate-400 hover:text-white hover:bg-slate-800"
          :class="{
            'bg-slate-800/50 text-white': isMagangOpen && !isCollapsed,
          }"
        >
          <div class="flex items-center gap-4">
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
                d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
              />
            </svg>
            <span v-show="!isCollapsed" class="font-semibold text-sm"
              >Manajemen Magang</span
            >
          </div>
          <svg
            v-show="!isCollapsed"
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 transition-transform duration-300 text-slate-500"
            :class="{ 'rotate-180': isMagangOpen }"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        <transition name="expand">
          <div
            v-show="isMagangOpen && !isCollapsed"
            class="ml-9 space-y-1 overflow-hidden"
          >
            <router-link
              to="/calon-magang"
              class="block px-4 py-2 text-sm font-medium text-slate-400 hover:text-indigo-400 transition-colors border-l border-slate-700"
              active-class="text-indigo-400 border-indigo-500 font-bold"
            >
              Calon Peserta
            </router-link>
            <router-link
              to="/peserta-magang"
              class="block px-4 py-2 text-sm font-medium text-slate-400 hover:text-indigo-400 transition-colors border-l border-slate-700"
              active-class="text-indigo-400 border-indigo-500 font-bold"
            >
              Peserta Aktif
            </router-link>
          </div>
        </transition>
      </div>

      <router-link
        to="/bmn"
        class="flex items-center gap-4 px-4 py-3 rounded-xl transition-all group overflow-hidden whitespace-nowrap text-slate-400 hover:text-white hover:bg-slate-800"
        active-class="bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
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
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
        <span v-show="!isCollapsed" class="font-semibold text-sm"
          >Daftar BMN</span
        >
      </router-link>
    </nav>

    <div class="p-4 border-t border-slate-800 space-y-2">
      <button
        @click="$emit('logout')"
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
        <span v-show="!isCollapsed" class="font-semibold text-sm">Logout</span>
      </button>

      <button
        @click="toggleCollapse"
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
</template>

<script setup>
import { ref, watchEffect } from "vue";

const props = defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue", "logout"]);

const isCollapsed = ref(false);
const isMagangOpen = ref(false);

const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value;
  if (isCollapsed.value) {
    isMagangOpen.value = false;
  }
};

const toggleMagang = () => {
  if (isCollapsed.value) isCollapsed.value = false;
  isMagangOpen.value = !isMagangOpen.value;
};

watchEffect(() => {
  emit("update:modelValue", isCollapsed.value);
});
</script>
