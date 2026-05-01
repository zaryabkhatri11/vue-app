<script setup>
import useProducts from '../../composables/products';
import { computed, reactive } from 'vue';
const { createProduct, errors } = useProducts()

const form = reactive({
    name: '',
    slug: '',
    description: '',
    price: '',
    stock: '',
    image: '',
})

const saveProduct = async () => {
    await createProduct({ ...form })
}

const resetForm = () => {
    form.name = ''
    form.slug = ''
    form.description = ''
    form.price = ''
    form.stock = ''
    form.image = ''
}

const handleImageChange = (event) => {
    form.image = event.target.files[0]
}

const isFormValid = computed(() => {
    return form.name && form.slug && form.description && form.price && form.stock && form.image
})

</script>

<template>
    <div class="mt-2 mb-6 shadow sm:rounded-md">
        <div class="px-4 py-5 bg-white sm:p-6">
            <form @submit.prevent="saveProduct">
                <div class="grid grid-cols-6 gap-6">
                    <!-- Name -->
                    <div class="col-span-6 sm:col-span-3">
                        <label for="name" class="block text-sm font-medium text-gray-700">Product Name</label>
                        <input type="text" name="name" v-model="form.name" id="name"
                            class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                        <div v-if="errors.name" class="text-red-600 text-sm mt-1">{{ errors.name[0] }}</div>
                    </div>

                    <!-- Slug -->
                    <div class="col-span-6 sm:col-span-3">
                        <label for="slug" class="block text-sm font-medium text-gray-700">Slug</label>
                        <input type="text" name="slug" id="slug" v-model="form.slug"
                            class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                        <div v-if="errors.slug" class="text-red-600 text-sm mt-1">{{ errors.slug[0] }}</div>
                    </div>

                    <!-- Description -->
                    <div class="col-span-6">
                        <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
                        <textarea name="description" id="description" v-model="form.description" rows="3"
                            class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
                        <div v-if="errors.description" class="text-red-600 text-sm mt-1">{{ errors.description[0] }}</div>
                    </div>

                    <!-- Price -->
                    <div class="col-span-6 sm:col-span-3">
                        <label for="price" class="block text-sm font-medium text-gray-700">Price</label>
                        <input type="number" step="0.01" name="price" id="price" v-model="form.price"
                            class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                        <div v-if="errors.price" class="text-red-600 text-sm mt-1">{{ errors.price[0] }}</div>
                    </div>

                    <!-- Stock -->
                    <div class="col-span-6 sm:col-span-3">
                        <label for="stock" class="block text-sm font-medium text-gray-700">Stock</label>
                        <input type="number" name="stock" id="stock" v-model="form.stock"
                            class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                        <div v-if="errors.stock" class="text-red-600 text-sm mt-1">{{ errors.stock[0] }}</div>
                    </div>

                    <!-- Image -->
                    <div class="col-span-6">
                        <label for="image" class="block text-sm font-medium text-gray-700">Image URL</label>
                        <input type="file" name="image" id="image" @change="handleImageChange"
                            class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                        <div v-if="errors.image" class="text-red-600 text-sm mt-1">{{ errors.image[0] }}</div>
                    </div>
                </div>

                <div class="mt-6">
                    <button type="submit" :disabled="!isFormValid"
                        class="inline-flex items-center px-4 py-2 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-800 border border-transparent rounded-md hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25">
                        Save Product
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
