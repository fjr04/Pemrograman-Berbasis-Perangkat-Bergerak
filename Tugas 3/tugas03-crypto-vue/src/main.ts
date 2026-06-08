import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

/*
  IonicVue digunakan agar komponen Ionic seperti IonApp,
  IonPage, IonHeader, IonContent, IonButton, dan IonItem
  bisa digunakan di aplikasi Vue.
*/
import { IonicVue } from '@ionic/vue'

/*
  Import CSS dasar dari Ionic.
  Bagian ini penting agar tampilan Ionic bisa muncul dengan benar.
*/
import '@ionic/vue/css/core.css'

/*
  Basic CSS untuk aplikasi Ionic.
*/
import '@ionic/vue/css/normalize.css'
import '@ionic/vue/css/structure.css'
import '@ionic/vue/css/typography.css'

/*
  Optional CSS utilities dari Ionic.
*/
import '@ionic/vue/css/padding.css'
import '@ionic/vue/css/float-elements.css'
import '@ionic/vue/css/text-alignment.css'
import '@ionic/vue/css/text-transformation.css'
import '@ionic/vue/css/flex-utils.css'
import '@ionic/vue/css/display.css'

/*
  Theme variables digunakan untuk mengatur warna default Ionic.
*/
import './theme/variables.css'

/*
  Membuat aplikasi Vue, lalu memasang IonicVue dan router.
*/
const app = createApp(App)
  .use(IonicVue)
  .use(router)

/*
  Aplikasi akan dijalankan setelah router siap.
*/
router.isReady().then(() => {
  app.mount('#app')
})
