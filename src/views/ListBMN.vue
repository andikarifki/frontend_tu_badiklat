<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold text-gray-800">Manajemen Inventaris BMN</h2>
      <div class="flex gap-2">
        <button
          class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
        >
          + Tambah Aset
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div
        class="bg-white p-4 rounded-xl shadow-sm border-l-4 border-green-500"
      >
        <p class="text-sm text-gray-500">Kondisi Baik</p>
        <p class="text-2xl font-bold text-gray-800">
          1,240 <span class="text-sm font-normal text-gray-400">Unit</span>
        </p>
      </div>
      <div
        class="bg-white p-4 rounded-xl shadow-sm border-l-4 border-yellow-500"
      >
        <p class="text-sm text-gray-500">Rusak Ringan</p>
        <p class="text-2xl font-bold text-gray-800">
          45 <span class="text-sm font-normal text-gray-400">Unit</span>
        </p>
      </div>
      <div class="bg-white p-4 rounded-xl shadow-sm border-l-4 border-red-500">
        <p class="text-sm text-gray-500">Rusak Berat</p>
        <p class="text-2xl font-bold text-gray-800">
          12 <span class="text-sm font-normal text-gray-400">Unit</span>
        </p>
      </div>
    </div>

    <div class="bg-white rounded-xl shadow-sm overflow-hidden">
      <div
        class="p-4 border-b border-gray-100 flex flex-col md:flex-row gap-4 justify-between"
      >
        <input
          v-model="search"
          type="text"
          placeholder="Cari NUP atau Nama Barang..."
          class="border rounded-lg px-4 py-2 w-full md:w-80 focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <select
          v-model="filterLokasi"
          class="border rounded-lg px-4 py-2 outline-none"
        >
          <option value="">Semua Lokasi</option>
          <option value="Gedung A">Gedung A (Kantor)</option>
          <option value="Gedung B">Gedung B (Asrama)</option>
          <option value="Sport Center">Sport Center Ali Said</option>
        </select>
      </div>

      <table class="w-full text-left">
        <thead class="bg-gray-50 text-gray-600 text-sm uppercase">
          <tr>
            <th class="px-6 py-4">Kode / NUP</th>
            <th class="px-6 py-4">Nama Barang</th>
            <th class="px-6 py-4">Lokasi</th>
            <th class="px-6 py-4">Kondisi</th>
            <th class="px-6 py-4 text-center">Aksi</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr
            v-for="item in filteredBMN"
            :key="item.id"
            class="hover:bg-gray-50 transition"
          >
            <td class="px-6 py-4 font-mono text-sm text-blue-600">
              {{ item.nup }}
            </td>
            <td class="px-6 py-4">
              <div class="font-medium text-gray-800">{{ item.nama }}</div>
              <div class="text-xs text-gray-400">{{ item.merek }}</div>
            </td>
            <td class="px-6 py-4 text-sm text-gray-600">{{ item.lokasi }}</td>
            <td class="px-6 py-4">
              <span
                :class="statusClass(item.kondisi)"
                class="px-3 py-1 rounded-full text-xs font-medium"
              >
                {{ item.kondisi }}
              </span>
            </td>
            <td class="px-6 py-4 text-center">
              <button class="text-blue-500 hover:text-blue-700 mr-3">
                <i class="fas fa-edit"></i>
              </button>
              <button class="text-gray-500 hover:text-gray-700">
                <i class="fas fa-history"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      filterLokasi: "",
      // Data dummy sesuai aset Badiklat Jateng
      bmnData: [
        {
          id: 1,
          nup: "3.05.02.01.002.1",
          nama: "AC Split 2 PK",
          merek: "Daikin",
          lokasi: "Aula Pusparaja (Gedung B)",
          kondisi: "Baik",
        },
        {
          id: 2,
          nup: "3.10.01.02.001.45",
          nama: "PC All in One",
          merek: "HP Pavilion",
          lokasi: "Ruang Komputer",
          kondisi: "Baik",
        },
        {
          id: 3,
          nup: "3.02.01.01.005.12",
          nama: "Treadmill Electric",
          merek: "Shaga",
          lokasi: "Sport Center",
          kondisi: "Rusak Ringan",
        },
        {
          id: 4,
          nup: "3.05.01.04.001.5",
          nama: "Kursi Kuliah",
          merek: "Chitose",
          lokasi: "Ruang Kelas 1",
          kondisi: "Baik",
        },
        {
          id: 5,
          nup: "3.10.02.03.001.2",
          nama: "Sound System Set",
          merek: "Yamaha",
          lokasi: "Aula Yasonna",
          kondisi: "Rusak Berat",
        },
      ],
    };
  },
  computed: {
    filteredBMN() {
      return this.bmnData.filter((item) => {
        return (
          (item.nama.toLowerCase().includes(this.search.toLowerCase()) ||
            item.nup.includes(this.search)) &&
          (this.filterLokasi === "" || item.lokasi.includes(this.filterLokasi))
        );
      });
    },
  },
  methods: {
    statusClass(kondisi) {
      if (kondisi === "Baik") return "bg-green-100 text-green-700";
      if (kondisi === "Rusak Ringan") return "bg-yellow-100 text-yellow-700";
      return "bg-red-100 text-red-700";
    },
  },
};
</script>
