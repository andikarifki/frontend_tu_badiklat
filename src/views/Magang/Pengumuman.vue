<template>
  <div class="min-h-screen bg-gray-50 font-sans">
    <navbar />

    <header class="bg-blue-800 text-white py-16 px-4 text-center">
      <div class="container mx-auto">
        <h2 class="text-4xl font-extrabold mb-4">Informasi Pengumuman</h2>
        <p class="text-lg text-blue-100 max-w-2xl mx-auto">
          Dapatkan berita terbaru mengenai seleksi, jadwal kegiatan, dan
          informasi penting lainnya di lingkungan Badiklat Hukum Jawa Tengah.
        </p>
      </div>
    </header>

    <main class="container mx-auto -mt-8 px-4 pb-20 relative z-20">
      <div
        class="flex flex-wrap gap-2 mb-8 justify-center bg-white p-4 rounded-xl shadow-md border border-gray-100"
      >
        <button
          v-for="cat in categories"
          :key="cat"
          @click="activeFilter = cat"
          :class="[
            'px-5 py-2 rounded-full text-sm font-bold transition-all duration-200',
            activeFilter === cat
              ? 'bg-orange-500 text-white shadow-md'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
          ]"
        >
          {{ cat }}
        </button>
      </div>

      <div class="grid gap-6 max-w-5xl mx-auto">
        <div
          v-for="(item, index) in filteredAnnouncements"
          :key="index"
          class="bg-white rounded-xl shadow-sm border-l-4 border-blue-900 overflow-hidden hover:shadow-xl transition-all duration-300 group"
        >
          <div
            class="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <div class="flex-1">
              <div class="flex items-center space-x-3 mb-3">
                <span
                  :class="getCategoryClass(item.kategori)"
                  class="text-[10px] uppercase font-bold px-2 py-1 rounded tracking-widest"
                >
                  {{ item.kategori }}
                </span>
                <span class="text-gray-400 text-sm flex items-center">
                  <span class="mr-1">📅</span> {{ item.tanggal }}
                </span>
              </div>
              <h3
                class="text-xl font-bold text-gray-800 group-hover:text-blue-700 transition"
              >
                {{ item.judul }}
              </h3>
              <p
                class="text-gray-600 mt-2 line-clamp-2 text-sm leading-relaxed italic"
              >
                {{ item.deskripsi }}
              </p>
            </div>

            <div class="flex-shrink-0">
              <button
                class="w-full md:w-auto px-6 py-2 bg-blue-900 text-white text-sm font-bold rounded-lg hover:bg-blue-700 transition shadow-sm"
              >
                Baca Detail
              </button>
            </div>
          </div>
        </div>

        <div
          v-if="filteredAnnouncements.length === 0"
          class="text-center py-20 bg-white rounded-xl border border-gray-200 shadow-inner"
        >
          <p class="text-gray-400 text-lg italic">
            Tidak ada pengumuman di kategori ini.
          </p>
        </div>
      </div>
    </main>

    <footer class="bg-gray-800 text-gray-300 py-10 px-4">
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
import { ref, computed } from "vue";
import Navbar from "../../components/Navbar.vue";

const activeFilter = ref("Semua");
const categories = ["Semua", "Seleksi", "Jadwal", "Administrasi", "Berita"];

const dataPengumuman = ref([
  {
    judul: "Hasil Seleksi Administrasi Magang Gelombang I 2026",
    kategori: "Seleksi",
    tanggal: "05 Jan 2026",
    deskripsi:
      "Peserta yang dinyatakan lolos wajib mengikuti tahap pembekalan. Silakan unduh daftar nama lengkap melalui tombol detail.",
  },
  {
    judul: "Penyesuaian Jam Kerja Peserta PKL",
    kategori: "Jadwal",
    tanggal: "02 Jan 2026",
    deskripsi:
      "Menindaklanjuti peraturan terbaru, jam kerja operasional kantor mengalami penyesuaian untuk seluruh unit kerja.",
  },
  {
    judul: "Panduan Penulisan Laporan Akhir Badiklat",
    kategori: "Administrasi",
    tanggal: "28 Des 2025",
    deskripsi:
      "Informasi mengenai template laporan akhir dan tata cara pengunggahan berkas untuk pengajuan sertifikat magang.",
  },
]);

const filteredAnnouncements = computed(() => {
  if (activeFilter.value === "Semua") return dataPengumuman.value;
  return dataPengumuman.value.filter(
    (item) => item.kategori === activeFilter.value
  );
});

const getCategoryClass = (cat) => {
  switch (cat) {
    case "Seleksi":
      return "bg-green-100 text-green-700";
    case "Jadwal":
      return "bg-orange-100 text-orange-700";
    case "Administrasi":
      return "bg-purple-100 text-purple-700";
    default:
      return "bg-blue-100 text-blue-700";
  }
};
</script>
