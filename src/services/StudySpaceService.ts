import { initAxios } from 'utils/axios'

// services
import { MainService } from './MainService'

export class StudySpaceService extends MainService {
    async get() {
        return initAxios().get(`${this.mainUrl}/api/study-space`)
    }
}