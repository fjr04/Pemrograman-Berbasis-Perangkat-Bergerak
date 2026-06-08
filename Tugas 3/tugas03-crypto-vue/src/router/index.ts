import { createRouter, createWebHistory } from '@ionic/vue-router'
import HomePage from '../views/HomePage.vue'

/*
  File ini digunakan untuk mengatur routing halaman.
  Saat user membuka alamat utama aplikasi, maka halaman yang tampil
  adalah HomePage.vue.
*/
const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  }
]

/*
  createWebHistory digunakan agar routing aplikasi berjalan di browser
  saat aplikasi dijalankan menggunakan ionic serve.
*/
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
