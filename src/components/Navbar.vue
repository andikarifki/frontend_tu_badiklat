<template>
  <nav class="bg-blue-900 text-white p-4 shadow-lg sticky top-0 z-50">
    <div class="container mx-auto flex justify-between items-center">
      <div class="flex items-center space-x-3">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Logo_of_the_Ministry_of_Law_and_Human_Rights_of_the_Republic_of_Indonesia.svg/1280px-Logo_of_the_Ministry_of_Law_and_Human_Rights_of_the_Republic_of_Indonesia.svg.png"
          alt="Logo Kemenkumham"
          class="h-10 w-auto object-contain"
        />
        <div>
          <h1 class="text-xl font-bold tracking-tight leading-tight">
            Badiklat Hukum
          </h1>
          <p
            class="text-[10px] uppercase tracking-widest text-blue-200 leading-none"
          >
            Jawa Tengah
          </p>
        </div>
      </div>

      <div class="space-x-6 flex items-center">
        <router-link
          to="/"
          class="transition hidden md:block"
          :class="
            $route.path === '/'
              ? 'text-blue-200 font-bold border-b-2 border-orange-500'
              : 'hover:text-blue-200'
          "
        >
          Beranda
        </router-link>

        <router-link
          to="/pengumuman"
          class="transition hidden md:block"
          :class="
            $route.path === '/pengumuman'
              ? 'text-blue-200 font-bold border-b-2 border-orange-500'
              : 'hover:text-blue-200'
          "
        >
          Pengumuman
        </router-link>

        <button
          class="bg-orange-500 px-4 py-2 rounded-lg font-semibold hover:bg-orange-600 transition shadow-md"
        >
          Login
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
// Menggunakan useRoute untuk mendeteksi halaman aktif secara otomatis
import { useRoute } from "vue-router";
const $route = useRoute();
</script>
