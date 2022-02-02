import { LoginData } from 'interfaces/auth'
import { initAxios } from 'utils/axios'

// services
import { MainService } from './MainService'

export class AuthService extends MainService {
    async login(data: LoginData) {
        return initAxios().post(`${this.mainUrl}/api/auth/login`, data)
    }

    async me() {
        return initAxios().get(`${this.mainUrl}/api/auth/me`)
    }

    async refresh(refreshToken: string) {
        return initAxios().post(`${this.mainUrl}/api/auth/refresh`, { refreshToken })
    }
}