<template>
  <div class="p-8 bg-gray-50 min-h-screen">
    <div
      class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8"
    >
      <div>
        <h1 class="text-3xl font-extrabold text-slate-800 tracking-tight">
          Data Pegawai
        </h1>
        <div class="flex items-center gap-2 mt-1">
          <span class="flex h-2 w-2 rounded-full bg-emerald-500"></span>
          <p class="text-slate-500 font-medium text-sm">
            BADIKLAT JAWA TENGAH • {{ filteredPegawai.length }} Personel
          </p>
        </div>
      </div>

      <button
        @click="isCreateModalOpen = true"
        class="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg shadow-indigo-200 transition-all active:scale-95"
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
            d="M12 4v16m8-8H4"
          />
        </svg>
        Tambah Pegawai
      </button>
    </div>

    <div
      class="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 mb-6"
    >
      <div class="relative group">
        <span
          class="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400 group-focus-within:text-indigo-500 transition-colors"
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
          placeholder="Cari berdasarkan nama lengkap atau NIP..."
          class="block w-full pl-11 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 text-slate-700 placeholder-slate-400 transition-all"
        />
      </div>
    </div>

    <div
      class="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden"
    >
      <div v-if="isLoading" class="p-20 text-center">
        <div
          class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-indigo-500 border-t-transparent"
        ></div>
        <p class="mt-4 text-slate-500 font-medium">Memuat data pegawai...</p>
      </div>

      <div v-else class="overflow-x-auto">
        <table class="w-full border-collapse">
          <thead>
            <tr class="bg-slate-50/50 border-b border-slate-200">
              <th
                class="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider w-16"
              >
                No
              </th>
              <th
                class="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider"
              >
                Identitas Pegawai
              </th>
              <th
                class="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider"
              >
                Pangkat & Golongan
              </th>
              <th
                class="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider"
              >
                Jabatan
              </th>
              <th
                class="px-6 py-4 text-center text-xs font-bold text-slate-500 uppercase tracking-wider"
              >
                Aksi
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr
              v-for="(p, index) in filteredPegawai"
              :key="p.id"
              class="hover:bg-indigo-50/30 transition-all group"
            >
              <td class="px-6 py-5 text-sm text-slate-400 font-medium">
                {{ String(index + 1).padStart(2, "0") }}
              </td>
              <td class="px-6 py-5">
                <div class="flex items-center gap-4">
                  <div
                    class="h-10 w-10 rounded-full bg-indigo-100 overflow-hidden flex items-center justify-center text-indigo-700 font-bold text-xs shrink-0"
                  >
                    <img
                      v-if="p.foto"
                      :src="`http://localhost:8000/storage/${p.foto}`"
                      class="h-full w-full object-cover"
                    />
                    <span v-else>{{
                      p.nama
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)
                    }}</span>
                  </div>
                  <div>
                    <div
                      class="text-sm font-bold text-slate-800 group-hover:text-indigo-700 transition-colors"
                    >
                      {{ p.nama }}
                    </div>
                    <div
                      class="text-xs font-medium text-slate-500 mt-0.5 tracking-wide"
                    >
                      NIP. {{ p.nip }}
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-5">
                <div
                  class="inline-flex items-center px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-semibold"
                >
                  {{ p.pangkat || "-" }}
                </div>
                <div
                  class="text-[11px] text-slate-400 mt-1 font-bold ml-1 uppercase"
                >
                  {{ p.golongan || "-" }}
                </div>
              </td>
              <td
                class="px-6 py-5 text-sm text-slate-600 leading-relaxed max-w-[200px]"
              >
                {{ p.jabatan }}
              </td>
              <td class="px-6 py-5 text-center">
                <div class="flex justify-center items-center gap-1">
                  <button
                    @click="lihatDetail(p)"
                    class="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
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
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </button>
                  <button
                    @click="hapusPegawai(p.id)"
                    class="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
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

    <div
      v-if="isCreateModalOpen"
      class="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div
        @click="isCreateModalOpen = false"
        class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
      ></div>
      <div
        class="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300"
      >
        <div
          class="bg-indigo-600 p-6 text-white flex justify-between items-center"
        >
          <h2 class="text-xl font-bold">Tambah Pegawai Baru</h2>
          <button
            @click="isCreateModalOpen = false"
            class="hover:bg-indigo-500 p-2 rounded-full transition-colors"
          >
            ✕
          </button>
        </div>

        <form @submit.prevent="simpanPegawai" class="p-8 space-y-4">
          <div>
            <label class="block text-xs font-bold text-slate-400 uppercase mb-1"
              >Nama Lengkap</label
            >
            <input
              v-model="form.nama"
              type="text"
              class="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="Masukkan nama lengkap"
              required
            />
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label
                class="block text-xs font-bold text-slate-400 uppercase mb-1"
                >NIP</label
              >
              <input
                v-model="form.nip"
                type="text"
                class="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="NIP 18 digit"
                required
              />
            </div>
            <div>
              <label
                class="block text-xs font-bold text-slate-400 uppercase mb-1"
                >Golongan</label
              >
              <input
                v-model="form.golongan"
                type="text"
                class="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="Contoh: III/a"
              />
            </div>
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-400 uppercase mb-1"
              >Pangkat</label
            >
            <input
              v-model="form.pangkat"
              type="text"
              class="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="Contoh: Penata Muda"
            />
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-400 uppercase mb-1"
              >Jabatan</label
            >
            <input
              v-model="form.jabatan"
              type="text"
              class="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="Jabatan saat ini"
              required
            />
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-400 uppercase mb-1"
              >Foto Profil</label
            >
            <input
              type="file"
              @change="handleFileUpload"
              class="text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            />
          </div>

          <div class="pt-4 flex gap-3">
            <button
              type="button"
              @click="isCreateModalOpen = false"
              class="flex-1 py-3 border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              :disabled="isSaving"
              class="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 disabled:bg-slate-300 transition-all"
            >
              {{ isSaving ? "Menyimpan..." : "Simpan Pegawai" }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <div
      v-if="isModalOpen"
      class="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div
        @click="tutupModal"
        class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
      ></div>
      <div
        class="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300"
      >
        <div
          class="bg-indigo-600 p-6 text-white flex justify-between items-center"
        >
          <h2 class="text-xl font-bold">Detail Profil Pegawai</h2>
          <button
            @click="tutupModal"
            class="hover:bg-indigo-500 p-2 rounded-full transition-colors"
          >
            ✕
          </button>
        </div>

        <div class="p-8">
          <div class="flex flex-col md:flex-row gap-8 items-start">
            <div class="w-full md:w-1/3 flex flex-col items-center">
              <div
                class="h-40 w-40 rounded-2xl bg-slate-100 border-4 border-slate-50 overflow-hidden shadow-inner flex items-center justify-center"
              >
                <img
                  v-if="selectedPegawai?.foto"
                  :src="`http://localhost:8000/storage/${selectedPegawai.foto}`"
                  class="h-full w-full object-cover"
                />
                <svg
                  v-else
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-20 w-20 text-slate-300"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <p
                class="mt-4 text-xs text-slate-400 font-medium italic text-center uppercase tracking-widest"
              >
                BADIKLAT JAWA TENGAH
              </p>
            </div>

            <div class="w-full md:w-2/3 space-y-4">
              <div>
                <label
                  class="text-[10px] uppercase font-bold text-slate-400 tracking-widest"
                  >Nama Lengkap</label
                >
                <p class="text-lg font-bold text-slate-800">
                  {{ selectedPegawai?.nama }}
                </p>
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label
                    class="text-[10px] uppercase font-bold text-slate-400 tracking-widest"
                    >NIP</label
                  >
                  <p class="text-sm font-medium text-slate-700">
                    {{ selectedPegawai?.nip }}
                  </p>
                </div>
                <div>
                  <label
                    class="text-[10px] uppercase font-bold text-slate-400 tracking-widest"
                    >Golongan</label
                  >
                  <p class="text-sm font-medium text-slate-700">
                    {{ selectedPegawai?.golongan }}
                  </p>
                </div>
              </div>
              <div>
                <label
                  class="text-[10px] uppercase font-bold text-slate-400 tracking-widest"
                  >Pangkat</label
                >
                <p class="text-sm font-medium text-slate-700">
                  {{ selectedPegawai?.pangkat }}
                </p>
              </div>
              <div>
                <label
                  class="text-[10px] uppercase font-bold text-slate-400 tracking-widest"
                  >Jabatan</label
                >
                <div
                  class="mt-1 p-3 bg-slate-50 rounded-xl border border-slate-100 text-sm text-slate-600 leading-relaxed font-medium"
                >
                  {{ selectedPegawai?.jabatan }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-slate-50 p-6 flex justify-end">
          <button
            @click="tutupModal"
            class="px-6 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-100 transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "../axios";

// UI States
const dataPegawai = ref([]);
const searchQuery = ref("");
const isLoading = ref(true);
const isSaving = ref(false);
const isModalOpen = ref(false); // Modal Detail
const isCreateModalOpen = ref(false); // Modal Tambah
const selectedPegawai = ref(null);

// Form State
const form = ref({
  nama: "",
  nip: "",
  pangkat: "",
  golongan: "",
  jabatan: "",
  foto: null,
});

// 1. Fetch Data
const fetchPegawai = async () => {
  isLoading.value = true;
  try {
    const response = await axios.get("/pegawai");
    dataPegawai.value = response.data;
  } catch (error) {
    console.error("Gagal mengambil data:", error);
  } finally {
    isLoading.value = false;
  }
};

// 2. Lifecycle
onMounted(fetchPegawai);

// 3. Search Logic
const filteredPegawai = computed(() => {
  if (!dataPegawai.value) return [];
  return dataPegawai.value.filter((p) => {
    return (
      p.nama.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      p.nip.includes(searchQuery.value)
    );
  });
});

// 4. Create Logic
const handleFileUpload = (event) => {
  form.value.foto = event.target.files[0];
};

const simpanPegawai = async () => {
  isSaving.value = true;
  const formData = new FormData();
  formData.append("nama", form.value.nama);
  formData.append("nip", form.value.nip);
  formData.append("pangkat", form.value.pangkat);
  formData.append("golongan", form.value.golongan);
  formData.append("jabatan", form.value.jabatan);
  if (form.value.foto) formData.append("foto", form.value.foto);

  try {
    await axios.post("/pegawai", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    isCreateModalOpen.value = false;
    // Reset Form
    form.value = {
      nama: "",
      nip: "",
      pangkat: "",
      golongan: "",
      jabatan: "",
      foto: null,
    };
    fetchPegawai(); // Reload Table
    alert("Data berhasil disimpan!");
  } catch (error) {
    alert(error.response?.data?.message || "Gagal menyimpan data.");
  } finally {
    isSaving.value = false;
  }
};

// 5. Detail & Delete Handlers
const lihatDetail = (pegawai) => {
  selectedPegawai.value = pegawai;
  isModalOpen.value = true;
};

const tutupModal = () => {
  isModalOpen.value = false;
  selectedPegawai.value = null;
};

const hapusPegawai = async (id) => {
  if (confirm("Apakah Anda yakin ingin menghapus data ini?")) {
    try {
      await axios.delete(`/pegawai/${id}`);
      fetchPegawai();
    } catch (error) {
      alert("Gagal menghapus data.");
    }
  }
};
</script>
