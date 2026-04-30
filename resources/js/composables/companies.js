import {ref} from 'vue'
import axios from 'axios'
import {useRouter} from 'vue-router'


export default function useCompanies() {
    const company = ref([]);
    const companies = ref([]);

    const errors = ref([]);
    const router = useRouter();

    const getCompanies = async () => {
        let response = await axios.get('api/companies');
        companies.value = response.data.data
    }

    const getCompany = async (id) => {
        let response = await axios.get(`api/companies/${id}`);
        companies.value = response.data.data
    }

    const storeCompany = async(data) => {

        errors.value = ''

        try{
            await axios.post('/api/companies' , data)
            await router.push({name: 'companies.index'});
        }catch (e) {
            if(e.response.status === 422){
                for(const key in e.response.data.errors) {
                    errors.value = e.response.data.errors
                }
            }
        }
    }

    const updateCompany = async(id) => {
        errors.value = ''

        try{

            await axios.post(`api/companies/${id}` , company.value)
            await router.push({name: 'companies.index'})

        } catch (e) {
            if(e.response.status === 422) {
                for(const key in e.response.data.errors) {
                    errors.value = e.response.data.errors
                }
            }
        }
    }

    const deleteCompany = async(id) => {
        await axios.delete(`api/companies/${id}`);
    }

    return {
        company,
        companies,
        errors,
        getCompanies,
        getCompany,
        storeCompany,
        updateCompany,
        deleteCompany,
    }
}
