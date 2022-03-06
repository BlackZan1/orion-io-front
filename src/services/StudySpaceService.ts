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

    async updateAuditory(id: string, data: any) {
        return initAxios().patch(
            `${this.mainUrl}/api/auditories/${id}`, 
            data
        )
    }

    async deleteAuditory(id: string) {
        return initAxios().delete(`${this.mainUrl}/api/auditories/${id}`)
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

    async updateLesson(id: string, data: any) {
        return initAxios().patch(
            `${this.mainUrl}/api/lessons/${id}`, 
            data
        )
    }

    async deleteLesson(id: string) {
        return initAxios().delete(`${this.mainUrl}/api/lessons/${id}`)
    }
}