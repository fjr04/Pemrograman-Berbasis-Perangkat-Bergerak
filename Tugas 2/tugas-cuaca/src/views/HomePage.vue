<template>
  <ion-page>
    
    <ion-header class="ion-no-border">
      <ion-toolbar color="primary">
        <ion-title class="ion-text-center">Prakiraan Cuaca</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="custom-bg">
      
      <div class="hero-section">
        <h1 class="city-title">Jakarta</h1>
        <p class="subtitle">Cuaca Hari Ini & Besok</p>
        <ion-icon :icon="partlySunny" class="hero-icon"></ion-icon>
      </div>

      <div v-if="isLoading" class="loading-center">
        <ion-spinner name="bubbles" color="light"></ion-spinner>
        <p>Memuat data cuaca...</p>
      </div>

      <div v-else class="weather-container">
        
        <ion-card v-for="(cuaca, index) in weatherList" :key="index" class="weather-card">
          <ion-card-content class="weather-content">
            
            <div class="time-info">
              <ion-icon :icon="timeOutline" class="time-icon"></ion-icon>
              <span class="time-text">{{ formatTime(cuaca.time) }}</span>
            </div>
            
            <div class="temp-info">
              <span class="temperature" :class="getTempClass(cuaca.temperature)">
                {{ cuaca.temperature }}°C
              </span>
              <ion-icon :icon="thermometerOutline" class="temp-icon"></ion-icon>
            </div>

          </ion-card-content>
        </ion-card>

      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
/* --- BAGIAN SCRIPT: LOGIKA PROGRAM --- */

// 1. IMPORT MODUL DARI VUE & IONIC
import { ref, onMounted } from 'vue'; // ref untuk variabel reaktif, onMounted untuk trigger awal
import {
  IonPage, IonHeader, IonToolbar, IonTitle,
  IonContent, IonSpinner, IonIcon, IonCard, IonCardContent
} from '@ionic/vue';
import { timeOutline, partlySunny, thermometerOutline } from 'ionicons/icons'; // Import ikon

// 2. DEKLARASI STATE (VARIABEL PENYIMPAN DATA)
// weatherList: Menyimpan hasil akhir data cuaca dalam bentuk array object
const weatherList = ref<{ time: string; temperature: number }[]>([]);
// isLoading: Penanda (flag) apakah proses tarik data sedang berlangsung
const isLoading = ref(true);

// 3. FUNGSI UTAMA PENGAMBILAN DATA API (GET REQUEST)
const fetchWeatherData = async () => {
  try {
    // Meminta data ke URL API Open-Meteo menggunakan 'fetch'
    const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=-6.2&longitude=106.8&hourly=temperature_2m');
    
    // Mengubah balasan (response) mentah menjadi format JSON
    const data = await response.json();

    // Memisahkan array waktu dan array suhu dari JSON
    const times = data.hourly.time;
    const temperatures = data.hourly.temperature_2m;

    // Menggabungkan array waktu dan suhu menjadi satu paket (object) yang rapi menggunakan .map()
    // Lalu menyimpannya ke dalam variabel 'weatherList'
    weatherList.value = times.map((waktu: string, index: number) => {
      return {
        time: waktu,
        temperature: temperatures[index]
      };
    });
  } catch (error) {
    // Menangkap dan mencetak pesan jika terjadi error (contoh: internet putus)
    console.error('Gagal mengambil data:', error);
  } finally {
    // Apapun yang terjadi (berhasil/gagal), matikan animasi loading
    isLoading.value = false;
  }
};

// 4. FUNGSI BANTUAN FORMAT WAKTU
// Mengubah string seperti "2024-05-24T14:00" menjadi "Jum, 24 Mei, 14:00"
const formatTime = (isoString: string) => {
  const date = new Date(isoString);
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short', month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit'
  };
  return date.toLocaleDateString('id-ID', options).replace(/\./g, ':');
};

// 5. FUNGSI BANTUAN LOGIKA WARNA SUHU
// Memberikan class CSS berbeda secara otomatis sesuai derajat suhunya
const getTempClass = (temp: number) => {
  if (temp >= 30) return 'hot-temp';  // Suhu >= 30°C warnanya merah/panas
  if (temp >= 26) return 'warm-temp'; // Suhu >= 26°C warnanya oranye/hangat
  return 'cool-temp';                 // Suhu di bawah 26°C warnanya biru/sejuk
};

// 6. LIFECYCLE HOOK
// Fungsi di dalam onMounted akan langsung dijalankan secara otomatis saat halaman dibuka pertama kali
onMounted(() => {
  fetchWeatherData();
});
</script>

<style scoped>
/* --- BAGIAN STYLE: DESAIN VISUAL CSS --- */

/* Latar belakang halaman bergradasi biru */
.custom-bg {
  --background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}

/* Mengatur posisi dan warna teks pada Hero Section */
.hero-section {
  text-align: center;
  color: white;
  padding: 2rem 0;
}

.city-title {
  font-size: 2.5rem;
  font-weight: bold;
  margin: 0;
}

.subtitle {
  font-size: 1.1rem;
  opacity: 0.9;
  margin-top: 0.5rem;
}

/* Mengatur ukuran dan bayangan ikon cuaca utama */
.hero-icon {
  font-size: 5rem;
  margin-top: 1rem;
  color: #fffb00; /* Warna kuning */
  filter: drop-shadow(0px 4px 6px rgba(0,0,0,0.2));
}

/* Mengatur agar animasi loading berada tepat di tengah layar */
.loading-center {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 40vh;
  color: white;
  font-weight: 500;
}

.weather-container {
  padding-bottom: 2rem;
}

/* Mendesain kotak pembungkus list (Card) agar memiliki sudut melengkung dan bayangan */
.weather-card {
  border-radius: 16px;
  margin: 12px 16px;
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
}

/* Membuat baris card memanjang sejajar dengan Flexbox */
.weather-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
}

.time-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.time-icon {
  font-size: 1.5rem;
  color: #636e72;
}

.time-text {
  font-size: 1.1rem;
  font-weight: 500;
  color: #2d3436;
}

.temp-info {
  display: flex;
  align-items: center;
  gap: 5px;
}

.temperature {
  font-size: 1.4rem;
  font-weight: bold;
}

.temp-icon {
  font-size: 1.5rem;
  color: #b2bec3;
}

/* Kelas khusus penentu warna teks berdasarkan suhu dari fungsi getTempClass() */
.hot-temp { color: #d63031; }  /* Merah */
.warm-temp { color: #e17055; } /* Oranye */
.cool-temp { color: #0984e3; } /* Biru */
</style>