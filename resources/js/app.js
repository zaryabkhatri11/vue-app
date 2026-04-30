

import Alpine from 'alpinejs';

window.Alpine = Alpine;

Alpine.start();

import { createApp } from 'vue'
import router from './router'
import CompaniesIndex from "@/components/companies/CompaniesIndex.vue"

const app = createApp({})

app.component('CompaniesIndex', CompaniesIndex)

app.use(router)
app.mount('#app')
