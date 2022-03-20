import { initAxios } from 'utils/axios'

// services
import { MainService } from './MainService'

export class UsersService extends MainService {
    async getById(id: string) {
        return initAxios().get(`${this.mainUrl}/api/users/${id}`)
    }
  
    async editProfile(obj: any) {
        return initAxios().patch(`${this.mainUrl}/api/users`, obj)
    }

    async search(params: object) {
        return initAxios().get(`${this.mainUrl}/api/users`, { params })
    }
}