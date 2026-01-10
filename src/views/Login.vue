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
          <div class="relative">
            <input
              :type="showPassword ? 'text' : 'password'"
              v-model="form.password"
              placeholder="Masukan Password "
              class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all pr-12"
              required
            />

            <button
              type="button"
              @click="showPassword = !showPassword"
              class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
            >
              <svg
                v-if="!showPassword"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-5 h-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 010-.644C3.399 8.049 7.21 5 12 5c4.789 0 8.601 3.049 10.164 6.678.06.14.06.307 0 .447C20.601 15.951 16.79 19 12 19c-4.79 0-8.601-3.049-10.164-6.678z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>

              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-5 h-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                />
              </svg>
            </button>
          </div>
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
const showPassword = ref(false);
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
