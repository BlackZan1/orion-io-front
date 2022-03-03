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

    async createAuditory(data: any) {
        return initAxios().post(
            `${this.mainUrl}/api/auditories`, 
            data
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

    async createLesson(data: any) {
        return initAxios().post(
            `${this.mainUrl}/api/lessons`, 
            data
        )
    }
}