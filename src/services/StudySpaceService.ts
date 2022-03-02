import { initAxios } from 'utils/axios'

// services
import { MainService } from './MainService'

export class StudySpaceService extends MainService {
    async get() {
        return initAxios().get(`${this.mainUrl}/api/study-space`)
    }

    async getAuditories(search?: string) {
        return initAxios().get(
            `${this.mainUrl}/api/auditories`, 
            { 
                params: {
                    q: search
                }
            }
        )
    }

    async getLessons(search?: string) {
        return initAxios().get(
            `${this.mainUrl}/api/lessons`, 
            { 
                params: {
                    q: search
                }
            }
        )
    }
}