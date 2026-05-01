import {ref} from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;


export default function useProducts () {

    const product = ref([])
    const products = ref([])
    const errors = ref([])
    const router = useRouter()


    const getProducts = async () => {
        let response = await axios.get('/api/products');
        products.value = response.data.data
    }

    const getProduct = async (id) => {
        let response = await axios.get(`/api/products/${id}`);
        product.value = response.data.data
    }

    const createProduct = async (data) => {
        errors.value = []
        try {
            let formData = new FormData()
            for (let key in data) {
                formData.append(key, data[key])
            }

            await axios.post('/api/products', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            await router.push({ name: 'products.index' })
        } catch (e) {
            if (e.response.status === 422) {
                errors.value = e.response.data.errors
            }
        }
    }

    const updateProduct = async (id) => {
        errors.value = []
        try {
            // Since we might be sending an image, we use POST with _method=PUT for multipart/form-data compatibility
            let formData = new FormData()
            for (let key in product.value) {
                formData.append(key, product.value[key])
            }
            formData.append('_method', 'PUT')

            await axios.post(`/api/products/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            await router.push({ name: 'products.index' })
        } catch (e) {
            if (e.response.status === 422) {
                errors.value = e.response.data.errors
            }
        }
    }

    const deleteProduct = async (id) => {
        await axios.delete(`/api/products/${id}`);
    }


    return{
        product,
        products,
        errors,
        getProducts,
        getProduct,
        createProduct,
        updateProduct,
        deleteProduct,
    }
}
