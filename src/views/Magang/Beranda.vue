<template>
  <div class="min-h-screen bg-gray-50 font-sans">
    <navbar />

    <header
      class="relative bg-blue-800 text-white py-20 px-4 text-center overflow-hidden"
    >
      <div class="relative z-10">
        <h2 class="text-4xl md:text-5xl font-extrabold mb-4">
          Pendaftaran Magang & PKL
        </h2>
        <p class="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
          Bergabunglah bersama Balai Pendidikan dan Pelatihan Hukum Jawa Tengah.
          Dapatkan pengalaman kerja nyata di instansi pemerintahan.
        </p>
        <router-link
          to="/daftar-magang"
          class="inline-block bg-white text-blue-900 px-8 py-3 rounded-full font-bold text-lg hover:bg-blue-50 transition transform hover:scale-105 shadow-xl"
        >
          Daftar Sekarang
        </router-link>
      </div>
      <div
        class="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none"
      >
        <div
          class="absolute -top-10 -left-10 w-64 h-64 bg-white rounded-full"
        ></div>
      </div>
    </header>

    <section
      class="container mx-auto -mt-10 px-4 grid md:grid-cols-2 gap-6 relative z-20"
    >
      <div
        class="bg-white p-6 rounded-xl shadow-md border-t-4 border-green-500 hover:shadow-xl transition"
      >
        <div class="flex items-center mb-4">
          <span class="text-3xl mr-4">📍</span>
          <h3 class="text-xl font-bold text-gray-800">Presensi Harian</h3>
        </div>
        <p class="text-gray-600 mb-4">
          Lakukan absensi masuk dan pulang secara digital selama masa magang.
        </p>
        <button class="text-green-600 font-semibold hover:underline">
          Klik Presensi &rarr;
        </button>
      </div>

      <div
        class="bg-white p-6 rounded-xl shadow-md border-t-4 border-blue-500 hover:shadow-xl transition"
      >
        <div class="flex items-center mb-4">
          <span class="text-3xl mr-4">📝</span>
          <h3 class="text-xl font-bold text-gray-800">Laporan Kegiatan</h3>
        </div>
        <p class="text-gray-600 mb-4">
          Unggah jurnal harian dan laporan progres pekerjaan Anda di sini.
        </p>
        <button class="text-blue-600 font-semibold hover:underline">
          Isi Laporan &rarr;
        </button>
      </div>
    </section>

    <section class="container mx-auto py-16 px-4">
      <div class="flex items-center justify-between mb-8">
        <h2
          class="text-3xl font-bold text-gray-800 border-l-8 border-orange-500 pl-4"
        >
          Kegiatan Magang
        </h2>
        <button class="text-blue-700 font-medium">Lihat Semua Galeri</button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          v-for="(foto, index) in kegiatan"
          :key="index"
          class="group relative overflow-hidden rounded-xl shadow-lg bg-gray-200 aspect-video"
        >
          <img
            :src="foto.url"
            :alt="foto.judul"
            class="object-cover w-full h-full group-hover:scale-110 transition duration-500"
          />
          <div
            class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent"
          >
            <p class="text-white text-sm font-medium">{{ foto.judul }}</p>
          </div>
        </div>
      </div>
    </section>

    <footer class="bg-gray-800 text-gray-300 py-10 px-4 mt-12">
      <div class="container mx-auto text-center">
        <p class="font-bold text-white mb-2">Badiklat Hukum Jawa Tengah</p>
        <p class="text-sm">Kementerian Hukum Republik Indonesia</p>
        <div class="mt-6 border-t border-gray-700 pt-6 text-xs text-gray-500">
          &copy; 2026 Badiklat Hukum Jateng. All Rights Reserved.
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Navbar from "../../components/Navbar.vue";

const kegiatan = ref([
  {
    judul: "Orientasi Mahasiswa Baru",
    url: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800",
  },
  {
    judul: "Diskusi Kelompok Rutin",
    url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800",
  },
  {
    judul: "Kunjungan Lapangan",
    url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800",
  },
]);
</script>

<style scoped>
/* Tambahkan kustomisasi style di sini jika diperlukan */
</style>
