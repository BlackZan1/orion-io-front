import { RegisterState } from 'interfaces/register'
import { initAxios } from 'utils/axios'

// services
import { MainService } from './MainService'

export class RegisterService extends MainService {
    async register(data: RegisterState | FormData) {
        return initAxios().post(`${this.mainUrl}/api/auth/register`, data)
    }

    async checkEmail(email: string) {
        return initAxios().post(`${this.mainUrl}/api/check-email`, { email })
    }
}