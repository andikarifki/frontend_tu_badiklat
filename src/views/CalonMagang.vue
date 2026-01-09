<template>
  <div class="p-6">
    <div
      class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8"
    >
      <div>
        <h1 class="text-2xl font-bold text-slate-800">Calon Peserta Magang</h1>
        <p class="text-slate-500 text-sm">
          Review dan verifikasi berkas pendaftaran masuk.
        </p>
      </div>

      <div class="flex items-center gap-3">
        <div class="relative">
          <span
            class="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Cari nama/sekolah..."
            class="pl-10 pr-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none w-64 text-sm"
          />
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div
        class="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4"
      >
        <div
          class="h-12 w-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div>
          <p class="text-xs text-slate-500 font-medium uppercase">
            Menunggu Review
          </p>
          <p class="text-xl font-bold text-slate-800">12 Orang</p>
        </div>
      </div>
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
                Info Pendaftar
              </th>
              <th
                class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider"
              >
                Asal & Jurusan
              </th>
              <th
                class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider"
              >
                Dokumen
              </th>
              <th
                class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center"
              >
                Aksi Seleksi
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr
              v-for="(calon, index) in daftarCalon"
              :key="index"
              class="hover:bg-slate-50/50 transition-colors"
            >
              <td class="px-6 py-4">
                <div class="font-semibold text-slate-700">{{ calon.nama }}</div>
                <div class="text-xs text-slate-500">{{ calon.whatsapp }}</div>
              </td>
              <td class="px-6 py-4">
                <div class="text-sm text-slate-700 font-medium">
                  {{ calon.asalSekolah }}
                </div>
                <div class="text-xs text-slate-500">{{ calon.jurusan }}</div>
              </td>
              <td class="px-6 py-4">
                <button
                  class="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Lihat Proposal
                </button>
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center justify-center gap-2">
                  <button
                    @click="terimaPeserta(index)"
                    class="bg-green-100 text-green-700 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-green-200 transition-colors"
                  >
                    Terima
                  </button>
                  <button
                    @click="tolakPeserta(index)"
                    class="bg-red-50 text-red-600 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-red-100 transition-colors"
                  >
                    Tolak
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div
        v-if="daftarCalon.length === 0"
        class="p-12 text-center text-slate-500"
      >
        Belum ada calon peserta yang mendaftar.
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const daftarCalon = ref([
  {
    nama: "Andi Wijaya",
    asalSekolah: "SMK Negeri 7 Semarang",
    jurusan: "Teknik Jaringan Komputer",
    whatsapp: "6281233445566",
    status: "Pending",
  },
  {
    nama: "Clara Shinta",
    asalSekolah: "Universitas Negeri Semarang",
    jurusan: "Administrasi Perkantoran",
    whatsapp: "6285778899001",
    status: "Pending",
  },
]);

const terimaPeserta = (index) => {
  if (
    confirm(
      `Apakah Anda yakin ingin menerima ${daftarCalon.value[index].nama}?`
    )
  ) {
    alert("Peserta berhasil diterima dan dipindahkan ke Data Peserta Aktif.");
    daftarCalon.value.splice(index, 1);
  }
};

const tolakPeserta = (index) => {
  if (confirm(`Tolak pendaftaran ${daftarCalon.value[index].nama}?`)) {
    daftarCalon.value.splice(index, 1);
  }
};
</script>
