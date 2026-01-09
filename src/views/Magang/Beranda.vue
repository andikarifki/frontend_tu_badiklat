<template>
  <div class="min-h-screen bg-gray-50 font-sans">
    <navbar />

    <header
      class="relative bg-blue-900 text-white py-24 px-4 text-center overflow-hidden min-h-[450px] flex items-center justify-center"
    >
      <div
        class="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 hover:scale-110"
        :style="{ backgroundImage: `url('/IMG_7523.JPG')` }"
      >
        <div class="absolute inset-0 bg-black/60 mix-blend-multiply"></div>
      </div>

      <div class="relative z-10 w-full max-w-4xl px-6">
        <h2
          class="text-5xl md:text-6xl font-black mb-6 tracking-tight drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)]"
        >
          Pendaftaran <span class="text-orange-400">Magang & PKL</span>
        </h2>

        <p
          class="text-xl text-blue-50 mb-10 max-w-3xl mx-auto leading-relaxed drop-shadow-md"
        >
          Bergabunglah bersama
          <span class="font-semibold text-white whitespace-nowrap">
            Balai Pendidikan dan Pelatihan Hukum Jawa Tengah.
          </span>
          <span class="block md:inline mt-2 md:mt-0">
            Dapatkan pengalaman kerja nyata di instansi pemerintahan.
          </span>
        </p>

        <router-link
          to="/daftar-magang"
          class="inline-block bg-orange-500 text-white px-12 py-4 rounded-full font-bold text-xl hover:bg-orange-600 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(249,115,22,0.4)] shadow-xl"
        >
          Daftar Sekarang
        </router-link>
      </div>

      <div
        class="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none z-10"
      >
        <div
          class="absolute -top-24 -left-24 w-96 h-96 bg-blue-400 rounded-full blur-[120px]"
        ></div>
        <div
          class="absolute -bottom-24 -right-24 w-96 h-96 bg-orange-400 rounded-full blur-[120px]"
        ></div>
      </div>
    </header>

    <section class="container mx-auto py-16 px-4">
      <div class="flex items-center justify-between mb-8">
        <h2
          class="text-3xl font-bold text-gray-800 border-l-8 border-orange-500 pl-4"
        >
          Lensa Galeri
        </h2>
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

    <section class="container mx-auto py-12 px-4">
      <div
        class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
      >
        <div
          class="p-6 border-b border-gray-100 bg-gray-50 flex justify-between items-center"
        >
          <h2 class="text-2xl font-bold text-gray-800">Daftar Peserta Aktif</h2>
          <span
            class="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider"
          >
            Januari 2026
          </span>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr
                class="text-gray-400 text-sm uppercase tracking-wider border-b border-gray-100"
              >
                <th class="px-6 py-4 font-semibold">Nama Peserta</th>
                <th class="px-6 py-4 font-semibold">Asal Institusi</th>
                <th class="px-6 py-4 font-semibold">Jurusan</th>
                <th class="px-6 py-4 font-semibold text-center">Status</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-50">
              <tr
                v-for="(peserta, index) in daftarPeserta"
                :key="index"
                class="hover:bg-blue-50/50 transition"
              >
                <td class="px-6 py-4">
                  <div class="font-bold text-gray-800">{{ peserta.nama }}</div>
                </td>
                <td class="px-6 py-4 text-gray-600">{{ peserta.institusi }}</td>
                <td class="px-6 py-4 text-gray-600">{{ peserta.jurusan }}</td>
                <td class="px-6 py-4 text-center">
                  <span
                    class="px-3 py-1 text-xs font-bold rounded-full bg-green-100 text-green-700"
                  >
                    Aktif
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
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
    judul: "Harmoni Dalam Langkah",
    url: "/1.JPG",
  },
  {
    judul: "Diskusi Kelompok Rutin",
    url: "/2.JPG",
  },
  {
    judul: "Orientasi Peserta Magang",
    url: "/3.JPG",
  },
]);

// Data Peserta Magang
const daftarPeserta = ref([
  {
    nama: "Ahmad Subarjo",
    institusi: "Universitas Diponegoro",
    jurusan: "Ilmu Hukum",
  },
  { nama: "Siti Aminah", institusi: "UNNES", jurusan: "Administrasi Publik" },
  {
    nama: "Budi Santoso",
    institusi: "SMK Negeri 1 Semarang",
    jurusan: "Teknik Informatika",
  },
  {
    nama: "Riana Putri",
    institusi: "Universitas Sebelas Maret",
    jurusan: "Hukum Tata Negara",
  },
]);
</script>
