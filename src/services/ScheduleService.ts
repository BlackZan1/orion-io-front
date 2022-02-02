import { initAxios } from 'utils/axios'

// services
import { MainService } from './MainService'

export class ScheduleService extends MainService {
    async getById(id: string) {
        return initAxios().get(`${this.mainUrl}/api/schedules/${id}`)
    }

    async createEvent(id: string, data: any) {
        return initAxios().post(`${this.mainUrl}/api/schedules/${id}/add-event`, data)
    }

    async deleteEvent(id: string, eventId: string) {
        return initAxios().delete(`${this.mainUrl}/api/schedules/${id}/delete-event/${eventId}`)
    }

    async updateEvent(id: string, eventId: string, data: any) {
        return initAxios().patch(`${this.mainUrl}/api/schedules/${id}/update-event/${eventId}`, data)
    }
}