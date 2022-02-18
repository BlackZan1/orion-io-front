import { initAxios } from 'utils/axios'

// services
import { MainService } from './MainService'

export class RolesService extends MainService {
    async getAll() {
        return initAxios().get(`${this.mainUrl}/api/roles`)
    }
}