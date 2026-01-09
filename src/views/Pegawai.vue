<template>
  <div class="p-4 md:p-8 bg-gray-50 min-h-screen">
    <div
      class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8"
    >
      <div>
        <h1
          class="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight"
        >
          Data Pegawai
        </h1>
        <div class="flex items-center gap-2 mt-1">
          <span class="flex h-2 w-2 rounded-full bg-emerald-500"></span>
          <p class="text-slate-500 font-medium text-xs md:text-sm">
            BADIKLAT JAWA TENGAH • {{ filteredPegawai.length }} Personel
          </p>
        </div>
      </div>

      <button
        @click="bukaModalTambah"
        class="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 md:py-2.5 rounded-xl font-semibold shadow-lg shadow-indigo-200 transition-all active:scale-95 text-sm md:text-base"
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
      class="bg-white p-3 md:p-4 rounded-2xl shadow-sm border border-slate-200 mb-6"
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
          placeholder="Cari nama atau NIP..."
          class="block w-full pl-11 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 text-slate-700 transition-all text-sm md:text-base"
        />
      </div>
    </div>

    <div
      class="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden"
    >
      <div v-if="isLoading" class="p-20 text-center">
        <div
          class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-indigo-500 border-t-transparent"
        ></div>
        <p class="mt-4 text-slate-500 font-medium">Memuat data...</p>
      </div>

      <div v-else class="overflow-x-auto">
        <table class="w-full border-collapse">
          <thead>
            <tr class="bg-slate-50/50 border-b border-slate-200">
              <th
                class="px-4 md:px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase w-16"
              >
                No
              </th>
              <th
                class="px-4 md:px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase"
              >
                Identitas
              </th>
              <th
                class="hidden md:table-cell px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase"
              >
                Pangkat/Gol
              </th>
              <th
                class="hidden sm:table-cell px-4 md:px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase"
              >
                Jabatan
              </th>
              <th
                class="px-4 md:px-6 py-4 text-center text-xs font-bold text-slate-500 uppercase"
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
              <td class="px-4 md:px-6 py-4 text-sm text-slate-400">
                {{ index + 1 }}
              </td>
              <td class="px-4 md:px-6 py-4">
                <div class="flex items-center gap-3 md:gap-4">
                  <div
                    class="h-10 w-10 rounded-full bg-indigo-100 overflow-hidden flex items-center justify-center text-indigo-700 shrink-0"
                  >
                    <img
                      v-if="p.foto"
                      :src="`http://localhost:8000/storage/${p.foto}`"
                      class="h-full w-full object-cover"
                    />
                    <span v-else class="font-bold text-xs">{{
                      p.nama.substring(0, 2).toUpperCase()
                    }}</span>
                  </div>
                  <div class="min-w-0">
                    <div
                      class="text-sm font-bold text-slate-800 truncate max-w-[120px] md:max-w-none"
                    >
                      {{ p.nama }}
                    </div>
                    <div class="text-[10px] md:text-xs text-slate-500">
                      NIP. {{ p.nip }}
                    </div>
                    <div
                      class="sm:hidden text-[10px] text-indigo-600 font-medium mt-0.5"
                    >
                      {{ p.jabatan }}
                    </div>
                  </div>
                </div>
              </td>
              <td class="hidden md:table-cell px-6 py-4 text-sm">
                <div class="font-semibold text-slate-700">
                  {{ p.pangkat || "-" }}
                </div>
                <div class="text-[10px] text-slate-400">
                  {{ p.golongan || "-" }}
                </div>
              </td>
              <td
                class="hidden sm:table-cell px-4 md:px-6 py-4 text-sm text-slate-600"
              >
                {{ p.jabatan }}
              </td>
              <td class="px-4 md:px-6 py-4 text-center">
                <div class="flex justify-center gap-1">
                  <button
                    @click="lihatDetail(p)"
                    class="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg"
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
                    class="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg"
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
      v-if="isFormModalOpen"
      class="fixed inset-0 z-50 flex justify-center items-start md:items-center overflow-y-auto p-4 bg-slate-900/60 backdrop-blur-sm"
    >
      <div @click="tutupModalForm" class="fixed inset-0"></div>
      <div
        class="relative bg-white w-full max-w-lg rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden my-auto"
      >
        <div
          class="bg-indigo-600 p-5 md:p-6 text-white flex justify-between items-center sticky top-0 z-10"
        >
          <h2 class="text-lg md:text-xl font-bold">
            {{ isEditMode ? "Perbarui Profil" : "Tambah Pegawai" }}
          </h2>
          <button
            @click="tutupModalForm"
            class="p-2 hover:bg-indigo-500 rounded-full transition-colors"
          >
            ✕
          </button>
        </div>

        <form
          @submit.prevent="simpanPegawai"
          class="p-6 md:p-8 space-y-4 max-h-[75vh] md:max-h-none overflow-y-auto"
        >
          <div v-if="fotoPreview" class="flex justify-center mb-2">
            <img
              :src="fotoPreview"
              class="h-20 w-20 md:h-24 md:w-24 rounded-2xl object-cover border-4 border-indigo-50"
            />
          </div>

          <div>
            <label
              class="block text-sm font-bold text-slate-600 uppercase mb-1.5 tracking-wide"
            >
              Nama Lengkap
            </label>
            <input
              v-model="form.nama"
              type="text"
              class="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
              required
            />
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                class="block text-sm font-bold text-slate-600 uppercase mb-1.5 tracking-wide"
              >
                NIP
              </label>
              <input
                v-model="form.nip"
                type="text"
                class="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                required
              />
            </div>
            <div>
              <label
                class="block text-sm font-bold text-slate-600 uppercase mb-1.5 tracking-wide"
              >
                Golongan
              </label>
              <input
                v-model="form.golongan"
                type="text"
                class="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label
              class="block text-sm font-bold text-slate-600 uppercase mb-1.5 tracking-wide"
            >
              Pangkat
            </label>
            <input
              v-model="form.pangkat"
              type="text"
              class="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          <div>
            <label
              class="block text-sm font-bold text-slate-600 uppercase mb-1.5 tracking-wide"
            >
              Jabatan
            </label>
            <input
              v-model="form.jabatan"
              type="text"
              class="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
              required
            />
          </div>

          <div>
            <label
              class="block text-sm font-bold text-slate-600 uppercase mb-1.5 tracking-wide"
            >
              Foto Profil
            </label>
            <input
              type="file"
              @change="handleFileUpload"
              class="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            />
          </div>
          <div class="pt-4 flex flex-col md:flex-row gap-3">
            <button
              type="button"
              @click="tutupModalForm"
              class="order-2 md:order-1 flex-1 py-3 border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50"
            >
              Batal
            </button>
            <button
              type="submit"
              :disabled="isSaving"
              class="order-1 md:order-2 flex-1 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 disabled:bg-slate-300"
            >
              {{ isSaving ? "Memproses..." : "Simpan" }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <div
      v-if="isDetailModalOpen"
      class="fixed inset-0 z-50 flex justify-center items-start md:items-center overflow-y-auto p-4 bg-slate-900/60 backdrop-blur-sm"
    >
      <div @click="tutupModalDetail" class="fixed inset-0"></div>
      <div
        class="relative bg-white w-full max-w-2xl rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden my-auto"
      >
        <div
          class="bg-indigo-600 p-5 md:p-6 text-white flex justify-between items-center sticky top-0 z-10"
        >
          <h2 class="text-lg md:text-xl font-bold">Detail Profil</h2>
          <div class="flex gap-2">
            <button
              @click="bukaModalEdit(selectedPegawai)"
              class="bg-indigo-500 hover:bg-white hover:text-indigo-600 px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
            >
              Edit
            </button>
            <button
              @click="tutupModalDetail"
              class="p-2 hover:bg-indigo-500 rounded-full"
            >
              ✕
            </button>
          </div>
        </div>

        <div class="p-6 md:p-8 overflow-y-auto max-h-[70vh] md:max-h-none">
          <div
            class="flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-start"
          >
            <div class="w-full md:w-1/3 flex flex-col items-center shrink-0">
              <div
                class="h-32 w-32 md:h-40 md:w-40 rounded-2xl bg-slate-100 border-4 border-slate-50 overflow-hidden shadow-inner flex items-center justify-center"
              >
                <img
                  v-if="selectedPegawai?.foto"
                  :src="`http://localhost:8000/storage/${selectedPegawai.foto}`"
                  class="h-full w-full object-cover"
                />
                <div v-else class="text-4xl font-bold text-slate-300">
                  {{ selectedPegawai?.nama[0] }}
                </div>
              </div>
              <p
                class="mt-4 text-[10px] text-slate-400 font-bold uppercase tracking-widest text-center"
              >
                BADIKLAT JAWA TENGAH
              </p>
            </div>

            <div class="w-full md:w-2/3 space-y-4">
              <div class="border-b border-slate-50 pb-2">
                <label
                  class="text-[10px] uppercase font-bold text-slate-400 tracking-widest"
                  >Nama Lengkap</label
                >
                <p class="text-base md:text-lg font-bold text-slate-800">
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
                    {{ selectedPegawai?.golongan || "-" }}
                  </p>
                </div>
              </div>
              <div>
                <label
                  class="text-[10px] uppercase font-bold text-slate-400 tracking-widest"
                  >Pangkat</label
                >
                <p class="text-sm font-medium text-slate-700">
                  {{ selectedPegawai?.pangkat || "-" }}
                </p>
              </div>
              <div>
                <label
                  class="text-[10px] uppercase font-bold text-slate-400 tracking-widest"
                  >Jabatan</label
                >
                <div
                  class="mt-1 p-3 bg-slate-50 rounded-xl border border-slate-100 text-sm text-slate-600 font-medium"
                >
                  {{ selectedPegawai?.jabatan }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-slate-50 p-4 md:p-6 flex justify-end">
          <button
            @click="tutupModalDetail"
            class="w-full md:w-auto px-6 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-100 transition-colors"
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

// UI & Data States
const dataPegawai = ref([]);
const searchQuery = ref("");
const isLoading = ref(true);
const isSaving = ref(false);
const isFormModalOpen = ref(false);
const isDetailModalOpen = ref(false);
const isEditMode = ref(false);
const selectedPegawai = ref(null);
const fotoPreview = ref(null);

// Form State
const form = ref({
  id: null,
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
    console.error("Gagal ambil data", error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(fetchPegawai);

// 2. Search Logic
const filteredPegawai = computed(() => {
  return dataPegawai.value.filter(
    (p) =>
      p.nama.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      p.nip.includes(searchQuery.value)
  );
});

// 3. Modal Handlers
const bukaModalTambah = () => {
  isEditMode.value = false;
  isFormModalOpen.value = true;
  fotoPreview.value = null;
  form.value = {
    id: null,
    nama: "",
    nip: "",
    pangkat: "",
    golongan: "",
    jabatan: "",
    foto: null,
  };
};

const bukaModalEdit = (pegawai) => {
  isEditMode.value = true;
  isDetailModalOpen.value = false;
  isFormModalOpen.value = true;

  form.value = {
    id: pegawai.id,
    nama: pegawai.nama,
    nip: pegawai.nip,
    pangkat: pegawai.pangkat,
    golongan: pegawai.golongan,
    jabatan: pegawai.jabatan,
    foto: null,
  };

  fotoPreview.value = pegawai.foto
    ? `http://localhost:8000/storage/${pegawai.foto}`
    : null;
};

const tutupModalForm = () => {
  isFormModalOpen.value = false;
  fotoPreview.value = null;
};

const lihatDetail = (p) => {
  selectedPegawai.value = p;
  isDetailModalOpen.value = true;
};

const tutupModalDetail = () => {
  isDetailModalOpen.value = false;
  selectedPegawai.value = null;
};

const handleFileUpload = (e) => {
  const file = e.target.files[0];
  form.value.foto = file;
  if (file) {
    fotoPreview.value = URL.createObjectURL(file);
  }
};

// 4. CRUD Actions
const simpanPegawai = async () => {
  isSaving.value = true;
  const fd = new FormData();
  fd.append("nama", form.value.nama);
  fd.append("nip", form.value.nip);
  fd.append("pangkat", form.value.pangkat || "");
  fd.append("golongan", form.value.golongan || "");
  fd.append("jabatan", form.value.jabatan);

  if (form.value.foto) {
    fd.append("foto", form.value.foto);
  }

  try {
    if (isEditMode.value) {
      fd.append("_method", "PUT");
      await axios.post(`/pegawai/${form.value.id}`, fd);
    } else {
      await axios.post("/pegawai", fd);
    }

    fetchPegawai();
    tutupModalForm();
  } catch (error) {
    alert(error.response?.data?.message || "Gagal menyimpan data.");
  } finally {
    isSaving.value = false;
  }
};

const hapusPegawai = async (id) => {
  if (confirm("Hapus data pegawai ini?")) {
    try {
      await axios.delete(`/pegawai/${id}`);
      fetchPegawai();
    } catch (e) {
      alert("Gagal menghapus.");
    }
  }
};
</script>
