<template>
  <div class="min-h-screen flex items-center justify-center bg-slate-50 p-4">
    <div
      class="max-w-md w-full bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-8 border border-slate-100"
    >
      <div class="text-center mb-8">
        <div class="mb-4 flex justify-center">
          <img
            src="/logo-menkum.svg"
            alt="Logo Badiklat"
            class="h-20 w-20 object-cover rounded-2xl shadow-lg shadow-indigo-500/30 border-2 border-white"
          />
        </div>
        <h2 class="text-2xl font-bold text-slate-900">Selamat Datang</h2>
        <p class="text-slate-500 mt-2">Silakan login ke akun SEHATI_TU</p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-5">
        <div>
          <label class="block text-sm font-semibold text-slate-700 mb-2"
            >Email Address</label
          >
          <input
            type="email"
            v-model="form.email"
            placeholder="nama@email.com"
            class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            required
          />
        </div>

        <div>
          <label class="block text-sm font-semibold text-slate-700 mb-2"
            >Password</label
          >
          <input
            type="password"
            v-model="form.password"
            placeholder="••••••••"
            class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            required
          />
        </div>

        <div
          v-if="errorMessage"
          class="p-3 rounded-lg bg-red-50 text-red-600 text-sm font-medium border border-red-100"
        >
          {{ errorMessage }}
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-indigo-500/30 transition-all transform active:scale-[0.98] disabled:opacity-70"
        >
          <span v-if="loading" class="flex items-center justify-center">
            <svg
              class="animate-spin h-5 w-5 mr-3 text-white"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Memproses...
          </span>
          <span v-else>Masuk Sekarang</span>
        </button>
      </form>

      <div class="mt-8 text-center">
        <p class="text-sm text-slate-500">
          Lupa password?
          <a href="#" class="text-indigo-600 font-semibold hover:underline"
            >Hubungi Admin</a
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import axios from "../axios";
import { useRouter } from "vue-router";

const router = useRouter();
const loading = ref(false);
const errorMessage = ref("");

const form = reactive({
  email: "",
  password: "",
});

const handleLogin = async () => {
  loading.value = true;
  errorMessage.value = "";

  try {
    // PERBAIKAN: Gunakan endpoint '/login' bukan '/'
    const response = await axios.post("/login", form);

    // Simpan token
    localStorage.setItem("token", response.data.access_token);

    // Redirect
    router.push("/dashboard");
  } catch (error) {
    // Jika email/password salah, Laravel kirim error di response.data.message
    errorMessage.value =
      error.response?.data?.message || "Email atau password salah!";
  } finally {
    loading.value = false;
  }
};
</script>
