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

    async generateAdmin() {
        return initAxios().post(
            `${this.mainUrl}/api/tokens/generate-admin`
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

    async generateTeacher() {
        return initAxios().post(
            `${this.mainUrl}/api/tokens/generate-teacher`
        )
    }

    async delete(token: string) {
        return initAxios().delete(`${this.mainUrl}/api/tokens/${token}`)
    }
}