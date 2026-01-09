<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-2xl font-bold text-slate-800">Data Peserta Magang</h1>
        <p class="text-slate-500 text-sm">
          Kelola informasi siswa/mahasiswa magang di BADIKLAT JATENG
        </p>
      </div>
      <button
        class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
            clip-rule="evenodd"
          />
        </svg>
        Tambah Peserta
      </button>
    </div>

    <div
      class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
    >
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-slate-50 border-b border-slate-200">
              <th
                class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider"
              >
                Nama Peserta
              </th>
              <th
                class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider"
              >
                Asal Sekolah/Univ
              </th>
              <th
                class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider"
              >
                Jurusan
              </th>
              <th
                class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider"
              >
                WhatsApp
              </th>
              <th
                class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center"
              >
                Aksi
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr
              v-for="(peserta, index) in daftarMagang"
              :key="index"
              class="hover:bg-slate-50 transition-colors"
            >
              <td class="px-6 py-4">
                <div class="font-semibold text-slate-700">
                  {{ peserta.nama }}
                </div>
              </td>
              <td class="px-6 py-4 text-slate-600">
                {{ peserta.asalSekolah }}
              </td>
              <td class="px-6 py-4">
                <span
                  class="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-medium"
                >
                  {{ peserta.jurusan }}
                </span>
              </td>
              <td class="px-6 py-4">
                <a
                  :href="'https://wa.me/' + peserta.whatsapp"
                  target="_blank"
                  class="flex items-center gap-2 text-green-600 hover:text-green-700 font-medium"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.246 2.248 3.484 5.232 3.484 8.412-.003 6.557-5.338 11.892-11.893 11.892-1.997-.001-3.951-.5-5.688-1.448l-6.309 1.656zm6.224-3.82s.297.176.706.43c1.314.813 2.822 1.241 4.373 1.242 4.659 0 8.452-3.793 8.454-8.452.002-4.659-3.791-8.453-8.452-8.453-4.659 0-8.451 3.793-8.454 8.453-.001 1.637.471 3.23 1.366 4.605l.43.663-.997 3.64 3.743-.981z"
                    />
                  </svg>
                  {{ peserta.whatsapp }}
                </a>
              </td>
              <td class="px-6 py-4 text-center">
                <button class="text-slate-400 hover:text-indigo-600 mx-1">
                  Edit
                </button>
                <button class="text-slate-400 hover:text-red-600 mx-1">
                  Hapus
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const daftarMagang = ref([
  {
    nama: "Budi Santoso",
    asalSekolah: "SMKN 1 Semarang",
    jurusan: "RPL",
    whatsapp: "6281234567890",
  },
  {
    nama: "Siti Aminah",
    asalSekolah: "Universitas Diponegoro",
    jurusan: "Informatika",
    whatsapp: "6289876543210",
  },
  {
    nama: "Rizky Fauzi",
    asalSekolah: "SMKN 2 Salatiga",
    jurusan: "TKJ",
    whatsapp: "628555444333",
  },
]);
</script>
