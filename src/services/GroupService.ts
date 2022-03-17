import { GroupData } from 'interfaces/studySpace'
import { initAxios } from 'utils/axios'

// services
import { MainService } from './MainService'

export class GroupService extends MainService {
    async create(data: GroupData) {
        return initAxios().post(`${this.mainUrl}/api/groups`, data)
    }

    async delete(groupId: string) {
        return initAxios().delete(`${this.mainUrl}/api/groups/${groupId}`)
    }

    async getTokens(id: string) {
        return initAxios().get(`${this.mainUrl}/api/groups/${id}/tokens`)
    }

    async getUsers(id: string, page: number) {
        return initAxios().get(
            `${this.mainUrl}/api/groups/${id}/users`, 
            { 
                params: { limit: 10, page } 
            }
        )
    }

    async getNews(id: string, page: number) {
        return initAxios().get(
            `${this.mainUrl}/api/groups/${id}/news`, 
            { 
                params: { limit: 10, page } 
            }
        )
    }

    async getLessons(id: string, search?: string) {
        return initAxios().get(
            `${this.mainUrl}/api/groups/${id}/lessons`,
            {
                params: {
                    q: search
                }
            }
        )
    }

    async createLesson(id: string, data: any) {
        return initAxios().post(
            `${this.mainUrl}/api/groups/${id}/lessons`,
            data
        )
    }

    async deleteLesson(id: string, lessonId: string) {
        return initAxios().delete(
            `${this.mainUrl}/api/groups/${id}/lessons/${lessonId}`,
        )
    }
}