import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'

//Cambiar URL del endpoint
axios.defaults.baseURL = 'http://api.hospital.test/api';
createApp(App).use(VueAxios, axios).use(store).use(router).mount('#app')
