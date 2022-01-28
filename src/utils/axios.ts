import Axios from 'axios'

const axios = Axios.create({
    withCredentials: false
})

axios.interceptors.response.use(
    (response) => response,
    async (err) => {
        const originalReq = err.config

        if(err.response.status === 401) console.log('need to refresh token')
        
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