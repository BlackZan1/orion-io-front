import { initAxios } from 'utils/axios'

// services
import { MainService } from './MainService'

export class TokensService extends MainService {
    async check(token: string) {
        return initAxios().post(
            `${this.mainUrl}/api/tokens/check`, 
            {
                token
            }
        )
    }

    async generate(groupId: string) {
        return initAxios().post(
            `${this.mainUrl}/api/tokens/generate`, 
            {
                groupId
            }
        )
    }

    async generateAdmin(groupId: string) {
        return initAxios().post(
            `${this.mainUrl}/api/tokens/generate-admin`, 
            {
                groupId
            }
        )
    }

    async generateSuperUser(groupId: string) {
        return initAxios().post(
            `${this.mainUrl}/api/tokens/generate-superUser`, 
            {
                groupId
            }
        )
    }

    async delete(token: string) {
        return initAxios().delete(`${this.mainUrl}/api/tokens/${token}`)
    }
}