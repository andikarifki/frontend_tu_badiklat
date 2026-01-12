<template>
  <div class="p-4 md:p-6">
    <div
      class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8"
    >
      <div>
        <h1 class="text-2xl font-bold text-slate-800">Calon Peserta Magang</h1>
        <p class="text-slate-500 text-sm">
          Manajemen pendaftaran dan verifikasi berkas calon magang.
        </p>
      </div>

      <div class="flex items-center gap-3">
        <div class="relative flex-1 md:flex-none">
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
            v-model="searchQuery"
            type="text"
            placeholder="Cari calon peserta..."
            class="pl-10 pr-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none w-full md:w-64 text-sm transition-all"
          />
        </div>
        <button
          class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-lg shadow-indigo-200 flex items-center gap-2 shrink-0"
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
          <span class="hidden sm:inline">Tambah Manual</span>
        </button>
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
                Pendaftar
              </th>
              <th
                class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider"
              >
                Asal & Jurusan
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
              v-for="(calon, index) in filteredCalon"
              :key="index"
              class="hover:bg-slate-50/50 transition-colors group"
            >
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <img
                    :src="calon.foto"
                    class="h-10 w-10 rounded-full object-cover border-2 border-white shadow-sm"
                  />
                  <div>
                    <div class="font-semibold text-slate-700 leading-tight">
                      {{ calon.nama }}
                    </div>
                    <div class="text-[11px] text-slate-400 font-medium">
                      {{ calon.whatsapp }}
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="text-sm text-slate-700 font-medium leading-tight">
                  {{ calon.asalSekolah }}
                </div>
                <div class="text-xs text-slate-500">{{ calon.jurusan }}</div>
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center justify-center gap-2">
                  <button
                    @click="openDetail(calon)"
                    class="bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap"
                  >
                    Lihat Detail
                  </button>
                  <button
                    @click="confirmDelete(index)"
                    class="p-2 text-slate-300 hover:text-red-500 transition-colors"
                    title="Hapus Data"
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
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <Transition name="modal-fade">
      <div
        v-if="selectedCalon"
        class="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      >
        <div
          class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          @click="selectedCalon = null"
        ></div>

        <div
          class="relative bg-white w-full max-w-lg rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col animate-slide-up"
        >
          <div class="h-24 sm:h-32 bg-indigo-600 shrink-0 relative">
            <button
              @click="selectedCalon = null"
              class="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full transition-colors z-10"
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div
              class="absolute -bottom-10 sm:-bottom-12 left-6 sm:left-1/2 sm:-translate-x-1/2"
            >
              <img
                :src="selectedCalon.foto"
                class="h-20 w-20 sm:h-24 sm:w-24 rounded-2xl object-cover border-4 border-white shadow-xl"
              />
            </div>
          </div>

          <div class="pt-14 sm:pt-16 p-6 sm:p-8 overflow-y-auto">
            <div class="text-left sm:text-center mb-6">
              <h3 class="text-xl font-bold text-slate-800">
                {{ selectedCalon.nama }}
              </h3>
              <p class="text-indigo-600 font-medium text-sm">
                {{ selectedCalon.jurusan }}
              </p>
            </div>

            <div class="grid grid-cols-1 gap-3 sm:gap-4">
              <div class="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <label
                  class="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1"
                  >Asal Institusi</label
                >
                <p class="text-slate-700 font-semibold">
                  {{ selectedCalon.asalSekolah }}
                </p>
              </div>

              <div class="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <label
                  class="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1"
                  >Kontak WhatsApp</label
                >
                <p class="text-slate-700 font-semibold">
                  {{ selectedCalon.whatsapp }}
                </p>
              </div>

              <div class="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <label
                  class="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1"
                  >Alamat Domisili</label
                >
                <p class="text-slate-600 text-sm leading-relaxed">
                  {{ selectedCalon.alamat }}
                </p>
              </div>
            </div>

            <div class="mt-8">
              <button
                @click="selectedCalon = null"
                class="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-bold transition-all text-sm shadow-lg shadow-slate-200"
              >
                Tutup Informasi
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const searchQuery = ref("");
const selectedCalon = ref(null);

const daftarCalon = ref([
  {
    nama: "Ricardo Silva",
    asalSekolah: "SMK Negeri 7 Semarang",
    jurusan: "Teknik Jaringan Komputer",
    whatsapp: "6281233445566",
    alamat:
      "Jl. Pemuda No. 123, Kel. Sekayu, Kec. Semarang Tengah, Kota Semarang",
    foto: "https://i.pravatar.cc/150?u=riana",
  },
  {
    nama: "Clara Shinta",
    asalSekolah: "Universitas Negeri Semarang",
    jurusan: "Administrasi Perkantoran",
    whatsapp: "6285778899001",
    alamat:
      "Perumahan Gunungpati Green Residence, Blok C-10, Gunungpati, Semarang",
    foto: "https://i.pravatar.cc/150?u=clara",
  },
  {
    nama: "Rizky Ramadan",
    asalSekolah: "Politeknik Negeri Semarang",
    jurusan: "Teknik Informatika",
    whatsapp: "6289911223344",
    alamat: "Jl. Tembalang Baru II No. 45, Tembalang, Kota Semarang",
    foto: "https://i.pravatar.cc/150?u=rizky",
  },
]);

const filteredCalon = computed(() => {
  return daftarCalon.value.filter((item) => {
    return (
      item.nama.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      item.asalSekolah.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  });
});

const openDetail = (calon) => {
  selectedCalon.value = calon;
};

const confirmDelete = (index) => {
  if (confirm("Hapus data calon pendaftar ini secara permanen?")) {
    daftarCalon.value.splice(index, 1);
  }
};
</script>

<style scoped>
/* Modal Responsive Animation */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

/* Mobile Slide Up Effect */
@media (max-width: 640px) {
  .animate-slide-up {
    animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }
}

@keyframes slideUp {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}

/* Custom shadow untuk table group hover */
tr:hover td:first-child {
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
}
tr:hover td:last-child {
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
}
</style>
