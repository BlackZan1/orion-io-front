import { ImportUserData } from 'interfaces/groups'
import { MainParams } from 'interfaces/params'
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

    async update(groupId: string, name: string) {
        return initAxios().patch(`${this.mainUrl}/api/groups/${groupId}`, { name })
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

    async getNews(id: string, params: MainParams) {
        return initAxios().get(
            `${this.mainUrl}/api/groups/${id}/news`, 
            { 
                params
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

    async updateLesson(id: string, lessonId: string, data: any) {
        return initAxios().patch(
            `${this.mainUrl}/api/groups/${id}/lessons/${lessonId}`,
            data
        )
    }

    async deleteLesson(id: string, lessonId: string) {
        return initAxios().delete(
            `${this.mainUrl}/api/groups/${id}/lessons/${lessonId}`,
        )
    }

    async importUser(id: string, data: ImportUserData) {
        return initAxios().post(
            `${this.mainUrl}/api/groups/${id}/import-user`, data,
        )
    }
}