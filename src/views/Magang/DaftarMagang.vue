<template>
  <div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div
      class="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden"
    >
      <div class="bg-blue-900 p-8 text-white text-center">
        <h2 class="text-3xl font-bold">Formulir Pendaftaran Magang</h2>
        <p class="text-blue-200 mt-2 text-sm uppercase tracking-widest">
          Badiklat Hukum Jawa Tengah
        </p>
      </div>

      <form @submit.prevent="handleSubmit" class="p-8 space-y-8">
        <section>
          <div class="flex items-center mb-4 border-b pb-2">
            <span
              class="bg-blue-100 text-blue-900 w-8 h-8 rounded-full flex items-center justify-center font-bold mr-3"
              >1</span
            >
            <h3 class="text-xl font-semibold text-gray-800">
              Identitas Pribadi
            </h3>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700"
                >Nama Lengkap</label
              >
              <input
                type="text"
                v-model="form.nama"
                placeholder="Sesuai KTP/KTM"
                class="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2.5 border"
                required
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700"
                >Email Aktif</label
              >
              <input
                type="email"
                v-model="form.email"
                placeholder="contoh@email.com"
                class="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2.5 border"
                required
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700"
                >Nomor WhatsApp</label
              >
              <input
                type="tel"
                v-model="form.phone"
                placeholder="0812xxxx"
                class="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2.5 border"
                required
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700"
                >Jenis Kelamin</label
              >
              <select
                v-model="form.gender"
                class="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2.5 border"
              >
                <option value="L">Laki-laki</option>
                <option value="P">Perempuan</option>
              </select>
            </div>
          </div>
        </section>

        <section>
          <div class="flex items-center mb-4 border-b pb-2">
            <span
              class="bg-blue-100 text-blue-900 w-8 h-8 rounded-full flex items-center justify-center font-bold mr-3"
              >2</span
            >
            <h3 class="text-xl font-semibold text-gray-800">Asal Pendidikan</h3>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700"
                >Nama Sekolah / Universitas</label
              >
              <input
                type="text"
                v-model="form.kampus"
                placeholder="Contoh: Universitas Diponegoro"
                class="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2.5 border"
                required
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700"
                >Jurusan</label
              >
              <input
                type="text"
                v-model="form.jurusan"
                placeholder="Contoh: Hukum / Informatika"
                class="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2.5 border"
                required
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700"
                >Durasi Magang (Bulan)</label
              >
              <input
                type="number"
                v-model="form.durasi"
                min="1"
                max="12"
                class="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2.5 border"
                required
              />
            </div>
          </div>
        </section>

        <section>
          <div class="flex items-center mb-4 border-b pb-2">
            <span
              class="bg-blue-100 text-blue-900 w-8 h-8 rounded-full flex items-center justify-center font-bold mr-3"
              >3</span
            >
            <h3 class="text-xl font-semibold text-gray-800">
              Dokumen Pendukung
            </h3>
          </div>
          <div class="grid grid-cols-1 gap-4">
            <div
              class="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Surat Pengantar Kampus & CV (Format PDF)</label
              >
              <input
                type="file"
                @change="handleFileUpload"
                class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>
          </div>
        </section>

        <div class="flex items-center justify-end space-x-4 pt-6">
          <button
            type="button"
            class="px-6 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-800"
          >
            Batal
          </button>
          <button
            type="submit"
            class="px-10 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-lg hover:bg-blue-700 transform hover:-translate-y-1 transition duration-200"
          >
            Kirim Pendaftaran
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";

const form = reactive({
  nama: "",
  email: "",
  phone: "",
  gender: "L",
  kampus: "",
  jurusan: "",
  durasi: 1,
  berkas: null,
});

const handleFileUpload = (event) => {
  form.berkas = event.target.files[0];
};

const handleSubmit = () => {
  // Logika pengiriman data (API call)
  console.log("Data Pendaftaran:", form);
  alert("Pendaftaran Anda telah berhasil dikirim ke Badiklat Hukum Jateng!");
};
</script>

<style scoped>
/* Transisi halus untuk input */
input,
select {
  transition: all 0.2s ease-in-out;
}
</style>
