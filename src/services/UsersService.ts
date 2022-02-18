import { initAxios } from 'utils/axios'

// services
import { MainService } from './MainService'

export class UsersService extends MainService {
    async getById(id: string) {
        return initAxios().get(`${this.mainUrl}/api/users/${id}`)
    }
}