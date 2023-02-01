import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/style.css";

axios.defaults.baseURL = 'https://api.data.gov.sg/v1'

createApp(App).mount('#app')
