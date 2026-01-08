<template>
  <div
    class="min-h-screen flex items-center justify-center p-4 bg-cover bg-center relative"
    style="background-image: url('/IMG_6116.png')"
  >
    <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"></div>

    <div
      class="max-w-md w-full bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/20 relative z-10"
    >
      <div class="text-center mb-8">
        <div class="mb-4 flex justify-center">
          <img
            src="/logo-menkum.svg"
            alt="Logo"
            class="h-20 w-20 object-contain rounded-2xl shadow-lg bg-white p-2 border-2 border-white"
          />
        </div>
        <h2 class="text-2xl font-bold text-slate-900">Selamat Datang</h2>
        <p class="text-slate-500 mt-2">Silakan login ke akun SEHATI-TU</p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-5">
        <div>
          <label class="block text-sm font-semibold text-slate-700 mb-2"
            >Email Address</label
          >
          <input
            type="email"
            v-model="form.email"
            placeholder="Masukkan Email "
            class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
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
            class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
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
          <span v-if="loading">Memproses...</span>
          <span v-else>Masuk Sekarang</span>
        </button>
      </form>
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
const form = reactive({ email: "", password: "" });

const handleLogin = async () => {
  loading.value = true;
  errorMessage.value = "";
  try {
    const response = await axios.post("/login", form);
    localStorage.setItem("token", response.data.access_token);
    router.push("/dashboard");
  } catch (error) {
    errorMessage.value =
      error.response?.data?.message || "Email atau password salah!";
  } finally {
    loading.value = false;
  }
};
</script>
