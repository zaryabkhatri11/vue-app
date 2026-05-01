

import Alpine from 'alpinejs';

window.Alpine = Alpine;

Alpine.start();

import { createApp } from 'vue'
import router from './router'
import CompaniesIndex from "@/components/companies/CompaniesIndex.vue"
import ProductIndex from "@/components/products/ProductIndex.vue";

const app = createApp({})

app.component('CompaniesIndex', CompaniesIndex)
app.component('ProductIndex' , ProductIndex )

app.use(router)
app.mount('#app')
