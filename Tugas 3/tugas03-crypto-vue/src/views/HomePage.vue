<template>
  <!--
    IonPage adalah halaman utama aplikasi Ionic.
  -->
  <ion-page>

    <!--
      Header aplikasi.
      Bagian ini menampilkan judul aplikasi di bagian atas.
    -->
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Data Cryptocurrency</ion-title>
      </ion-toolbar>
    </ion-header>

    <!--
      IonContent adalah isi utama halaman aplikasi.
      Di bagian ini data cryptocurrency akan ditampilkan.
    -->
    <ion-content class="ion-padding">

      <!--
        Tombol Refresh digunakan untuk mengambil ulang data dari API.
      -->
      <div class="refresh-container">
        <ion-button color="primary" @click="getCryptoData">
          Refresh
        </ion-button>
      </div>

      <!--
        Bagian ini muncul saat aplikasi sedang mengambil data dari API.
      -->
      <div v-if="isLoading" class="loading-container">
        <ion-spinner name="crescent"></ion-spinner>
        <p>Sedang mengambil data cryptocurrency...</p>
      </div>

      <!--
        Bagian ini muncul jika data gagal diambil.
      -->
      <ion-card v-if="errorMessage !== ''" class="error-card">
        <ion-card-content>
          {{ errorMessage }}
        </ion-card-content>
      </ion-card>

      <!--
        Daftar cryptocurrency ditampilkan jika loading selesai
        dan tidak ada error.
      -->
      <ion-list v-if="!isLoading && errorMessage === ''">

        <!--
          v-for digunakan untuk menampilkan data cryptocurrency satu per satu.
          Data yang ditampilkan sesuai soal:
          rank, name, symbol, dan price_usd.
        -->
        <ion-item
          v-for="crypto in cryptoList"
          :key="crypto.id"
          class="crypto-item"
        >

          <!-- Bagian rank cryptocurrency -->
          <div class="rank-box" slot="start">
            <small>Rank</small>
            <h2>{{ crypto.rank }}</h2>
          </div>

          <!-- Bagian nama dan simbol cryptocurrency -->
          <ion-label>
            <p>{{ crypto.name }}</p>
            <h1>{{ crypto.symbol }}</h1>
          </ion-label>

          <!-- Bagian harga cryptocurrency dalam USD -->
          <div class="price-box" slot="end">
            <small>USD</small>
            <h2>{{ crypto.price_usd }}</h2>
          </div>

        </ion-item>
      </ion-list>

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
/*
  Bagian script digunakan untuk menulis logika aplikasi.
  Di sini aplikasi mengambil data cryptocurrency dari API CoinLore.
*/

import { ref, onMounted } from 'vue'

/*
  Import komponen Ionic yang digunakan pada halaman ini.
*/
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonSpinner,
  IonCard,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel
} from '@ionic/vue'

/*
  Interface Crypto digunakan untuk menentukan struktur data cryptocurrency.
  Field yang digunakan sesuai dengan instruksi soal tugas.
*/
interface Crypto {
  id: string
  rank: string
  name: string
  symbol: string
  price_usd: string
}

/*
  cryptoList digunakan untuk menyimpan data cryptocurrency
  yang berhasil diambil dari API.
*/
const cryptoList = ref<Crypto[]>([])

/*
  isLoading digunakan untuk menandai apakah aplikasi sedang
  mengambil data dari API.
*/
const isLoading = ref(false)

/*
  errorMessage digunakan untuk menyimpan pesan error jika
  proses pengambilan data gagal.
*/
const errorMessage = ref('')

/*
  Alamat API CoinLore sesuai dengan soal tugas.
*/
const apiUrl = 'https://api.coinlore.net/api/tickers/'

/*
  Fungsi getCryptoData digunakan untuk mengambil data cryptocurrency
  dari API online menggunakan fetch.
*/
const getCryptoData = async () => {
  isLoading.value = true
  errorMessage.value = ''

  try {
    /*
      fetch digunakan untuk melakukan request ke API CoinLore.
    */
    const response = await fetch(apiUrl)

    /*
      Jika response tidak berhasil, maka aplikasi menampilkan error.
    */
    if (!response.ok) {
      throw new Error('Gagal mengambil data dari API')
    }

    /*
      Data dari API diubah menjadi format JSON.
    */
    const result = await response.json()

    /*
      Data cryptocurrency berada di dalam result.data.
      Data tersebut kemudian disimpan ke cryptoList agar bisa ditampilkan.
    */
    cryptoList.value = result.data
  } catch (error) {
    /*
      Bagian ini dijalankan jika terjadi error,
      misalnya koneksi internet mati atau API tidak dapat diakses.
    */
    console.log(error)
    errorMessage.value = 'Data cryptocurrency gagal diambil. Periksa koneksi internet Anda.'
  } finally {
    /*
      Loading dihentikan setelah proses selesai,
      baik berhasil maupun gagal.
    */
    isLoading.value = false
  }
}

/*
  onMounted akan dijalankan saat halaman pertama kali dibuka.
  Jadi aplikasi langsung mengambil data cryptocurrency secara otomatis.
*/
onMounted(() => {
  getCryptoData()
})
</script>

<style scoped>
/*
  Background utama halaman aplikasi.
*/
ion-content {
  --background: #e8f1ff;
}

/*
  Tombol Refresh dibuat berada di tengah.
*/
.refresh-container {
  display: flex;
  justify-content: center;
  margin: 16px 0;
}

/*
  Mengatur bentuk tombol Refresh.
*/
ion-button {
  --border-radius: 10px;
  font-weight: bold;
  text-transform: none;
}

/*
  Tampilan loading saat aplikasi mengambil data.
*/
.loading-container {
  text-align: center;
  margin-top: 40px;
  color: #333;
}

/*
  Tampilan pesan error.
*/
.error-card {
  background: #ffe5e5;
  color: #b00020;
  text-align: center;
  font-weight: bold;
}

/*
  Menghapus background default ion-list.
*/
ion-list {
  background: transparent;
}

/*
  Tampilan setiap item cryptocurrency.
  Warna kuning muda dibuat agar mendekati contoh pada soal.
*/
.crypto-item {
  --background: #fff4cf;
  --border-color: #e0c983;
  margin-bottom: 8px;
  border-radius: 10px;
  overflow: hidden;
}

/*
  Bagian rank di sebelah kiri.
*/
.rank-box {
  width: 55px;
  text-align: center;
}

.rank-box small,
.price-box small {
  font-size: 11px;
  color: #444;
}

.rank-box h2 {
  margin: 2px 0 0 0;
  font-size: 24px;
  font-weight: bold;
  color: #111;
}

/*
  Bagian nama cryptocurrency.
*/
ion-label p {
  font-size: 12px;
  color: #444;
  margin-bottom: 3px;
}

/*
  Bagian simbol cryptocurrency seperti BTC, ETH, USDT.
*/
ion-label h1 {
  font-size: 24px;
  font-weight: bold;
  margin: 0;
  color: #111;
}

/*
  Bagian harga USD di sebelah kanan.
*/
.price-box {
  min-width: 90px;
  text-align: right;
}

.price-box h2 {
  margin: 2px 0 0 0;
  font-size: 20px;
  font-weight: bold;
  color: #111;
}
</style>
