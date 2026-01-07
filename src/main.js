import { createApp } from "vue";
import App from "./App.vue";
import router from "./router"; // Import file konfigurasi router Anda
import "./style.css";

const app = createApp(App);

app.use(router); // PENTING: Baris ini yang mengaktifkan fitur klik/navigasi

app.mount("#app");
