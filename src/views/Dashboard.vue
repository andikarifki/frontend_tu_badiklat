<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold text-gray-800">
      Welcome to Dashboard SEHATI-TU
    </h1>
    <p class="text-gray-600 mt-2">
      Ini adalah halaman beranda aplikasi layanan Kesekretariatan Sub Bagian
      Tata Usaha Balai Pendidikan dan Pelatihan Hukum Jawa Tengah.
    </p>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 class="text-gray-500 text-sm font-medium">Total Pegawai</h3>
        <p v-if="loading" class="text-xl text-gray-400 animate-pulse">
          Memuat...
        </p>
        <p v-else class="text-3xl font-bold text-blue-600">
          {{ totalPegawai }}
        </p>
      </div>

      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 class="text-gray-500 text-sm font-medium">Hadir Hari Ini</h3>
        <p class="text-3xl font-bold text-green-600">15</p>
      </div>

      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 class="text-gray-500 text-sm font-medium">Dinas Luar</h3>
        <p class="text-3xl font-bold text-yellow-600">5</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "../axios"; // Pastikan path axios sudah benar

const totalPegawai = ref(0);
const loading = ref(true);

const fetchTotalPegawai = async () => {
  try {
    loading.value = true;
    const response = await axios.get("/pegawai");

    // Jika API mengembalikan array, kita hitung panjangnya
    if (Array.isArray(response.data)) {
      totalPegawai.value = response.data.length;
    } else if (response.data.total) {
      // Jika API mengembalikan objek seperti { total: 20 }
      totalPegawai.value = response.data.total;
    }
  } catch (error) {
    console.error("Gagal mengambil data pegawai:", error);
    totalPegawai.value = 0;
  } finally {
    loading.value = false;
  }
};

// Jalankan fungsi saat komponen dibuka
onMounted(() => {
  fetchTotalPegawai();
});
</script>
