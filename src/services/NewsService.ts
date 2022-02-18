import { NewsData } from 'interfaces/news'
import { initAxios } from 'utils/axios'

// services
import { MainService } from './MainService'

export class NewsService extends MainService {
    async create(data: NewsData | FormData) {
        return initAxios().post(
            `${this.mainUrl}/api/news`, 
            data
        )
    }
}