import Axios from 'axios'

// stores
import { AuthStore } from 'store/auth'

const axios = Axios.create({
    withCredentials: false
})

axios.interceptors.response.use(
    (response) => response,
    async (err) => {
        const originalReq = err.config
        const token = localStorage.getItem('orion_t')

        if(err.response.status === 401 && !!token) {
            await AuthStore.refresh()

            originalReq.headers['Authorization'] = `Bearer ${localStorage.getItem('orion_t')}`

            return axios(originalReq)
        }
        
        return Promise.reject(err)
    }
)

function initAxios() {
    const token: string = localStorage.getItem('orion_t') || ''

    if(token.length) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }
    else {
        delete axios.defaults.headers.common['Authorization']
    }

    return axios
}

export {
    initAxios,
    axios 
}