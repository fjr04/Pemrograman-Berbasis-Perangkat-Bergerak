<template>
  <!--
    IonApp adalah pembungkus utama aplikasi Ionic.
    IonRouterOutlet digunakan untuk menampilkan halaman berdasarkan routing.
  -->
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue'
</script>
